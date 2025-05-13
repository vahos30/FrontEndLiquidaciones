import { LiquidationPBA } from "../../core/infrastructure/api/liquidationPBA";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('LiquidationPBA', () => {
  let api: LiquidationPBA;

  const filters = {
    months: { month: 0, year: 2024 },
    consecutives: [{ value: '1', label: 'Contrato 1' }],
  };

  beforeEach(() => {
    api = new LiquidationPBA();
    jest.clearAllMocks();
  });

  test('getMainCalculations retorna datos correctamente', async () => {
    const mockResponse = {
      nominationConfirmed: 1,
      nominationConfirmedPartner: 2,
      realParticipationPeerPartner: 3,
      mbtu: 4,
      imbalanceMBTU: 5,
      usd: 6,
      imbalanceUSD: 7,
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });
    const result = await api.getMainCalculations(filters);
    expect(result).toEqual(mockResponse);
  });

  test('makeCalculations realiza cálculo y retorna response.data', async () => {
    const mockData = { success: true };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await api.makeCalculations(filters);
    expect(axiosLiquidations.post).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('getDailyConsumption retorna estructura esperada', async () => {
    const mockData = {
      fuenteSuministro: 'FS1',
      socios: ['Socio1'],
      fechas: ['2024-01-01'],
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await api.getDailyConsumption(filters);
    expect(result).toEqual({
      FuenteSuministro: 'FS1',
      Socios: ['Socio1'],
      Fechas: ['2024-01-01'],
    });
  });

  test('makeLiquidation realiza POST correctamente', async () => {
    const mockData = { status: 'ok' };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await api.makeLiquidation(filters);
    expect(result).toEqual(mockData);
  });

  test('getInfoLastestLiquidation retorna los datos esperados', async () => {
    const mockData = {
      periodoAcumulado: '2024-01',
      ultimoMesLiquidado: '2023-12',
      periodosLiquidar: ['2024-01'],
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await api.getInfoLastestLiquidation(filters);
    expect(result).toEqual(mockData);
  });

  test('getAgreementsPBA retorna string esperado', async () => {
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: 'Acuerdo #1' });
    const result = await api.getAgreementsPBA(filters);
    expect(result).toBe('Acuerdo #1');
  });

  test('getDataExportPBA retorna datos en éxito', async () => {
    const exportData = { archivo: 'contenido_excel' };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: exportData });
    const result = await api.getDataExportPBA(filters);
    expect(result).toEqual(exportData);
  });

  test('getDataExportPBA retorna mensaje de error si falla', async () => {
    (axiosLiquidations.get as jest.Mock).mockRejectedValue(new Error('Fail'));
    const result = await api.getDataExportPBA(filters);
    expect(result).toBe('Error al descargar el archivo');
  });
});