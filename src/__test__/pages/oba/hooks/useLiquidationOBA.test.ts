import { renderHook, act } from "@testing-library/react";
import { useLiquidationOBA } from "@/pages/oba/hooks/useLiquidationOBA";
import { LiquidationOBA } from "@/core/infrastructure/api";

jest.mock("@/core/infrastructure/api");
jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));
jest.mock("@/core/infrastructure/axiosContract", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));
describe("useLiquidationOBA", () => {
    const mockSearchFilters = {
        months: { month: 0, year: 2024 },
        deliveryPoint: [{ value: '1', label: 'Arjona' }],
    }
    let mockApi: jest.Mocked<LiquidationOBA>;

    beforeEach(() => {
        mockApi = new LiquidationOBA() as jest.Mocked<LiquidationOBA>;
        (LiquidationOBA as jest.Mock).mockImplementation(() => mockApi);
    });

    it("should fetch liquidations successfully", async () => {
        const mockResponse = {
            liquidaciones: [
                {
                    idliquidation: "string1",
                    idPuntoEntrega: 1,
                    puntoDeEntrega: "Arjona",
                    acumuladoDesbalanceDiarioMbtu: 0,
                    acumuladoDesbalanceMensualMbtu: 0,
                    acumuladoDesbalanceAcumuladoMbtu: 0,
                    acumuladoDesbalanceUsd: 0,
                    acumuladoConsolidadoNominaciones: 0,
                    acumuladoEntregaKPC: 0,
                    acumuladoPoderCalorifico: 0,
                    mensajeError: null,
                    estado: "Liquidado",
                    checked:false,
                    verDetalle: false,
                }
            ],
            error: null,
        };
        mockApi.getListOBA.mockResolvedValueOnce(mockResponse);

        const { result } = renderHook(() => useLiquidationOBA(mockSearchFilters));

        await act(async () => {
            await result.current.getLiquidation();
        });

        expect(mockApi.getListOBA).toHaveBeenCalledWith(mockSearchFilters);
        expect(result.current.liquidationsOBA).toEqual(mockResponse.liquidaciones);
        expect(result.current.error).toBeNull();
    });

    it("should handle errors when fetching liquidations", async () => {
        mockApi.getListOBA.mockRejectedValueOnce(new Error("API Error"));

        const { result } = renderHook(() => useLiquidationOBA(mockSearchFilters));

        await act(async () => {
            await result.current.getLiquidation();
        });

        expect(mockApi.getListOBA).toHaveBeenCalledWith(mockSearchFilters);
        expect(result.current.error).toBe("Error al consultar las liquidaciones OBA");
    });
    

    it("should handle errors during calculations", async () => {
        mockApi.makeCalculations.mockRejectedValueOnce(new Error("Calculation Error"));

        const { result } = renderHook(() => useLiquidationOBA(mockSearchFilters));

        await act(async () => {
            await result.current.makeCalculations();
        });

        expect(result.current.error).toBe("Error al realizar el cálculos de OBA");
    });
});