import { CustomAccordion } from "../../atoms";
import { NoData } from "@components/molecules";
import { LiquidationItem } from "@/core/domain/Entities";
import { LiquidationCardProps } from "@/core/domain/InterfacesProps";
import { LiquidationHigheringHeader } from "./LiquidationHigheringHeader";
import { LiquidationCardHigheringDetails } from "./LiquidationCardHigheringDetails";

export const LiquidationCardHighering: React.FC<LiquidationCardProps> = ({ liquidations }) => {
    if (liquidations.length === 0) return <NoData />;

    return (
        <>
            {liquidations.map((liquidation: LiquidationItem) => (
                <div key={liquidation.idliquidation}>
                    <CustomAccordion
                        clas={`custom-accordion ${liquidation.mensajeError ? "has-error" : ""}`}
                        header={<LiquidationHigheringHeader liquidation={liquidation} />}>
                        <LiquidationCardHigheringDetails liquidation={liquidation} />
                    </CustomAccordion>
                </div>
            ))}
        </>
    )
}