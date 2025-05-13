import { renderHook, act, waitFor } from "@testing-library/react";
import { useLiquidationSupplies } from "@/pages/liquidations/hooks/useLiquidationSupplies";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  LiquidationsApi: jest.fn().mockImplementation(() => ({
    getSuppliesByContract: jest.fn().mockResolvedValue({
      consecutive: "X",
      supplies: [
        { id: "1", name: "Punto 1", energy: "10" },
        { id: "2", name: "Punto 2", energy: "20" }
      ]
    }),
    updateLiquidationSupplies: jest.fn().mockResolvedValue(true)
  }))
}));

jest.mock("@/services", () => ({
  loadingService: {
    showLoading: jest.fn(),
    hideLoading: jest.fn()
  }
}));

const liquidationMock = {
  idContrato: "100",
  fuenteSuministroId: "1",
  consecutivo: "X",
  isCarbonTax: false
};

const liquidationDateMock = "2024-05-01";
const onCloseMock = jest.fn();

describe("useLiquidationSupplies", () => {
  test("updates delivered energy with handleDeliveredChange", async () => {
    const { result } = renderHook(() =>
      useLiquidationSupplies(liquidationMock, liquidationDateMock, onCloseMock)
    );
    await waitFor(() => {
      expect(result.current.liquidationSupplies).toBeDefined();
    });

    act(() => {
      result.current.handleDeliveredChange("1", "99.50");
    });

    expect(result.current.liquidationSupplies.supplies[0].energy).toBe("99.50");
  });

  test("submits valid form and sets success", async () => {
    const { result } = renderHook(() =>
      useLiquidationSupplies(liquidationMock, liquidationDateMock, onCloseMock)
    );
    await waitFor(() => {
      expect(result.current.liquidationSupplies).toBeDefined();
    });

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.successUpdate).toBe(true);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("shows error when empty fields are present", async () => {
    const { result } = renderHook(() =>
      useLiquidationSupplies(liquidationMock, liquidationDateMock, onCloseMock)
    );
    await waitFor(() => {
      expect(result.current.liquidationSupplies).toBeDefined();
    });

    act(() => {
      result.current.handleDeliveredChange("1", "");
    });

    const mockEvent = { preventDefault: jest.fn() } as any;
    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe("Complete los campos requeridos");
  });
});
