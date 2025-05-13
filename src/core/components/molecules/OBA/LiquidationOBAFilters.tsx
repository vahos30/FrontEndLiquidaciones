import { Col, Row } from "react-bootstrap";
import { SvgSearch } from "@components/atoms/svgIcons";
import { CustomButton, Dropdown, MonthYearPicker } from "@components/atoms";
import { LiquidationOBAFiltersProps } from "@/core/domain/InterfacesProps";
import { useLiquidationOBAFilters } from "@/pages/oba/hooks";


export const LiquidationOBAFilters: React.FC<LiquidationOBAFiltersProps> = ({ onSubmit, onChangeSelects, isLoading }) => {
    const { deliveryPoint,selectedDeliveryPoint, selectedMonth, selectedYear, handleMonthYearChange, handleChange, resetFilters } = useLiquidationOBAFilters(onChangeSelects);

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
                            label="Punto de entrega"
                            options={deliveryPoint}
                            value={selectedDeliveryPoint}
                            onChange={(value) => handleChange([...value])}
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
