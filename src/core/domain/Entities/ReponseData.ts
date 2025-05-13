export interface LiquidacionSuministroModel {
  checked: boolean;
  idLiquidacionSuministro: number;
  mes: number;
  anio: number;
  idFuenteSuministro: number;
  idContrato: string;
  idTipoContrato: number;
  idPrecioVersion: number;
  idMonedaLiquidacionVersion: number;
  idMonedaPagoVersion: number;
  idTrmPagoPesos: number;
  totalNominado: number;
  totalSuministro: number;
  idLiquidacionTotalEntregado: number;
  idLiquidacionNoNominadas: number;
  totalNoNominadas: number;
  estado: number;
  usuarioCreacion: string;
  fechaCreacion: Date;
  usuarioModificacion: string;
  fechaModificacion: Date;
}
