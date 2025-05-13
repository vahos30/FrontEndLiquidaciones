import { factorXApi } from "../../core/infrastructure/api/factorxApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('factorXApi', () => {
  let api: factorXApi;

  beforeEach(() => {
    api = new factorXApi();
    jest.clearAllMocks();
  });

  test('getFactorXLiquidation devuelve datos correctamente', async () => {
    const filters = {
      months: { month: 0, year: 2024 },
      supplys: [
        { value: '1', label: 'Supply 1' },
        { value: '2', label: 'Supply 2' },
      ],
    };

    const mockLiquidaciones = [
      {
        id: 'abc',
        idFuenteSuministro: 'FS-01',
        descripcionFuenteSuministro: 'Fuente Uno',
        factorX: 0.9,
        pppKpc: 12.5,
        produccion: 1000,
        porcentajeRegalias: 5,
        totalFactorX: 1125,
        idEstadoLiquidacion: 1,
        mensajeError: null,
        estadoLiquidacion: 'LIQUIDADO',
      },
    ];

    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: { liquidaciones: mockLiquidaciones } });

    const result = await api.getFactorXLiquidation(filters);
    expect(axiosLiquidations.get).toHaveBeenCalledWith(
      expect.stringContaining('liquidations/gassupplysourcefactorxquery?')
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      idliquidation: 'abc',
      FuenteSuministro: 'Fuente Uno',
      FactorX: 0.9,
    });
  });

  test('getFactorXLiquidation retorna array vacío si no hay datos', async () => {
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: { liquidaciones: null } });
    const result = await api.getFactorXLiquidation({ months: { month: 0, year: 2024 }, supplys: [] });
    expect(result).toEqual([]);
  });

  test('liquidateFactorX devuelve false si respuesta nula', async () => {
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: null });
    const result = await api.liquidateFactorX({ months: { month: 0, year: 2024 }, supplys: [] }, ['abc']);
    expect(result).toBe(false);
  });
});