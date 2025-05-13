import { Option } from "../domain/Entities";

export const STATE_LIQUIDATED = "Liquidado";
export const STATE_LIQUIDATION_PENDING = "Pendiente Liquidación";
export const STATE_LIQUIDATION_SEND_TO_SAP = "Enviado a SAP";
export const STATE_LIQUIDATION_PENDING_SEND_TO_SAP = "Pendiente Envío SAP";

export const STATES_LIQUIDATION: Option[] = [
    { value: "Pendiente envio SAP", label: "Pendiente envio SAP" },
    { value: "Procesando en SAP", label: "Procesando en SAP" },
    { value: "Enviado a SAP", label: "Enviado a SAP" },
    { value: "Error envio a SAP", label: "Error envio a SAP" }
];

export const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
export const HEADERS_EXPORT_EXCEL = {
    cliente: "Cliente",
    consecutivo: 'Consecutivo de contrato',
    tipoContrato: 'Tipo de contrato',
    fuenteSuministro: 'Fuente de suministro',
    precio: 'Precio',
    monedaLiquidacion: 'Moneda de liquidación',
    monedaPago: 'Moneda de pago',
    trmPagoEnPesos: 'TRM en pago pesos',
    totalNominado: 'Total nominado',
    entregado: 'Total entregado',
    totalSuministro: 'Total suministro',
    noNominado: 'No nominadas',
    totalNoNominadas: 'Total no nominadas',
    anio: "Año",
    mes: 'Mes'
}

export const HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_PRICES = {
    date: "Fecha",
    supplySource: 'Fuente de suministro',
    suppliedValueUSD: 'Total suministro USD',
    supplyMBTU: 'Suministro MBTU',
    supplyKPC: 'Suministro KPC',
    supplyMBTUValueUSD: 'Precio USD ($/MBTU)',
    supplyKPCValueUSD: 'Precio USD ($/KPC)'
}

export const HEADERS_EXPORT_EXCEL_ORDERS_SAP = {
    date: "Mes de liquidación",
    documentClass: 'Clase de documento',
    invoiceReferenceNumber: 'Factura',
    associatedContract: 'Número de contrato en SAP',
    consecutive: 'Consecutivo de contrato',
    sourceSupplyName: 'Fuente de suministro',
    referenceDocumentNumber: 'Doc. EC',
    clientName: 'Cliente',
    companyNit: 'NIT de la compañia',
    documentCurrency: 'Moneda de liquidación',
    exchangeRate: 'TRM',
    exchangeRateDate: 'Fecha precio',
    remarks: 'Observaciones',
    creationDate: 'Fecha pedido SAP',
    materialCode: 'Número de material en SAP',
    quantity: 'Cantidad',
    unitOfMeasure: 'Unidad de medida',
    sapOrderNumber: 'Orden de costo',
    conditionClass: 'Clase de condición',
    rate: 'Precio',
    currency: 'Moneda Pos.',
    calorificPower: 'Poder Calorifico',
    totalSupply: 'Total suministro',
    orderNumber: 'Número de pedido',
    state: 'Estado'
}

export const HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_LIQUIDATION = {
    date: "Fecha",
    sourceSupplyName: 'Fuente de suministro',
    totalStake: '% participación',
    totalRoyalties: '% regalías',
    totalPriceUSD: 'Precio USD',
    TRM: 'TRM promedio mes',
    kpc: 'KPC producción',
    totalRoyaltiesUSD: 'Total regalías USD',
    totalRoyaltiesCOP: 'Total regalías COP',
}

export const HEADERS_EXPORT_EXCEL_CARBON = {
    consecutivo: 'Consecutivo',
    puntoEntrega: 'Punto de entrega',
    noGravado: 'No gravado',
    gravado: 'Gravado',
    compensado: 'Compensado',
    poderCalorifico: 'Poder calorífico',
    impuestoCarbono: 'Impuesto al carbono',
    volumeM3: 'Volumen M3',
    totalMBTU: 'Total nominado MBTU',
    totalKPC: 'Total nominado KPC',
    totalDeliveredMBTU: 'Total entregado MBTU',
    totalDeliveredKPC: 'Total entregado KPC',
    estado: 'Estado',
    anio: "Año",
    mes: 'Mes'
}

export const HEADERS_EXPORT_EXCEL_GDM = {
    date: 'Mes consultado',
    razonSocial: 'Cliente',
    consecutivo: 'Consecutivo de contrato',
    fuenteSuministro: 'Fuente de suministro',
    cantidadCdnaporMbtu: 'Cantidad CDNA (MBTU)',
    cobroReembolsoCop: 'Cobro reembolso (COP)'
}

export const FUENTES_SUMINISTRO_NO_EDITAR_ANH = [4, 5, 9];

