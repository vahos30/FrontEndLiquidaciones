import { PointsApi } from "../../core/infrastructure/api/pointsApi";
import axiosLiquidations from '@/core/infrastructure/axiosLiquidations';

jest.mock('../../core/infrastructure/axiosLiquidations', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("PointsApi", () => {
  let api: PointsApi;

  beforeEach(() => {
    api = new PointsApi();
    jest.clearAllMocks();
  });

  test("getPoints debe retornar un arreglo de puntos transformados", async () => {
    const mockData = [
      {
        id: 1,
        idPuntoEntregaGas: 10,
        fechaVigencia: "2025-05-01",
        valorPoderCalorifico: 999,
        nombrePuntoEntrega: "Punto A",
        codigoGDM: "GDM123"
      }
    ];
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getPoints();

    expect(axiosLiquidations.get).toHaveBeenCalledWith("powercalorificversion");
    expect(result).toEqual([{
      id: 1,
      idPuntoEntregaGas: 10,
      fecha: "2025-05-01",
      poder: 999,
      nombre: "Punto A",
      codigoGDM: "GDM123"
    }]);
  });

  test("getPointById debe retornar un arreglo desde .value", async () => {
    const mockData = {
      value: [{
        id: 2,
        idPuntoEntregaGas: 11,
        fechaVigencia: "2025-06-01",
        valorPoderCalorifico: 1000,
        nombrePuntoEntrega: "Punto B",
        codigoGDM: "GDM456"
      }]
    };
    (axiosLiquidations.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await api.getPointById(2);

    expect(axiosLiquidations.get).toHaveBeenCalledWith("powercalorificversion/2");
    expect(result).toEqual([{
      id: 2,
      idPuntoEntregaGas: 11,
      fecha: "2025-06-01",
      poder: 1000,
      nombre: "Punto B",
      codigoGDM: "GDM456"
    }]);
  });

  test("updatePoint debe enviar datos transformados correctamente y retornar true", async () => {
    const input = [{
      id: 1,
      idPuntoEntregaGas: 10,
      fecha: "01-05-2025",
      poder: 888
    }];
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ status: 200 });

    const result = await api.updatePoint(input);

    expect(axiosLiquidations.post).toHaveBeenCalledWith(
      "powercalorificversion/batch-create-update",
      {
        records: [{
          id: 1,
          idPuntoEntregaGas: 10,
          fechaVigencia: "2025-05-01T00:00:00.000Z",
          valorPoderCalorifico: 888
        }]
      }
    );
    expect(result).toBe(true);
  });

  test("updatePoint debe retornar true si status es 204", async () => {
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ status: 204 });
    const result = await api.updatePoint([]);
    expect(result).toBe(true);
  });

  test("updatePoint debe retornar false si status es diferente", async () => {
    (axiosLiquidations.post as jest.Mock).mockResolvedValue({ status: 500 });
    const result = await api.updatePoint([]);
    expect(result).toBe(false);
  });
});
