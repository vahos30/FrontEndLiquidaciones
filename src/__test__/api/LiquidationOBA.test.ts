import {LiquidationOBA} from "../../core/infrastructure/api/liquidationOBA";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('LiquidationOBA', () => {
    let api: LiquidationOBA;
    const filters = {
        months: { month: 0, year: 2024 },
        deliveryPoint: [{ value: '1', label: 'Arjona' }],
    };

    beforeEach(() => {
        api = new LiquidationOBA();
        jest.clearAllMocks();
    });
    test('getDeliveryPoints retorna datos correctamente', async () => {
        const mockResponse = {
            deliveryPoints: [
                { label: undefined, value: undefined },
                { value: undefined, label: undefined }
            ]
        };
        (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });
        const result = await api.getDeliveryPoints();
        expect(result).toEqual(mockResponse.deliveryPoints);
    });
    test('getDetailOBA retorna datos correctamente', async () => {
        const mockResponse = {
        error: null,
            getInfoLatestLiquidationResponse: {
                periodoAcumulado: "diciembre 2024 a febrero 2025",
                ultimoMesLiquidado: "febrero 2025",
                periodosLiquidar: [
                    {
                    anio: 2025,
                    meses: [
                            {
                                mes: "Enero",
                                numeroMes: 1,
                                valido: false
                            },
                        ]
                    }
                ]
            },
            // desbalancesOba: [
            //     {
            //         fecha: "2025-04-09",
            //         desbalanceDiarioMbtu: 0,
            //         desbalanceMensualMbtu: 0,
            //         desbalanceAcumuladoMbtu: 0,
            //         desbalanceUsd: 0,
            //         consolidadoNominaciones: 0,
            //         entregaKPC: 0,
            //         poderCalorifico: 0
            //     },                
            // ]
        };
        const mockResponse2 = {error:null, getInfoLatestLiquidationResponse: {}};
        (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });
        const result = await api.getDetailOBA(1);
        expect(result).toEqual(mockResponse2);
    });
    test('getListOBA retorna datos correctamente', async () => {
        const mockResponse = 
        {
            error: null,
            liquidaciones: [
                {
                    idliquidation: "string1",
                    idPuntoEntrega: 1,
                    puntoDeEntrega: "Arjona",
                    acumuladoDesbalanceDiarioMbtu: 0,
                    acumuladoDesbalanceMensualMbtu: 0,
                    acumuladoDesbalanceAcumuladoMbtu: 0,
                    acumuladoDesbalanceUsd: 0,
                    acumuladoConsolidadoNominaciones: 0,
                    acumuladoEntregaKPC: 0,
                    acumuladoPoderCalorifico: 0,
                    mensajeError: null,
                    estado: "Liquidado",
                    checked:false,
                }
            ]
        };
        (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });
        const result = await api.getListOBA(filters);
        expect(result).toEqual(mockResponse);
    });
    test('makeCalculations retirna datos correctamente', async () => {
        const mockResponse = {
            success: true,
            mensaje: "Cálculo realizado con éxito",
            errors:{},
            value: {
                idLiquidacion: "12345",
                estado: "Cálculo exitoso"
            }
        };
        (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockResponse });
        const result = await api.makeCalculations(filters, [1]);
        expect(result).toEqual(mockResponse);
    })
    test('makeLiquidation retorna datos correctamente', async () => {
        const mockResponse = {
            success: true,
            mensaje: "Cálculo realizado con éxito",
            errors:{},
            value: {
                idLiquidacion: "12345",
                estado: "Cálculo exitoso"
            }
        };
        (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockResponse });
        const result = await api.makeLiquidation(filters, "1");
        expect(result).toEqual(mockResponse);
    })

})