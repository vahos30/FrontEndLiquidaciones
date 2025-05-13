import { liquidationsCarbonApi } from "../../core/infrastructure/api/liquidationsCarbonApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('liquidationsCarbonApi', () => {
  let api: liquidationsCarbonApi;
  const filters = {
    months: { month: 0, year: 2024 },
    consecutives: [{ value: 'A1', label: 'Contrato A1' }],
    clients: [],
    supplys: [],
    states: []
  };

  beforeEach(() => {
    api = new liquidationsCarbonApi();
    jest.clearAllMocks();
  });

  test('getLiquidation devuelve liquidaciones correctamente mapeadas', async () => {
    const mockData = {
      rate: '25',
      puedeLiquidar: true,
      errorProcesando: 'Error X',
      listLiquidationTax: [
        {
          idliquidation: 'L123',
          idContract: 'C1',
          message: 'OK',
          consecutive: 'A1',
          deliveryPoint: 'P1',
          sourceSupplyId: 5,
          noTaxed: 10,
          taxed: 20,
          offset: 5,
          calorific: 9500,
          carbonTax: 300,
          totalMBTU: 100,
          totalKPC: 50,
          totalDeliveredMBTU: 90,
          totalDeliveredKPC: 45,
          volumeM3: 120,
          estado: 'Procesado',
          idTypeLiquidation: 2,
        },
      ],
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getLiquidation(filters);
    expect(result?.tarifa).toBe('25');
    expect(result?.puedeLiquidar).toBe(true);
    expect(result?.liquidations.length).toBe(1);
    expect(result?.liquidations[0].idliquidation).toBe('L123');
    expect(result?.liquidations[0].liquidacionPorEntregas).toBe(true);
  });

  test('getLiquidation retorna null si listLiquidationTax es null', async () => {
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: { listLiquidationTax: null } });
    const result = await api.getLiquidation(filters);
    expect(result).toBeNull();
  });

  test('updateLiquidation realiza POST correctamente', async () => {
    const liquidations = [{ idliquidation: 'L123', year: 2024, month: 0 }];
    const mockResponse = { isSuccess: true };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockResponse });
    const result = await api.updateLiquidation(liquidations);
    expect(result).toEqual(mockResponse);
    expect(axiosLiquidations.post).toHaveBeenCalledWith(
      'liquidationcarbontax/liquidateCarbonTax',
      {
        idLiquidaciones: ['L123'],
        anio: 2024,
        mes: 0,
        usuario: 'usuario',
      }
    );
  });
});