export const MONTHS_WITH_IDS = [
    { numeroMes: 1, mes: "Enero", valido: false, },
    { numeroMes: 2, mes: "Febrero", valido: false, },
    { numeroMes: 3, mes: "Marzo", valido: false, },
    { numeroMes: 4, mes: "Abril", valido: false, },
    { numeroMes: 5, mes: "Mayo", valido: false, },
    { numeroMes: 6, mes: "Junio", valido: false, },
    { numeroMes: 7, mes: "Julio", valido: false, },
    { numeroMes: 8, mes: "Agosto", valido: false, },
    { numeroMes: 9, mes: "Septiembre", valido: false, },
    { numeroMes: 10, mes: "Octubre", valido: false, },
    { numeroMes: 11, mes: "Noviembre", valido: false, },
    { numeroMes: 12, mes: "Diciembre", valido: false, },
];
export const MONTHS_WITH_IDS_OBA = [
    { numeroMes: 1, mes: "Enero", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 2, mes: "Febrero", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 3, mes: "Marzo", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 4, mes: "Abril", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 5, mes: "Mayo", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 6, mes: "Junio", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 7, mes: "Julio", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 8, mes: "Agosto", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 9, mes: "Septiembre", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 10, mes: "Octubre", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 11, mes: "Noviembre", habilitado: true, marcado: false, puedeLiquidar:false },
    { numeroMes: 12, mes: "Diciembre", habilitado: true, marcado: false, puedeLiquidar:false },
];

export const HEADERS_EXPORT_EXCEL_FACTOR_X = {
    date: "Fecha",
    FuenteSuministro: 'Fuente de suministro',
    FactorX: 'FactorX',
    PrecioUSDporKPC: 'PPP USD($/KPC)',
    ProduccionKPC: 'Producción (KPC)',
    PorcentajeRegalias: '% Regalías',
    TotalFactorX: 'Total factor X',
    state:"Estado",
}

export const HEADERS_EXPORT_EXCEL_PBA = {
    fecha: "Fecha",
    consecutivoAcuerdo: 'Consecutivo del acuerdo',
    socio: 'Socio',
    porcentajeParticipacion: 'Porcentaje de participación',
    totalNominacionConfirmada: 'Total nominación confirmada',
    participacionRealPorSocio: 'Participación real por socio',
    desbalanceMBTU: 'Desbalance MBTU',
    desbalanceUSD : 'Desbalance USD',    
}

export const HEADERS_LIQUIDATION_HIGHERING = [
  "Precio base (USD/KPC)",
  "Ventas directas (USD)",
  "Ventas reales (KPC)",
  "Precio promedio real (USD/KPC)",
  "Precio diferencial (USD/KPC)",
];

export const HEADERS_DETAILS_LIQUIDATION_HIGHERING = [
    "Total mayores ingresos (USD)",
    "Total Ingresos (USD)",
    "Total Ingresos (KPC)",
    "OBA Liquidación (%)",
];

export const HEADER_LIQUIDATIONS_OBA =[
    "Entrega (kpc*)",
    "Poder Calorífico (mbtu*)",
    "Consolidado nominaciones",
    "Desbalance diario",
    "Desbalance mensual MBTU",
    "Desbalance acumulado MBTU",
    "Desbalance USD",
    "Fecha",
]

export const HEADERS_EXPORT_EXCEL_LIQUIDATION_OBA = {
    date: "Fecha",
    puntoDeEntrega:"Punto de entrega",
    acumuladoConsolidadoNominaciones: 'Consolidado nominaciones',
    acumuladoEntregaKPC: 'Entrega (kpc*)',
    acumuladoPoderCalorifico: 'Poder Calorífico (mbtu*)',
    acumuladoDesbalanceDiarioMbtu: 'Desbalance diario',
    acumuladoDesbalanceMensualMbtu: 'Desbalance mensual MBTU',
    acumuladoDesbalanceAcumuladoMbtu: 'Desbalance acumulado MBTU',
    acumuladoDesbalanceUsd:"Desbalance USD",
}
export const HEADERS_EXPORT_EXCEL_LIQUIDATION_DETALLE_OBA = {
    fecha: "Fecha",
    puntoDeEntrega:"Punto de entrega",
    consolidadoNominaciones: 'Consolidado nominaciones',
    entregaKPC: 'Entrega (kpc*)',
    poderCalorifico: 'Poder Calorífico (mbtu*)',
    desbalanceDiarioMbtu: 'Desbalance diario',
    desbalanceMensualMbtu: 'Desbalance mensual MBTU',
    desbalanceAcumuladoMbtu: 'Desbalance acumulado MBTU',
    desbalanceUsd:"Desbalance USD",
}
