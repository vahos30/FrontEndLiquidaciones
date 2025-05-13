export interface LiquidationOBAResult {
    puedeLiquidar: boolean;
    errorProcesando: string;
    liquidations: LiquidationItem[];
  }
  
  export interface LiquidationItem {
    idliquidation: string;
    basePrice: string;
    mensajeError: string;
    estado: string;
    directSalesUSD: string;
    directSalesKPC: string;
    averagePriceUSDKPC: string;
    diferentialPriceUSDKPC: string;
    totalHigherIncome: string;
    totalIncomeUSD: string;
    totalIncomeKPC: string;
    liquidationPercentage: string;
  }
  