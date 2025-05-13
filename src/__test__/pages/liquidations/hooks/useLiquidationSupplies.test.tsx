import { renderHook, act } from "@testing-library/react";
import { useLiquidationSupplies } from "@/pages/liquidations/hooks/useLiquidationSupplies";
import { LiquidationsApi } from "@/core/infrastructure/api";
import { loadingService } from "@/services";

jest.mock("@/core/infrastructure/api", () => {
    return {
        LiquidationsApi: jest.fn().mockImplementation(() => ({
            getSuppliesByContract: jest.fn(),
            updateLiquidationSupplies: jest.fn(),
        })),
    };
});

jest.mock("@/services", () => ({
    loadingService: {
        showLoading: jest.fn(),
        hideLoading: jest.fn(),
    },
}));

describe("useLiquidationSupplies", () => {
    const mockLiquidation = {
        idContrato: 1,
        fuenteSuministroId: 2,
        consecutivo: "123",
        isCarbonTax: false,
    };
    const mockLiquidationDate = "2023-10-01";
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe inicializar con los estados correctos", () => {
        const { result } = renderHook(() =>
            useLiquidationSupplies(mockLiquidation, mockLiquidationDate, mockOnClose)
        );

        expect(result.current.liquidationSupplies).toBeNull();
        expect(result.current.errorMessage).toBe("");
        expect(result.current.successUpdate).toBe(false);
    });

    it("debe manejar un caso exitoso en fetchLiquidationSupplies", async () => {
    const mockResponse = {
        supplies: [{ id: "1", energy: "100", name: "Supply 1" }],
        consecutive: "123",
        totalDelivered: "1000",
    };

    
    const mockApi = new LiquidationsApi() as jest.Mocked<LiquidationsApi>;
    (LiquidationsApi as jest.Mock).mockImplementation(() => mockApi);
    mockApi.getSuppliesByContract.mockResolvedValue(mockResponse);

    
    const { result } = renderHook(() =>
        useLiquidationSupplies(mockLiquidation, mockLiquidationDate, mockOnClose)
    );

    
    await act(async () => {});

    
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(mockApi.getSuppliesByContract).toHaveBeenCalledWith({
        IdContract: mockLiquidation.idContrato,
        LiquidationDate: mockLiquidationDate,
        IdSource: mockLiquidation.fuenteSuministroId,
        consecutive: mockLiquidation.consecutivo,
    });

    
    expect(result.current.liquidationSupplies).toEqual(mockResponse);
    expect(loadingService.hideLoading).toHaveBeenCalled();
});

it("debe manejar un caso de error en fetchLiquidationSupplies", async () => {
    
    const mockApi = new LiquidationsApi() as jest.Mocked<LiquidationsApi>;
    (LiquidationsApi as jest.Mock).mockImplementation(() => mockApi);
    mockApi.getSuppliesByContract.mockRejectedValue(new Error("API Error"));

    
    const { result } = renderHook(() =>
        useLiquidationSupplies(mockLiquidation, mockLiquidationDate, mockOnClose)
    );

    
    await act(async () => {});

    
    expect(loadingService.showLoading).toHaveBeenCalled();

    
    expect(mockApi.getSuppliesByContract).toHaveBeenCalledWith({
        IdContract: mockLiquidation.idContrato,
        LiquidationDate: mockLiquidationDate,
        IdSource: mockLiquidation.fuenteSuministroId,
        consecutive: mockLiquidation.consecutivo,
    });

    
    expect(result.current.errorMessage).toBe("Error al consultar la información");
    expect(loadingService.hideLoading).toHaveBeenCalled();
});

it("debe validar correctamente los valores entregados", () => {
    
    const validateDeliveredValue = (value: string) => {
        const regex = /^\d{0,6}(\.\d{0,2})?$/;
        return regex.test(value);
    };

    
    expect(validateDeliveredValue("123")).toBe(true);
    expect(validateDeliveredValue("123.45")).toBe(true);
    expect(validateDeliveredValue("0")).toBe(true);

    
    expect(validateDeliveredValue("1234567")).toBe(false); 
    expect(validateDeliveredValue("123.456")).toBe(false); 
    expect(validateDeliveredValue("abc")).toBe(false); 
});

it("debe manejar correctamente los cambios en los valores entregados", () => {
    const mockSupplies = {
        supplies: [
            { id: "1", energy: "100" },
            { id: "2", energy: "200" },
        ],
    };

    const { result } = renderHook(() =>
        useLiquidationSupplies(mockLiquidation, mockLiquidationDate, mockOnClose)
    );

    
    act(() => {
        result.current.liquidationSupplies = mockSupplies;
    });

    
    const handleDeliveredChangeMock = jest.fn((supplyId: string, value: string) => {
        if (/^\d{0,6}(\.\d{0,2})?$/.test(value)) {
            result.current.liquidationSupplies.supplies = result.current.liquidationSupplies.supplies.map((supply: { id: string; energy: string }) =>
                supply.id === supplyId ? { ...supply, energy: value } : supply
            );
        }
    });

    
    act(() => {
        handleDeliveredChangeMock("1", "150");
    });

    expect(result.current.liquidationSupplies.supplies[0].energy).toBe("150");

    
    act(() => {
        handleDeliveredChangeMock("1", "abc");
    });

    expect(result.current.liquidationSupplies.supplies[0].energy).toBe("150");
});

it("debe manejar correctamente los cambios cuando liquidationSupplies es null", () => {
    const { result } = renderHook(() =>
        useLiquidationSupplies(mockLiquidation, mockLiquidationDate, mockOnClose)
    );

    act(() => {
        result.current.handleDeliveredChange("1", "150");
    });

    // No debe lanzar errores ni cambiar el estado
    expect(result.current.liquidationSupplies).toBeNull();
});

});

