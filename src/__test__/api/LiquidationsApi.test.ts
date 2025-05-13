import { LiquidationsApi } from "../../core/infrastructure/api/liquidationsApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('LiquidationsApi', () => {
  let api: LiquidationsApi;

  beforeEach(() => {
    api = new LiquidationsApi();
    jest.clearAllMocks();
  });

  const filters = {
    months: { month: 0, year: 2024 },
    clients: [{ value: '1', label: 'Cliente 1' }],
    consecutives: [{ value: 'A1', label: 'Contrato A1' }],
    supplys: [{ value: '10', label: 'Fuente 10' }],
    states: [{ value: 'active', label: 'Active' }],
  };

  test('getLiquidation devuelve datos correctamente mapeados', async () => {
    const mockData = {
      ppp: 1.234,
      liquidationDto: [
        {
          idliquidation: '123',
          idContract: 'C1',
          clientName: 'Cliente A',
          consecutive: 'A1',
          typeContractName: 'Tipo 1',
          sourceSupplyName: 'Fuente A',
          sourceSupplyId: 10,
          price: 123,
          currencyLiquidationName: 'USD',
          currencyPayName: 'COP',
          payTrm: 4000,
          totalNominada: 1000,
          totalEntregado: 900,
          totalSuministro: 950,
          noNominada: 100,
          totalNoNominada: 150,
          estado: 'Procesado',
          message: 'OK',
          puedeLiquidar: true,
        },
      ],
    };

    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await api.getLiquidation(filters);
    expect(result?.[0]).toMatchObject({
      idliquidation: '123',
      cliente: 'Cliente A',
      consecutivo: 'A1',
      fuenteSuministro: 'Fuente A',
      precio: 123,
    });
  });

  test('getSuppliesByContract retorna supplies con total acumulado', async () => {
    const mockResponse = [
      { idPuntoEntrega: 1, nombre: 'PE1', entregado: 100 },
      { idPuntoEntrega: 2, nombre: 'PE2', entregado: 200 },
    ];
    const params = {
      IdContract: 'C1',
      LiquidationDate: '01-2024',
      IdSource: Number('10'),
      consecutive: 'A1',
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });
    const result = await api.getSuppliesByContract(params);
    expect(result?.totalDelivered).toBe('300');
    expect(result?.supplies.length).toBe(2);
  });

  test('updateLiquidationSupplies retorna true si éxito', async () => {
    const params = {
      idContract: 'C1',
      liquidationDate: '01-2024',
      idSource: Number('10'),
      isCarbonTax: false,
      deliveryPoints: [
        { idDeliveryPoint: 1, delivered: 100 },
        { idDeliveryPoint: 2, delivered: 200 },
      ],
    };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: { isSuccess: true } });
    const result = await api.updateLiquidationSupplies(params);
    expect(result).toBe(true);
  });

  test('updateLiquidation retorna resultado esperado', async () => {
    const mockResponse = { status: 'liquidated' };
    const liquidations = [{ idliquidation: '123', year: 2024, month: 0 }];
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockResponse });
    const result = await api.updateLiquidation(liquidations);
    expect(result).toEqual(mockResponse);
  });

  test('sendToPrepareSap realiza post correctamente', async () => {
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: 'ready' });
    const result = await api.sendToPrepareSap(['123', '456']);
    expect(result).toBe('ready');
  });
});