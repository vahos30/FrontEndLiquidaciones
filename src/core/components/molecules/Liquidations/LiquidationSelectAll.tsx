import { LiquidationCardProps } from "@/core/domain/InterfacesProps";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { Checkbox, Tag, TextWithValues } from "@components/atoms";
import { Col, Row } from "react-bootstrap";

export const LiquidationSelectAll: React.FC<LiquidationCardProps> = ({ liquidations, onChangeSelection, month, year, disabled, showRate, showPPP, showCheck = true }) => {
    const { handleSelectAll, allChecked } = useCheckboxSelection(liquidations, onChangeSelection);

    return (
        <div className="p-2 shadow-sm rounded mb-4">
            <Row>
                <Col xs="auto" className="d-flex align-items-center gap-3">
                    {showCheck && <Checkbox label="Seleccionar todo" checked={allChecked} onChange={handleSelectAll} disabled={disabled} />}
                    <TextWithValues color="#2B388F" title="Mes" value={month ?? ''} />
                    <TextWithValues color="#2B388F" title="Año" value={year ?? ''} />

                    {showRate && <Tag text={showRate} clas="status-solicitada" />}
                    {showPPP && <Tag text={showPPP} clas="status-solicitada" />}
                </Col>
            </Row>
        </div>
    );
};
