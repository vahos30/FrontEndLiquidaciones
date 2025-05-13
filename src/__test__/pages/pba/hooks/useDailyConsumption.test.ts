import { renderHook, act } from "@testing-library/react";
import { useDailyConsumption } from "@/pages/pba/hooks/useDailyConsumption";
import { LiquidationPBA } from "@/core/infrastructure/api";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  LiquidationPBA: jest.fn().mockImplementation(() => ({
    getDailyConsumption: jest.fn().mockResolvedValue({
      FuenteSuministro: ["Fuente A"],
      Socios: ["Socio A"],
      Fechas: ["2025-04-01"]
    })
  }))
}));

describe("useDailyConsumption", () => {
  const filters = {
    consecutives: [{ value: "1", label: "Consecutivo 1" }],
    months: { month: 3, year: 2025 }
  };

  test("inicializa correctamente y carga consumo diario", async () => {
    const { result } = renderHook(() =>
      useDailyConsumption(filters, 1, 100)
    );

    await act(async () => {
      await result.current.getDailyConsumption();
    });

    expect(result.current.DataDailyConsumption.FuenteSuministro).toEqual(["Fuente A"]);
    expect(result.current.loading).toBe(false);
  });

  test("maneja error sin romper el flujo", async () => {
    const api = new LiquidationPBA();
    jest.spyOn(api, "getDailyConsumption").mockRejectedValueOnce(new Error("Error"));

    const { result } = renderHook(() =>
      useDailyConsumption(filters, 1, 100)
    );

    await act(async () => {
      await result.current.getDailyConsumption();
    });

    expect(result.current.loading).toBe(false);
  });
});
