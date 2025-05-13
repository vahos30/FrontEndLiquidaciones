import { renderHook, act } from "@testing-library/react";
import { useLiquidation } from "@/pages/liquidations/hooks/useLiquidation";
import { LiquidationsApi } from "@/core/infrastructure/api"; // Cambiado a `import`

jest.mock("@/core/infrastructure/api", () => {
  return {
    LiquidationsApi: jest.fn().mockImplementation(() => ({
      getLiquidation: jest.fn(),
      updateLiquidation: jest.fn(),
      sendToPrepareSap: jest.fn(), 
    })),
  };
});

describe("useLiquidation", () => {
  const mockFilters = {
    months: { month: 6, year: 2024 },
    clients: [],
    consecutives: [],
    supplys: [],
    states: [],
  };

  it("debe inicializar con estados correctos", () => {
    const { result } = renderHook(() => useLiquidation(mockFilters));
    expect(result.current).toMatchObject({
      liquidation: [],
      canLiquidate: undefined,
      error: "",
      success: "",
      loading: false,
    });
  });

  it("debe manejar un caso de error en sendToPrepareSap", async () => {
    const mockIds = ["1", "2"];
    const mockApi = new LiquidationsApi() as jest.Mocked<LiquidationsApi>; 
    mockApi.sendToPrepareSap.mockRejectedValue(new Error("Prepare SAP Error")); 

    const { result } = renderHook(() => useLiquidation(mockFilters));

    await act(async () => {
      await result.current.sendToPrepareSap(mockIds); 
    });

    expect(result.current.error).toBe("Error al realizar la preparacion de los registros para envio a sap");
    expect(result.current.success).toBe("");
  });
});
