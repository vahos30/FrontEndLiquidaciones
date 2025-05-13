import { renderHook, act } from "@testing-library/react";
import { useLiquidationFilters } from "@/pages/liquidations/hooks/useLiquidationFilters";
import { Option } from "@/core/domain/Entities";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  MasterApi: jest.fn().mockImplementation(() => ({
    getClients: jest.fn().mockResolvedValue([{ value: "1", label: "Cliente A" }]),
    getConsecutivesAndSupplys: jest.fn().mockResolvedValue({
      consecutives: [{ value: "C1", label: "Cons 1" }],
      supplies: [{ value: "S1", label: "Supply 1" }]
    })
  }))
}));

describe("useLiquidationFilters", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inicializa correctamente con valores por defecto y carga clientes", async () => {
    const { result } = renderHook(() => useLiquidationFilters(mockOnChange));

    expect(result.current.selectedMonth).toBeDefined();
    expect(result.current.selectedYear).toBeDefined();

    await act(() => Promise.resolve()); // Espera a useEffect interno
    expect(result.current.clients).toEqual([{ value: "1", label: "Cliente A" }]);
  });

  test("handleMonthYearChange actualiza mes/año y limpia filtros", () => {
    const { result } = renderHook(() => useLiquidationFilters(mockOnChange));

    act(() => {
      result.current.handleMonthYearChange(2, 2024);
    });

    expect(result.current.selectedMonth).toBe(2);
    expect(result.current.selectedYear).toBe(2024);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 2, year: 2024 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: []
    });
  });

  test("handleChange para clients actualiza seleccion y llama a onChangeSelects", async () => {
    const { result } = renderHook(() => useLiquidationFilters(mockOnChange));

    const newClient: Option = { value: "2", label: "Cliente B" };

    await act(async () => {
      await result.current.handleChange([newClient], "clients");
    });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ clients: [newClient] })
    );
  });

  test("handleChange para supplys y states actualiza correctamente", () => {
    const { result } = renderHook(() => useLiquidationFilters(mockOnChange));

    const supply: Option = { value: "S1", label: "Supply X" };
    const state: Option = { value: "Liq", label: "Liquidado" };

    act(() => {
      result.current.handleChange([supply], "supplys");
      result.current.handleChange([state], "states");
    });

    expect(result.current.selectedSupplys).toEqual([supply]);
    expect(result.current.selectedStates).toEqual([state]);
  });

  test("resetFilters vuelve a los valores por defecto", () => {
    const { result } = renderHook(() => useLiquidationFilters(mockOnChange));

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.selectedClients).toEqual([]);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(result.current.selectedSupplys).toEqual([]);
    expect(result.current.selectedStates).toEqual([]);
  });
});
