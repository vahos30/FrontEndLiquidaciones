import { renderHook, act } from "@testing-library/react";
import { useLiquidationFilters } from "@/pages/liquidations/hooks/useLiquidationFilters";
import { MasterApi } from "@/core/infrastructure/api";
import { defaultMonthAndYear } from "@/core/utils";

// Mock completo de axiosLiquidations
jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }
}));

// Mock de MasterApi
jest.mock("@/core/infrastructure/api", () => ({
  MasterApi: jest.fn().mockImplementation(() => ({
    getClients: jest.fn().mockResolvedValue([]),
    getConsecutivesAndSupplys: jest.fn().mockResolvedValue({
      consecutives: [],
      supplies: []
    })
  }))
}));

describe("useLiquidationFilters", () => {
  const mockOnChange = jest.fn();
  const currentDate = defaultMonthAndYear();

  it("debe inicializar con los valores por defecto correctos", async () => {
    const { result } = renderHook(() => 
      useLiquidationFilters(mockOnChange)
    );

    expect(result.current.selectedMonth).toBe(currentDate.defaultMonth);
    expect(result.current.selectedYear).toBe(currentDate.defaultYear);
    expect(result.current.selectedClients).toEqual([]);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(result.current.selectedSupplys).toEqual([]);
    expect(result.current.selectedStates).toEqual([]);
    
    await act(async () => {});
    expect(MasterApi).toHaveBeenCalled();
  });
});
