export interface LiquidationANHProps {
    canLiquidate: boolean;    
    liquidatePrice: boolean;
    liquidations: LiquidationANHItem[];

}
export interface LiquidationANHItem {
    idLiquidation: string;
    idSourceSupply:number;
    sourceSupplyName: string;
    totalStake: string;
    totalRoyalties: string;
    totalPriceUSD: string;
    kpc: string;
    trm: string;
    totalRoyaltiesUSD: string;
    totalRoyaltiesCOP: string;
    message?: null | string;
    state: string;
}
