import { NoData } from "../NoData";
import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParticipationPartner } from "@/pages/pba/hooks";
import { CustomAccordion, DateInput } from "../../atoms";
import { ParticipationAgreementProps } from "@/core/domain/InterfacesProps";
import { getFirstDayOfMonth } from "@/core/utils";

export const ParticipationAgreement: React.FC<ParticipationAgreementProps> = ({ searchFilters, onSubmit = false }) => {
    const [dateSelect, setDateSelect] = useState(() => getFirstDayOfMonth((searchFilters?.months?.month ?? 0) + 1));
    const { getParticipationByDate, participationByDate } = useParticipationPartner(searchFilters?.consecutives[0]?.value, dateSelect);

    useEffect(() => {
        if (onSubmit) getParticipationByDate();
    }, [onSubmit, dateSelect]);

    return (
        <CustomAccordion
            clas={"m-4"}
            header={<h1 className="titulo-two m-3">% Participación en el acuerdo</h1>}>
            <Row>
                <Col md={2} className="mb-2"><DateInput value={dateSelect} onChange={(e) => setDateSelect(e.target.value)} /></Col>
                {participationByDate.length > 0 ? (
                    participationByDate.map((socio: { NombreSocio: string; PorcentajeParticipacion: number }, i: number) => (
                        <Col md={2} className="mt-3" key={i}>
                            <div>{socio.NombreSocio}</div>
                            <div>{socio.PorcentajeParticipacion.toString()}</div>
                        </Col>
                    ))
                ) : (<Row><NoData /></Row>)}
            </Row>
        </CustomAccordion>
    );
}