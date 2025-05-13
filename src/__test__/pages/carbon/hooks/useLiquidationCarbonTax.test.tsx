import { renderHook, act, waitFor } from '@testing-library/react';
import { useLiquidationCarbonTax } from '../../../../pages/carbon/hooks/useLiquidationCarbonTax';
import { liquidationsCarbonApi } from '@/core/infrastructure/api';
import { FiltersLiquidation } from '@/core/domain/Entities';

// Mock de la API
jest.mock('@/core/infrastructure/api', () => ({
  liquidationsCarbonApi: jest.fn(() => ({
    getLiquidation: jest.fn(),
    updateLiquidation: jest.fn(),
  })),
}));

// Silenciar console.error durante las pruebas
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('useLiquidationCarbonTax', () => {
  const mockFilters: FiltersLiquidation = {
    months: { month: 1, year: 2023 },
    clients: [],
    consecutives: [],
    supplys: [],
    states: [],
  };

  it('debe manejar el estado de carga y éxito en getLiquidation', async () => {
    const mockData = {
      liquidations: [{ id: 1, checked: false }],
      tarifa: '100',
      puedeLiquidar: true,
    };
    
    (liquidationsCarbonApi as jest.Mock).mockImplementation(() => ({
      getLiquidation: jest.fn().mockResolvedValue(mockData),
      updateLiquidation: jest.fn(),
    }));

    const { result } = renderHook(() => useLiquidationCarbonTax(mockFilters));

    act(() => {
      result.current.getLiquidation();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.liquidation).toEqual(mockData.liquidations);
      expect(result.current.rate).toBe('100');
      expect(result.current.canLiquidate).toBe(false);
    });
  });

  it('debe manejar errores en getLiquidation', async () => {
    (liquidationsCarbonApi as jest.Mock).mockImplementation(() => ({
      getLiquidation: jest.fn().mockRejectedValue(new Error('API Error')),
      updateLiquidation: jest.fn(),
    }));

    const { result } = renderHook(() => useLiquidationCarbonTax(mockFilters));

    act(() => {
      result.current.getLiquidation();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Error al consultar las liquidaciones de suministro');
      expect(result.current.loading).toBe(false);
    });
  });

  it('debe manejar actualización de liquidación exitosa', async () => {
    const mockResponse = "Exitoso!";
    (liquidationsCarbonApi as jest.Mock).mockImplementation(() => ({
      getLiquidation: jest.fn(),
      updateLiquidation: jest.fn().mockResolvedValue(mockResponse),
    }));

    const { result } = renderHook(() => useLiquidationCarbonTax(mockFilters));

    const testLiquidations = [{ id: 1, checked: true }];
    
    act(() => {
      result.current.updateLiquidation(testLiquidations);
    });

    await waitFor(() => {
      expect(result.current.success).toBe('Liquidación realizada correctamente!');
      expect(result.current.loading).toBe(false);
    });
  });

  it('debe manejar errores en updateLiquidation', async () => {
    (liquidationsCarbonApi as jest.Mock).mockImplementation(() => ({
      getLiquidation: jest.fn(),
      updateLiquidation: jest.fn().mockRejectedValue(new Error('Update Error')),
    }));

    const { result } = renderHook(() => useLiquidationCarbonTax(mockFilters));

    act(() => {
      result.current.updateLiquidation([{ id: 1, checked: true }]);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Error al realizar la liquidación');
      expect(result.current.loading).toBe(false);
    });
  });
});