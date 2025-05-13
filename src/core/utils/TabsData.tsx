
import { TabItem, TabsData } from "@/core/domain/Entities";
import CarbonTaxManager from "@/pages/carbon/CarbonTaxManager";
import FactorXManager from "@/pages/factorx/FactorXManager";
import Higheringcome from "@/pages/higherincome/Higheringcome";
import { Liquidation } from "@/pages/liquidations";
import OBAManager from "@/pages/oba/OBAManager";
import PBAManager from "@/pages/pba/PBAManager";
import RecoveryGdM from "@/pages/recoveryGdM/RecoveryGdM";
import { LiquidationANH } from "@/pages/royaltiesanh/liquidation/LiquidationANH";
import { RoyalitiesANHPrices } from "@/pages/royaltiesanh/prices/RoyalitiesANHPrices";
import RoyaltiesANH from "@/pages/royaltiesanh/RoyaltiesANH";
import { SendToSap } from "@/pages/sap/SendToSap";

export const TABS_CONTAINER: TabItem[] = [
  { key: "1", title: "Liquidación de suministro", content: <Liquidation /> },
  { key: "2", title: "PBA", content: <PBAManager /> },
  { key: "3", title: "OBA", content: <p><OBAManager /></p> },
  { key: "4", title: "ORRI", content: <p>ORRI</p> },
  { key: "5", title: "Recobro GdM", content: <RecoveryGdM /> },
  { key: "6", title: "Factor x", content: <p><FactorXManager/></p> },
  { key: "7", title: "Impuesto al carbono", content: <CarbonTaxManager />},
  { key: "8", title: "Regalías ANH", content: <RoyaltiesANH /> },
  { key: "9", title: "Mayores ingresos", content: <Higheringcome /> },
  { key: "10", title: "Enviar a SAP", content: <SendToSap /> },
];

export const TABS_CONTAINER_ROYALITIES_ANH: TabItem[] = [
  { key: "1", title: "ANH", content: <RoyalitiesANHPrices /> },
  { key: "2", title: "ANH", content: <LiquidationANH /> },
];

export const TABS_NAVIGATION: TabsData[] = [
  {
    id: 1,
    nombreTab: "Liquidación de suministro",
    activo: true,
  },
  {
    id: 2,
    nombreTab: "PBA",
    activo: true,
  },
  {
    id: 3,
    nombreTab: "OBA",
    activo: true,
  },
  {
    id: 4,
    nombreTab: "ORRI",
    activo: true,
  },
  {
    id: 5,
    nombreTab: "Recobro GdM",
    activo: true,
  },
  {
    id: 6,
    nombreTab: "Factor X",
    activo: true,
  },
  {
    id: 7,
    nombreTab: "Impuesto al carbono",
    activo: true,
  },
  {
    id: 8,
    nombreTab: "Regalías ANH",
    activo: true,
  },
  {
    id: 9,
    nombreTab: "Mayores ingresos",
    activo: true,
  },
  {
    id: 10,
    nombreTab: "Enviar a SAP",
    activo: true,
  }
];

export const TABS_ROYALTIES_ANH: TabsData[] = [
  {
    id: 1,
    nombreTab: "Precio",
    activo: true,
  },
  {
    id: 2,
    nombreTab: "Liquidación",
    activo: true,
  },
]
