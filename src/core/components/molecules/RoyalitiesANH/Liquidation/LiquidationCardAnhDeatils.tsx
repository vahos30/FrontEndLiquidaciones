import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LiquidationCardAnhState } from "./LiquidationCardAnhState";
import { ModalBase, TextWithValues } from "@components/atoms";
import { SvgPencil } from "@/core/components/atoms/svgIcons";
import { LiquidationANHUpdateModal } from "./LiquidationANHUpdateModal";
import { LiquidationCardAnhDetailsProps } from "@/core/domain/InterfacesProps";
import { FUENTES_SUMINISTRO_NO_EDITAR_ANH } from "@/core/utils";

export const LiquidationCardAnhDetails: React.FC<LiquidationCardAnhDetailsProps> = ({ liquidation, onUpdate }) => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [campo, setCampo] = useState("");
    const [Valorcampo, setValorcampo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const Edit = (campo: string, value: string) => {
        setIsConfirm(true);
        setCampo(campo);
        setValorcampo(value);
    }
    const cancelar = () => {
        setIsConfirm(false);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const fieldMap: Record<string, keyof typeof liquidation> = {
            "% Participación": "totalStake",
            "% Regalías": "totalRoyalties",
            "Precio USD": "totalPriceUSD",
        };

        const name = fieldMap[campo];

        if (!Valorcampo.trim()) {
            setErrorMessage("Campo requerido");
            return;
        }

        if (!(/^\d*\.?\d{0,6}$/.test(Valorcampo)) || isNaN(Number(Valorcampo))) {
            setErrorMessage("Este campo solo acepta números");
            return;
        }

        const updateLiquidation = {
            ...liquidation,
            [name]: Valorcampo.replace(/,/g, "."),
        };

        onUpdate?.(updateLiquidation);
    }
    return (
        <>
            <Row>
                <Col>
                    <TextWithValues title="% Participación" valueBotton={true} value={liquidation.totalStake} icon={<span style={{ "cursor": "pointer" }} onClick={() => Edit("% Participación", liquidation.totalStake)}><SvgPencil size="22px" color="#2b388f" /></span>} />
                </Col>
                <Col>
                    <TextWithValues title="% Regalias" value={liquidation.totalRoyalties} valueBotton={true} icon={!FUENTES_SUMINISTRO_NO_EDITAR_ANH.includes(Number(liquidation.idSourceSupply)) && <span style={{ "cursor": "pointer" }} onClick={() => Edit("% Regalías", liquidation.totalRoyalties)}><SvgPencil size="22px" color="#2b388f" /></span>} />
                </Col>
                <Col>
                    <TextWithValues title="Precio USD" value={liquidation.totalPriceUSD} valueBotton={true} icon={<span style={{ "cursor": "pointer" }} onClick={() => Edit("Precio USD", liquidation.totalPriceUSD)}><SvgPencil size="22px" color="#2b388f" /></span>} />
                </Col>
                <Col>
                    <TextWithValues title="TRM promedio mes" value={liquidation.trm} valueBotton={true} />
                </Col>
                <Col>
                    <TextWithValues title="KPC producción" value={liquidation.kpc} valueBotton={true} />
                </Col>
                <Col>
                    <TextWithValues title="Total regalias USD" value={liquidation.totalRoyaltiesUSD} valueBotton={true} />
                </Col>
                <Col>
                    <TextWithValues title="Total regalias COP" value={liquidation.totalRoyaltiesCOP} valueBotton={true} />
                </Col>
                <Col md={1} ><LiquidationCardAnhState liquidation={liquidation} /></Col>
            </Row>
            <ModalBase show={isConfirm} onHide={() => setIsConfirm(false)} title="Editar">
                <LiquidationANHUpdateModal
                    handleSubmit={handleSubmit}
                    campo={campo}
                    valorCampo={Valorcampo}
                    setValorCampo={setValorcampo}
                    errorMessage={errorMessage}
                    cancelar={cancelar}
                />
            </ModalBase>
        </>
    )
}