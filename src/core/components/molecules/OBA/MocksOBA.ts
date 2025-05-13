export const MocksDeliveryPoints = [
    {
        label: "Punto de entrega 1",
        value: "1",
    }
]

export const MocksListOBABD ={
  error: "",
  liquidaciones: [
    {
      "id": "string",
      "idPuntoEntrega": 0,
      "puntoDeEntrega": "Arjona",
      "acumuladoDesbalanceDiarioMbtu": 0,
      "acumuladoDesbalanceMensualMbtu": 0,
      "acumuladoDesbalanceAcumuladoMbtu": 0,
      "acumuladoDesbalanceUsd": 0,
      "acumuladoConsolidadoNominaciones": 0,
      "acumuladoEntregaKPC": 0,
      "acumuladoPoderCalorifico": 0,
      "mensajeError": null,
      "estadoLiquidacion": "Liquidado",
      "ultimaLiquidacion": "2025-05-08",
      "ultimoAcumulado": "2025-05-08",
      "imbalancesOba": [
        {
          "fecha": "2025-05-08",
          "desbalanceDiarioMbtu": 0,
          "desbalanceMensualMbtu": 0,
          "desbalanceAcumuladoMbtu": 0,
          "desbalanceUsd": 0,
          "consolidadoNominaciones": 0,
          "entregaKPC": 0,
          "poderCalorifico": 0
        },
        {
          "fecha": "2025-05-09",
          "desbalanceDiarioMbtu": 10,
          "desbalanceMensualMbtu": 10,
          "desbalanceAcumuladoMbtu": 20,
          "desbalanceUsd": 50,
          "consolidadoNominaciones": 30,
          "entregaKPC": 10,
          "poderCalorifico": 40
        }
      ]
    },
    {
      "id": "string1",
      "idPuntoEntrega": 0,
      "puntoDeEntrega": "Ballena",
      "acumuladoDesbalanceDiarioMbtu": 0,
      "acumuladoDesbalanceMensualMbtu": 0,
      "acumuladoDesbalanceAcumuladoMbtu": 0,
      "acumuladoDesbalanceUsd": 0,
      "acumuladoConsolidadoNominaciones": 0,
      "acumuladoEntregaKPC": 0,
      "acumuladoPoderCalorifico": 0,
      "mensajeError": "Hay un error con el poder calorifico",
      "estadoLiquidacion": "Error de liquidación",
      "ultimaLiquidacion": "2025-05-08",
      "ultimoAcumulado": "2025-05-08",
      "imbalancesOba": [
        {
          "fecha": "2025-05-08",
          "desbalanceDiarioMbtu": 0,
          "desbalanceMensualMbtu": 0,
          "desbalanceAcumuladoMbtu": 0,
          "desbalanceUsd": 0,
          "consolidadoNominaciones": 0,
          "entregaKPC": 0,
          "poderCalorifico": 0
        }
      ]
    }
  ]
}


export const MocksTitleLiquidationOBA =[
    {title:"Entrega (kpc*)", value:"30,00"},
    {title:"Poder Calorífico (mbtu*)", value:"30,00"},
    {title:"Consolidado nominaciones", value:"28,00"},
    {title:"Desbalance diario", value:"30,00"},
    {title:"Desbalance mensual MBTU", value:"30,00"},
    {title:"Desbalance acumulado MBTU", value:"30,00"},
    {title:"Desbalance USD", value:"30,00"},
]
export const MocksHeaderLiquidationOBA =[
    "Entrega (kpc*)",
    "Poder Calorífico (mbtu*)",
    "Consolidado nominaciones",
    "Desbalance diario",
    "Desbalance mensual MBTU",
    "Desbalance acumulado MBTU",
    "Desbalance USD",
    "Fecha",
]

export const MocksPeriodoMeses = 
     [
        {
          "anio": 2025,
          "meses": [
            {
              "mes": "Enero",
              "numeroMes": 1,
              "valido": false
            },
            {
              "mes": "Febrero",
              "numeroMes": 2,
              "valido": false
            },
            {
              "mes": "Marzo",
              "numeroMes": 3,
              "valido": false
            },
            {
              "mes": "Abril",
              "numeroMes": 4,
              "valido": true
            },
            {
              "mes": "Mayo",
              "numeroMes": 5,
              "valido": false
            },
            {
              "mes": "Junio",
              "numeroMes": 6,
              "valido": false
            },
            {
              "mes": "Julio",
              "numeroMes": 7,
              "valido": false
            },
            {
              "mes": "Agosto",
              "numeroMes": 8,
              "valido": false
            },
            {
              "mes": "Septiembre",
              "numeroMes": 9,
              "valido": false
            },
            {
              "mes": "Octubre",
              "numeroMes": 10,
              "valido": false
            },
            {
              "mes": "Noviembre",
              "numeroMes": 11,
              "valido": false
            },
            {
              "mes": "Diciembre",
              "numeroMes": 12,
              "valido": false
            }
          ]
        }
    ]

export const MocksConsultaOBA = {
  "error": null,
  "liquidaciones": [
    {
      "id": "string",
      "idPuntoEntrega": 1,
      "puntoDeEntrega": "Arjona",
      "acumuladoDesbalanceDiarioMbtu": 0,
      "acumuladoDesbalanceMensualMbtu": 0,
      "acumuladoDesbalanceAcumuladoMbtu": 0,
      "acumuladoDesbalanceUsd": 0,
      "acumuladoConsolidadoNominaciones": 0,
      "acumuladoEntregaKPC": 0,
      "acumuladoPoderCalorifico": 0,
      "mensajeError": null,
      "estadoLiquidacion": "Liquidado"
    },
    {
      "id": "string1",
      "idPuntoEntrega": 2,
      "puntoDeEntrega": "Ballena",
      "acumuladoDesbalanceDiarioMbtu": 0,
      "acumuladoDesbalanceMensualMbtu": 0,
      "acumuladoDesbalanceAcumuladoMbtu": 0,
      "acumuladoDesbalanceUsd": 0,
      "acumuladoConsolidadoNominaciones": 0,
      "acumuladoEntregaKPC": 0,
      "acumuladoPoderCalorifico": 0,
      "mensajeError": "Hubo un error con el poder calorifico",
      "estadoLiquidacion": "Pendiente de liquidar"
    }
  ]
}

export const MocksConsultaDetalleOBA = {
  "error": null,
  "getInfoLatestLiquidationResponse": {
    "periodoAcumulado": "diciembre 2024 a febrero 2025",
    "ultimoMesLiquidado": "febrero 2025",
    "periodosLiquidar": MocksPeriodoMeses
  },
  "desbalancesOba": [
    {
      "fecha": "2025-04-09",
      "desbalanceDiarioMbtu": 0,
      "desbalanceMensualMbtu": 0,
      "desbalanceAcumuladoMbtu": 0,
      "desbalanceUsd": 0,
      "consolidadoNominaciones": 0,
      "entregaKPC": 0,
      "poderCalorifico": 0
    },
    {
      "fecha": "2025-05-09",
      "desbalanceDiarioMbtu": 0,
      "desbalanceMensualMbtu": 0,
      "desbalanceAcumuladoMbtu": 0,
      "desbalanceUsd": 0,
      "consolidadoNominaciones": 0,
      "entregaKPC": 0,
      "poderCalorifico": 0
    }
  ]
}