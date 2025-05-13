import { FC } from "react";
import { TextWithValues } from "@components/atoms";

interface ContractInfoProps {
  client: string;
  contractId: string;
  contractType: string;
  supplySource: string;
}

export const LiquidationBasicData: FC<ContractInfoProps> = ({
  client, contractId, contractType, supplySource
}) => (
  <div>
    <TextWithValues title="Cliente" value={client} />
    <TextWithValues title="Consecutivo de contrato" value={contractId} />
    <TextWithValues title="Tipo de contrato" value={contractType} />
    <TextWithValues title="Fuente de suministro" value={supplySource} />
  </div>
);
