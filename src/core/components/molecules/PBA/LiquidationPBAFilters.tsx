import { Col, Row } from "react-bootstrap";
import { SvgSearch } from "@components/atoms/svgIcons";
import { LiquidationFiltersPBAProps } from "@/core/domain/InterfacesProps";
import { CustomButton, Dropdown, MonthYearPicker } from "@components/atoms";
import { useLiquidationPBAFilters } from "@/pages/pba/hooks";

export const LiquidationPBAFilters: React.FC<LiquidationFiltersPBAProps> = ({ onSubmit, onChangeSelects, isLoading }) => {
    const { selectedMonth, selectedYear, consecutives, selectedConsecutives, handleMonthYearChange, handleChange, resetFilters } = useLiquidationPBAFilters(onChangeSelects);

    return (
        <Row className="mt-4">
            <Col xs={12}>
                <Row className="align-items-end mb-2">
                    <Col md={2} className="me-3">
                        <MonthYearPicker
                            onChange={handleMonthYearChange}
                            label="Mes"
                            value={{ month: selectedMonth, year: selectedYear }}
                        />
                    </Col>
                    <Col md={3}>
                        <Dropdown
                            required
                            id="dropdown"
                            label="Consecutivo del acuerdo"
                            options={consecutives}
                            value={selectedConsecutives}
                            onChange={(value) => handleChange([...value])}
                            classNamePrefix="select"
                            placeholder="Seleccionar"
                        />
                    </Col>
                    <Col xs={12} md="auto" className="d-flex flex-wrap gap-2 ms-auto justify-content-md-end justify-content-center mb-3">
                        <CustomButton onClick={resetFilters} variant="secundary" disabled={isLoading ?? false}>
                            <span>Limpiar</span>
                        </CustomButton>
                        <CustomButton onClick={onSubmit} variant="primary" disabled={(isLoading ?? false) || selectedConsecutives.length === 0}>
                            <SvgSearch />
                            <span>{isLoading ? 'Buscando...' : 'Buscar'}</span>
                        </CustomButton>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
