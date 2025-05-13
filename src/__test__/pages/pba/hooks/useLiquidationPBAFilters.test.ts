import { renderHook, act } from "@testing-library/react";
import { useLiquidationPBAFilters } from "@/pages/pba/hooks/useLiquidationPBAFilter";
import { defaultMonthAndYear } from "@/core/utils";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  MasterApi: jest.fn().mockImplementation(() => ({
    getConsecutivesByMonthYearPBA: jest.fn().mockResolvedValue([
      { value: "123", label: "Contrato A" }
    ])
  })),
  LiquidationPBA: jest.fn().mockImplementation(() => ({
    getAgreementsPBA: jest.fn().mockResolvedValue("OK")
  }))
}));

describe("useLiquidationPBAFilters", () => {
  const defaultMonth = defaultMonthAndYear().defaultMonth;
  const defaultYear = defaultMonthAndYear().defaultYear;
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inicializa correctamente con valores por defecto y carga consecutivos", async () => {
    const { result } = renderHook(() => useLiquidationPBAFilters(mockOnChange));

    expect(result.current.selectedMonth).toBe(defaultMonth);
    expect(result.current.selectedYear).toBe(defaultYear);

    await act(() => Promise.resolve()); // esperar useEffect

    expect(result.current.consecutives).toEqual([{ value: "123", label: "Contrato A" }]);
  });

  test("handleMonthYearChange actualiza valores y limpia consecutivos", async () => {
    const { result } = renderHook(() => useLiquidationPBAFilters(mockOnChange));

    await act(() => {
      result.current.handleMonthYearChange(2, 2024);
    });

    expect(result.current.selectedMonth).toBe(2);
    expect(result.current.selectedYear).toBe(2024);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 2, year: 2024 },
      consecutives: []
    });
  });

  test("handleChange actualiza consecutivos y llama onChangeSelects + apiPBA", async () => {
    const { result } = renderHook(() => useLiquidationPBAFilters(mockOnChange));
    const optionList = [{ value: "456", label: "Contrato B" }];

    await act(async () => {
      await result.current.handleChange(optionList);
    });

    expect(result.current.selectedConsecutives).toEqual(optionList);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: defaultMonth, year: defaultYear },
      consecutives: optionList
    });
  });

  test("resetFilters vuelve a valores iniciales", () => {
    const { result } = renderHook(() => useLiquidationPBAFilters(mockOnChange));

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.selectedMonth).toBe(defaultMonth);
    expect(result.current.selectedYear).toBe(defaultYear);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: defaultMonth, year: defaultYear },
      consecutives: []
    });
  });
});
