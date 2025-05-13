import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FactorXManager from "../../../pages/factorx/FactorXManager";
import { useFactorXLiquidation } from "../../../pages/factorx/hooks";

// Mocks de funciones necesarias
const mockSetSearch = jest.fn();
const mockGetLiquidation = jest.fn();
const mockSetFactors = jest.fn();
const mockLiquidateFactorX = jest.fn();

// Mock de hooks y utilidades
jest.mock("../../../pages/factorx/hooks", () => ({
  useValidationSearch: jest.fn(() => ({
    search: { months: { month: 0, year: 2025 } },
    setSearch: mockSetSearch,
  })),
  useFactorXLiquidation: jest.fn(() => ({
    factors: [{ idliquidation: 1, checked: false }],
    getLiquidation: mockGetLiquidation,
    setFactors: mockSetFactors,
    liquidateFactorX: mockLiquidateFactorX,
    error: null,
    success: null,
    loading: false,
  })),
}));

jest.mock("../../../pages/liquidations/hooks", () => ({
  useButtonsDisabled: jest.fn(() => ({
    disabledButtonLiquidate: false,
    disabledButtonExport: false,
  })),
}));

jest.mock("@/core/utils", () => ({
  ExcelClass: { ExportExcel: jest.fn() },
  MONTH_NAMES: ["Enero", "Febrero", "Marzo"],
  defaultMonthAndYear: () => ({ defaultMonth: 0, defaultYear: 2025 }),
  HEADERS_EXPORT_EXCEL_FACTOR_X: [],
}));

// Mock de los componentes necesarios
jest.mock("@/core/components/molecules", () => ({
  FactorXFilters: jest.fn(({ onSubmit, onChangeSelects }) => (
    <div>
      <button data-testid="filters-submit" onClick={onSubmit}>
        Buscar
      </button>
      <button
        data-testid="filters-change"
        onClick={() => onChangeSelects({ months: { month: 1, year: 2025 } })}
      >
        Cambiar Filtros
      </button>
    </div>
  )),
  LiquidationActionButtons: jest.fn(
    ({ onExport, onAction, disabledLiquidate, disabledExport }) => (
      <div>
        <button data-testid="export-button" onClick={onExport} disabled={disabledExport}>
          Exportar
        </button>
        <button data-testid="liquidate-button" onClick={onAction} disabled={disabledLiquidate}>
          Liquidar
        </button>
      </div>
    )
  ),
  LiquidationSelectAll: jest.fn(() => <div data-testid="select-all" />),
  LiquidationCardFactorX: jest.fn(() => <div data-testid="card" />),

  MessageAndExit: jest.fn(({ errorMessage, successMessage }) => (
    <div>
      {errorMessage && <span>{errorMessage}</span>}
      {successMessage && <span>{successMessage}</span>}
    </div>
  )),
}));

jest.mock("@/core/components/atoms", () => ({
  LoadingComponent: jest.fn(({ isLoading }) =>
    isLoading ? <div data-testid="loading" /> : null
  ),
}));

describe("FactorXManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente los elementos principales", () => {
    render(<FactorXManager />);
    expect(screen.getByTestId("filters-submit")).toBeInTheDocument();
    expect(screen.getByTestId("export-button")).toBeInTheDocument();
    expect(screen.getByTestId("liquidate-button")).toBeInTheDocument();
    expect(screen.getByTestId("select-all")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("llama a setSearch cuando se cambian los filtros", () => {
    render(<FactorXManager />);
    fireEvent.click(screen.getByTestId("filters-change"));
    expect(mockSetSearch).toHaveBeenCalledWith({ months: { month: 1, year: 2025 } });
  });

  it("llama a getLiquidation cuando se hace clic en buscar", () => {
    render(<FactorXManager />);
    fireEvent.click(screen.getByTestId("filters-submit"));
    expect(mockGetLiquidation).toHaveBeenCalled();
  });

  it("llama a liquidateFactorX cuando se hace clic en el botón Liquidar", () => {
    render(<FactorXManager />);
    fireEvent.click(screen.getByTestId("liquidate-button"));
    expect(mockLiquidateFactorX).toHaveBeenCalled();
  });

  it("muestra el componente de carga cuando loading es true", () => {
    // Mock específico para este test
    (useFactorXLiquidation as jest.Mock).mockImplementation(() => ({
      factors: [],
      getLiquidation: jest.fn(),
      setFactors: jest.fn(),
      liquidateFactorX: jest.fn(),
      error: null,
      success: null,
      loading: true,
    }));

    render(<FactorXManager />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("card")).not.toBeInTheDocument();
  });

  it("muestra mensajes de error y éxito específicos", () => {
    // Mock con error y success específicos
    (useFactorXLiquidation as jest.Mock).mockImplementation(() => ({
      factors: [],
      getLiquidation: jest.fn(),
      setFactors: jest.fn(),
      liquidateFactorX: jest.fn(),
      error: "Error de conexión con SAP",
      success: "Liquidación completada exitosamente",
      loading: false,
    }));

    render(<FactorXManager />);

    // Validar que los mensajes se renderizan correctamente
    expect(screen.getByText("Error de conexión con SAP")).toBeInTheDocument();
    expect(screen.getByText("Liquidación completada exitosamente")).toBeInTheDocument();
  });
});