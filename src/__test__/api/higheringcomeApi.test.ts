import { higheringcomeApi } from "../../core/infrastructure/api/higheringcomeApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
}));

describe('higheringcomeApi', () => {
  let api: higheringcomeApi;

  beforeEach(() => {
    api = new higheringcomeApi();
    jest.clearAllMocks();
  });

  test('getLiquidation devuelve objeto mapeado correctamente', async () => {
    const mockData = {
      puedeLiquidar: true,
      error: 'errorTest',
      liquidaciones: [
        {
          id: 1,
          precioBase: 100,
          mensajeError: 'ninguno',
          estadoLiquidacion: 'OK',
          ventasDirectasUsd: 200,
          ventasRealesKpc: 300,
          precioPromedioRealUsdkpc: 400,
          precioDiferencialUsdkpc: 500,
          totalMayoresIngresosUsd: 600,
          totalIngresosUsd: 700,
          totalIngresosKpc: 800,
          porcentajeObaliquidacion: 75,
        },
      ],
    };

    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getLiquidation({
      months: { month: 0, year: 2024 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: [],
    });
    expect(axiosLiquidations.get).toHaveBeenCalledWith('higherincome/gethigherincome?Date=1-2024');
    expect(result?.puedeLiquidar).toBe(true);
    expect(result?.errorProcesando).toBe('errorTest');
    expect(result?.liquidations[0]).toMatchObject({
      idliquidation: '1',
      basePrice: '100',
      mensajeError: 'ninguno',
      estado: 'OK',
    });
  });

  test('getLiquidation retorna null si no hay liquidaciones', async () => {
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: {} });
    const result = await api.getLiquidation({
      months: { month: 0, year: 2024 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: [],
    });
    expect(result).toBeNull();
  });

  test('buildLiquidationPayload construye payload correctamente', () => {
    const liquidations = [
      { idliquidation: '1', year: 2024, month: 2 },
      { idliquidation: '2', year: 2024, month: 2 },
    ];

    const result = api.buildLiquidationPayload(liquidations, 'admin');

    expect(result).toEqual({
      idLiquidaciones: ['1', '2'],
      anio: 2024,
      mes: 2,
      usuario: 'admin',
    });
  });
});