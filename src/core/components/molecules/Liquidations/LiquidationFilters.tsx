import { Col, Row } from "react-bootstrap";
import { SvgSearch } from "@components/atoms/svgIcons";
import { useLiquidationFilters } from "@/pages/liquidations/hooks";
import { LiquidationFiltersProps } from "@/core/domain/InterfacesProps";
import { CustomButton, Dropdown, MonthYearPicker } from "@components/atoms";

export const LiquidationFilters: React.FC<LiquidationFiltersProps> = ({ 
    onSubmit, 
    onChangeSelects, 
    isLoading, 
    filtersShow = ["month", "clients", "consecutives", "supplys"],
    monthsDefault = null 
}) => {

    const { clients, consecutives, sypplies, states, selectedMonth, selectedYear, selectedClients, selectedConsecutives, selectedSupplys, selectedStates, handleMonthYearChange, handleChange, resetFilters } = useLiquidationFilters(onChangeSelects, monthsDefault);

    return (
        <Row className="mt-4">
            <Col xs={12}>
                <Row className="align-items-end mb-2">
                    { filtersShow.find(filter => filter == "month") != null && 
                        <Col md={2}>
                            <MonthYearPicker
                                onChange={handleMonthYearChange}
                                label="Mes"
                                value={{ month: selectedMonth, year: selectedYear }}
                            />
                        </Col>
                    }
                    { filtersShow.find(filter => filter == "clients") != null && 
                        <Col md={2}>
                            <Dropdown
                                id="dropdown"
                                label="Cliente"
                                options={clients}
                                value={selectedClients}
                                onChange={(value) => handleChange([...value], "clients")}
                                classNamePrefix="select"
                                placeholder="Todos"
                            />
                        </Col>
                    }   
                    { filtersShow.find(filter => filter == "consecutives") != null && 
                    <Col md={2}>
                        <Dropdown
                            isDisabled={selectedClients.length === 0}
                            id="dropdown"
                            label="Consecutivo de contrato"
                            options={consecutives}
                            value={selectedConsecutives}
                            onChange={(value) => handleChange([...value], "consecutives")}
                            classNamePrefix="select"
                            placeholder="Todos"
                        />
                    </Col>
                    }
                    { filtersShow.find(filter => filter == "supplys") != null && 
                        <Col md={2}>
                            <Dropdown
                                isDisabled={selectedClients.length === 0}
                                id="dropdown"
                                label="Fuente de suministro"
                                options={sypplies}
                                value={selectedSupplys}
                                onChange={(value) => handleChange([...value], "supplys")}
                                classNamePrefix="select"
                                placeholder="Todas"
                            />
                        </Col>
                    }
                    { filtersShow.find(filter => filter == "states") != null && 
                        <Col md={2}>
                            <Dropdown
                                id="dropdown"
                                label="Estado"
                                options={states}
                                value={selectedStates}
                                onChange={(value) => handleChange([...value], "states")}
                                classNamePrefix="select"
                                placeholder="Todos"
                            />
                        </Col>
                    }
                    <Col xs={12} md={12 - (filtersShow.length * 2) } className="d-flex flex-wrap gap-2 justify-content-md-end justify-content-center mb-3">
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
