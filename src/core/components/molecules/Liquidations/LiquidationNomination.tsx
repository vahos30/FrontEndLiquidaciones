import { FC } from "react";
import { TextWithValues } from "@components/atoms";

interface LiquidationNominationProps {
    totalNominated: string;
    totalDelivered: string;
    totalSupply: string;
    notNominated: string;
    totalNotNominated: string;
}

export const LiquidationNomination: FC<LiquidationNominationProps> = ({
    totalNominated, totalDelivered, totalSupply, notNominated, totalNotNominated
}) => (
    <div>
        <TextWithValues title="Total nominada" value={totalNominated} />
        <TextWithValues title="Total entregada" value={totalDelivered} />
        <TextWithValues title="Total suministro" value={totalSupply} />
        <TextWithValues title="No nominadas" value={notNominated} />
        <TextWithValues title="Total no nominadas" value={totalNotNominated} />
    </div>
);