import { Col, Row } from "react-bootstrap";
import { SvgSearch } from "@components/atoms/svgIcons";
import { CustomButton, Dropdown, MonthYearPicker } from "@components/atoms";
import { useRoyalitiesANHFilters } from "@/pages/royaltiesanh/prices/hooks/useRoyalitiesANHFilters";
import { RoyalitiesANHFiltersProps } from "@/core/domain/InterfacesProps/RoyalitiesANHFiltersProps";

export const FactorXFilters: React.FC<RoyalitiesANHFiltersProps> = ({ onSubmit, onChangeSelects, isLoading }) => {
    const { sypplies, selectedMonth, selectedYear, selectedSupplys, handleMonthYearChange, handleChange, resetFilters } = useRoyalitiesANHFilters(onChangeSelects);

    return (
        <Row className="mt-4">
            <Col xs={12}>
                <Row className="align-items-end mb-2">
                    <Col md={2}>
                        <MonthYearPicker
                            onChange={handleMonthYearChange}
                            label="Mes"
                            value={{ month: selectedMonth, year: selectedYear }}
                        />
                    </Col>
                    <Col>
                        <Dropdown
                            id="dropdown"
                            label="Fuente de suministro"
                            options={sypplies}
                            value={selectedSupplys}
                            onChange={(value) => handleChange([...value], "supplys")}
                            classNamePrefix="select"
                            placeholder="Seleccionar"
                        />
                    </Col>
                    <Col />
                    <Col />
                    <Col xs={12} md="auto" className="d-flex flex-wrap gap-2 justify-content-md-end justify-content-center mb-3">
                        <CustomButton onClick={resetFilters} variant="secundary" disabled={isLoading ?? false}>
                            <span>Limpiar</span>
                        </CustomButton>
                        <CustomButton onClick={onSubmit} variant="primary" disabled={isLoading ?? false}>
                            <SvgSearch />
                            <span>{isLoading ? 'Buscando...' : 'Buscar'}</span>
                        </CustomButton>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
