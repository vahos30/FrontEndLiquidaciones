import { FC } from "react";
import { TextWithValues } from "@components/atoms";

interface LiquidationBasicDataProps {
  price: string;
  payLiquidation: string;
  pay: string;
  trm: string;
}

export const LiquidationPays: FC<LiquidationBasicDataProps> = ({
  price, payLiquidation, pay, trm,
}) => (
  <div>
    <TextWithValues title="Precio" value={price} />
    <TextWithValues title="Moneda liquidación" value={payLiquidation} />
    <TextWithValues title="Moneda de pago" value={pay} />
    <TextWithValues title="TRM pago en pesos" value={trm === null ? '':  "$" + trm} />
  </div>
);