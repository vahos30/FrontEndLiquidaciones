import { renderHook, act } from '@testing-library/react';
import { useLiquidationHigheringcome } from '@/pages/higherincome/hooks/useLiquidationHigheringcome';
import { higheringcomeApi } from '@/core/infrastructure/api';

jest.mock('@/core/infrastructure/api', () => ({
  higheringcomeApi: jest.fn(),
}));

const mockFilters = {
  months: { month: 6, year: 2024 },
  clients: [],
  consecutives: [],
  supplys: [],
  states: [],
};

const mockApi = {
  getLiquidation: jest.fn(),
  updateLiquidation: jest.fn(),
};

(higheringcomeApi as jest.Mock).mockImplementation(() => mockApi);

describe('useLiquidationHigheringcome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaurar mocks después de cada prueba
  });

  it('debe inicializar con los estados correctos', () => {
    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    expect(result.current).toMatchObject({
      liquidation: [],
      error: '',
      success: '',
      loading: false,
      canLiquidate: undefined,
    });
  });

  it('debe manejar getLiquidation exitoso', async () => {
    const mockData = {
      liquidations: [{ id: 1, name: 'Liquidación 1' }],
      puedeLiquidar: false,
    };
    
    mockApi.getLiquidation.mockResolvedValue(mockData);

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    await act(async () => {
      await result.current.getLiquidation();
    });

    expect(result.current.liquidation).toEqual(mockData.liquidations);
    expect(result.current.canLiquidate).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('debe manejar error en getLiquidation', async () => {
    mockApi.getLiquidation.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    await act(async () => {
      await result.current.getLiquidation();
    });

    expect(result.current.error).toBe('Error al consultar las liquidaciones de suministro');
    expect(result.current.loading).toBe(false);
  });

  it('debe manejar updateLiquidation exitoso', async () => {
    const mockUpdateData = [{ id: 1, checked: true }];
    mockApi.updateLiquidation.mockResolvedValue("Exitoso!");
    mockApi.getLiquidation.mockResolvedValue({ liquidations: [] });

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    await act(async () => {
      await result.current.updateLiquidation(mockUpdateData);
    });

    expect(result.current.success).toBe('Liquidación realizada correctamente!');
    expect(result.current.error).toBe('');
    expect(mockApi.getLiquidation).toHaveBeenCalledTimes(1);
  });

  it('debe manejar error en updateLiquidation', async () => {
    const mockUpdateData = [{ id: 1, checked: true }];
    mockApi.updateLiquidation.mockRejectedValue(new Error('Update Error'));

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    await act(async () => {
      await result.current.updateLiquidation(mockUpdateData);
    });

    expect(result.current.error).toBe('Error al realizar la liquidación');
    expect(result.current.success).toBe('');
  });

  it('debe manejar el estado de loading correctamente', async () => {
    const mockData = { liquidations: [], puedeLiquidar: true };
    mockApi.getLiquidation.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockData), 100))
    );

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    act(() => {
      result.current.getLiquidation();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(result.current.loading).toBe(false);
  });

  it('debe llamar a la API con los filtros correctos', async () => {
    const mockData = { liquidations: [], puedeLiquidar: true };
    mockApi.getLiquidation.mockResolvedValue(mockData);

    const { result } = renderHook(() => useLiquidationHigheringcome(mockFilters));
    
    await act(async () => {
      await result.current.getLiquidation();
    });

    expect(mockApi.getLiquidation).toHaveBeenCalledWith(mockFilters);
  });
});
