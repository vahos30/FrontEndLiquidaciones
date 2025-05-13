import { royaltiesApi } from "../../core/infrastructure/api/royaltiesApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe("royaltiesApi", () => {
  let api: royaltiesApi;

  beforeEach(() => {
    api = new royaltiesApi();
    jest.clearAllMocks();
  });

  test("getRoyalitiesANHLiquidation retorna los datos mapeados correctamente", async () => {
    const mockData = {
      canLiquidate: true,
      liquidatePrice: 100,
      liquidations: [{
        idLiquidation: 1,
        idSourceSupply: 2,
        sourceSupplyName: "Supply A",
        totalStake: "10",
        totalRoyalties: "20",
        totalPriceUSD: "30",
        trm: "4.1",
        kpc: "50",
        totalRoyaltiesUSD: "60",
        totalRoyaltiesCOP: "70",
        message: "ok",
        state: "READY"
      }]
    };

    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getRoyalitiesANHLiquidation({
      months: { month: 4, year: 2025 },
      supplys: [{ value: "1", label: "Supply A" }]
    });

    expect(axiosLiquidations.get).toHaveBeenCalledWith(expect.stringContaining("royalties/getliquidationsanh"));
    expect(result.liquidations.length).toBe(1);
    expect(result.canLiquidate).toBe(true);
  });

  test("UpdateLiquidationsANH debe formatear valores numéricos y llamar correctamente el endpoint", async () => {
    const payload = {
      idliquidation: 1,
      totalStake: "10,5",
      totalRoyalties: "20,7",
      totalPriceUSD: "100,8"
    };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    const result = await api.UpdateLiquidationsANH(payload);

    expect(axiosLiquidations.post).toHaveBeenCalledWith(expect.stringContaining("updateLiquidationsANH"),);
    expect(result.success).toBe(true);
  });

  test("UpdatePriceANH debe enviar el payload correctamente", async () => {
    const liquidations = ["1"];
    const filters = { months: { month: 3, year: 2025 } };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: true });

    const result = await api.UpdatePriceANH(liquidations, filters);

    expect(axiosLiquidations.post).toHaveBeenCalledWith("royalties/calcularliquidacionpreciosanh", {
      idLiquidaciones: ["1"],
      Mes: 4,
      Anio: 2025
    });
    expect(result).toBe(true);
  });

  test("liquidateANH debe enviar el payload correctamente", async () => {
    const liquidations = ["1"];
    const filters = { months: { month: 1, year: 2024 } };
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ data: "OK" });

    const result = await api.liquidateANH(liquidations, filters);

    expect(axiosLiquidations.post).toHaveBeenCalledWith("royalties/liquidateANH", {
      idLiquidaciones: ["1"],
      Mes: 2,
      Anio: 2024
    });
    expect(result).toBe("OK");
  });

  test("getAllGasSupplySource debe mapear correctamente las opciones", async () => {
    const mockData = [{ codigoGDM: "abc", descripcion: "Supply X" }];
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getAllGasSupplySource();
    expect(result).toEqual([{ value: "abc", label: "Supply X" }]);
  });

  test("getRoyalitiesANHPrices debe devolver arreglo sin transformar", async () => {
    const mockResponse = [{ id: 1 }, { id: 2 }];
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await api.getRoyalitiesANHPrices({
      months: { month: 2, year: 2025 },
      supplys: [{ value: "1", label: "Supply A" }]
    });

    expect(result).toEqual(mockResponse);
  });
});
