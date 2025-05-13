import { renderHook, act } from "@testing-library/react";
import { useLiquidationPBA } from "@/pages/pba/hooks/useLiquidationPBA";
import { LiquidationPBA } from "@/core/infrastructure/api";
import { ExcelClass } from "@/core/utils";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  LiquidationPBA: jest.fn().mockImplementation(() => ({
    makeCalculations: jest.fn().mockResolvedValue({ success: true, mensaje: "OK" }),
    getMainCalculations: jest.fn().mockResolvedValue({
      nominationConfirmed: 1,
      nominationConfirmedPartner: 2,
      realParticipationPeerPartner: 3,
      mbtu: 100,
      imbalanceMBTU: 10,
      usd: 500,
      imbalanceUSD: 50
    }),
    getInfoLastestLiquidation: jest.fn().mockResolvedValue({
      periodoAcumulado: "2025-04",
      ultimoMesLiquidado: "2025-03",
      periodosLiquidar: [{ anio: 2025, meses: [] }]
    }),
    makeLiquidation: jest.fn().mockResolvedValue({ success: true, mensaje: "Liquidado" }),
    getAgreementsPBA: jest.fn().mockResolvedValue("OK"),
    getDataExportPBA: jest.fn().mockResolvedValue([
      {
        porcentajeParticipacion: 1,
        totalNominacionConfirmada: 2,
        participacionRealPorSocio: 3,
        desbalanceMBTU: 4,
        desbalanceUSD: 5
      }
    ])
  }))
}));

jest.mock("@/core/utils", () => ({
  ...jest.requireActual("@/core/utils"),
  ExcelClass: {
    ExportExcel: jest.fn()
  },
  HEADERS_EXPORT_EXCEL_PBA: ["col1", "col2"]
}));

describe("useLiquidationPBA", () => {
  const searchFilters = {
    consecutives: [{ value: "1", label: "Contrato 1" }]
  };

  test("calls getMainCalculations on mount", async () => {
    const { result } = renderHook(() => useLiquidationPBA(searchFilters));
    expect(result.current.loading).toBe(true);

    await act(async () => { });

    expect(result.current.DataMainCalculations).toEqual({
      nominationConfirmed: 1,
      nominationConfirmedPartner: 2,
      realParticipationPeerPartner: 3,
      mbtu: 100,
      imbalanceMBTU: 10,
      usd: 500,
      imbalanceUSD: 50
    });
  });

  test("makeCalculations actualiza success y vuelve a llamar datos", async () => {
    const { result } = renderHook(() =>
      useLiquidationPBA({
        consecutives: [{ value: "1", label: "Consecutive 1" }],
        months: { month: 3, year: 2025 }
      })
    );
    await act(async () => {
      await result.current.makeCalculations();
    });
    expect(result.current.success).toBe("OK");
  });

  test("makeLiquidation actualiza success", async () => {
    const { result } = renderHook(() => useLiquidationPBA(searchFilters));
    await act(async () => {
      await result.current.makeLiquidation();
    });
    expect(result.current.success).toBe("Liquidado");
  });

  test("exportPBA llama a ExcelClass.ExportExcel", async () => {
    const { result } = renderHook(() => useLiquidationPBA(searchFilters));
    await act(async () => {
      await result.current.exportPBA();
    });
    expect(ExcelClass.ExportExcel).toHaveBeenCalled();
    expect(result.current.success).toBe("Exportación exitosa");
  });

  test("exportPBA maneja error sin datos", async () => {
    const api = new LiquidationPBA();
    jest.spyOn(api, "getDataExportPBA").mockResolvedValueOnce([]);
    const { result } = renderHook(() => useLiquidationPBA(searchFilters));
    await act(async () => {
      await result.current.exportPBA();
    });
    expect(result.current.error).toBe("");
  });
});
