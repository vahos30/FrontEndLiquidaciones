import React from "react";
import { Col, Row } from "react-bootstrap";
import { CustomAccordion } from "../../atoms";
import { PeriodsAndTotalsProps } from "@/core/domain/InterfacesProps";
import { InfoLiquidation } from "./InfoLiquidation";


export const PeriodsAndTotals: React.FC<PeriodsAndTotalsProps> = ({ DataMainCalculations, PeriodoAcumulado, UltimoMesLiquidado, MesesLiquidar, handleMonthToggle }) => {

    return (
        <Row>
            <Col md={3} className="mb-2">
                <InfoLiquidation PeriodoAcumulado={PeriodoAcumulado} UltimoMesLiquidado={UltimoMesLiquidado} MesesLiquidar={MesesLiquidar} handleMonthToggle={handleMonthToggle} />
            </Col>
            <Col>
                <CustomAccordion
                    clas={"m-2"}
                    header={<h1 className="titulo-two m-3">{`Total nominación confirmada: ${DataMainCalculations?.nominationConfirmed || 0}`}</h1>}>
                    {DataMainCalculations?.nominationConfirmedPartner &&
                        <Row>
                            {DataMainCalculations?.nominationConfirmedPartner?.map((item, i) => (
                                <Col md={2} className="mt-3" key={i}>
                                    <div>{item.namePartner}</div>
                                    <div style={{ color: Number(item.value) < 0 ? "red" : "green" }} >{item.value}</div>
                                </Col>
                            ))}
                        </Row>
                    }
                </CustomAccordion>
                <CustomAccordion
                    clas={"m-2"}
                    header={<h1 className="titulo-two m-3">Participación real por socio</h1>}>
                    {DataMainCalculations?.realParticipationPeerPartner &&
                        <Row>
                            {DataMainCalculations?.realParticipationPeerPartner?.map((item, i) => (
                                <Col md={2} className="mt-3" key={i}>
                                    <div>{item.namePartner}</div>
                                    <div style={{ color: Number(item.value) < 0 ? "red" : "green" }}>{item.value}</div>
                                </Col>
                            ))}
                        </Row>
                    }
                </CustomAccordion>
                <CustomAccordion
                    clas={"m-2"}
                    header={<h1 className="titulo-two m-3">{`Desbalance MBTU: ${DataMainCalculations?.mbtu || 0}`}</h1>}>
                    {DataMainCalculations?.imbalanceMBTU &&
                        <Row>
                            {DataMainCalculations.imbalanceMBTU.map((item, i) => (
                                <Col md={2} className="mt-3" key={i}>
                                    <div>{item.namePartner}</div>
                                    <div style={{ color: Number(item.value) < 0 ? "red" : "green" }}>{item.value}</div>
                                </Col>
                            ))}
                        </Row>
                    }
                </CustomAccordion>
                <CustomAccordion
                    clas={"m-2"}
                    header={<h1 className="titulo-two m-3">{`Desbalance USD: ${DataMainCalculations?.usd || 0}`}</h1>}>
                    {DataMainCalculations?.imbalanceUSD &&
                        <Row>
                            {DataMainCalculations.imbalanceUSD.map((item, i) => (
                                <Col md={2} className="mt-3" key={i}>
                                    <div>{item.namePartner}</div>
                                    <div style={{ color: Number(item.value) < 0 ? "red" : "green" }}>{item.value}</div>
                                </Col>
                            ))}
                        </Row>
                    }
                </CustomAccordion>
            </Col>
        </Row>
    );
}