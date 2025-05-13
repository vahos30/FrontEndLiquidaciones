import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecoveryGdM from "@/pages/recoveryGdM/RecoveryGdM";
// Mock de utilidades
const mockExportExcel = jest.fn();
jest.mock("@/core/utils", () => {
  const mockExportExcel = jest.fn(); // <- definir aquí dentro

  return {
    ExcelClass: { ExportExcel: mockExportExcel },
    HEADERS_EXPORT_EXCEL_GDM: [],
    MONTH_NAMES: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    getMonthDefault: () => 1,
    getYearDefault: () => 2025,
    defaultMonthAndYear: () => ({ defaultMonth: 1, defaultYear: 2025 }),
    __esModule: true, // en caso de uso con módulos ES
  };
});

// Mocks de componentes externos
jest.mock("@/core/components/molecules", () => ({
  LiquidationFilters: ({ onSubmit, onChangeSelects }: any) => (
    <>
      <button onClick={() => onSubmit()}>Buscar</button>
      <button onClick={() => onChangeSelects({ months: { month: 1, year: 2025 } })}>Cambiar filtros</button>
    </>
  ),
  LiquidationActionButtons: ({ onExport, disabledExport }: any) => (
    <button disabled={disabledExport} onClick={onExport}>Exportar</button>
  ),
  LiquidationSelectAll: () => <div data-testid="select-all" />,
  MessageAndExit: ({ errorMessage, successMessage }: any) => (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
    </>
  ),
}));

jest.mock("@/core/components/molecules/RecoveryGdM/RecoveryGdMCard", () => ({
  RecoveryGdMCard: ({ liquidations }: any) => (
    <div data-testid="recovery-card">{JSON.stringify(liquidations)}</div>
  ),
}));

jest.mock("@/core/components/atoms", () => ({
  LoadingComponent: ({ isLoading }: any) =>
    isLoading ? <div>Cargando...</div> : null,
}));

// Mocks de hooks
const mockSetSearch = jest.fn();
const mockSetLiquidation = jest.fn();
const mockGetLiquidation = jest.fn();
const mockGetDataByExport = jest.fn().mockReturnValue([{ test: "data" }]);

jest.mock("@/pages/recoveryGdM/hooks", () => ({
  useRecoveryGdM: () => ({
    liquidation: [{ razonSocial: "Empresa 1", detalles: [] }],
    error: null,
    success: null,
    setLiquidation: mockSetLiquidation,
    getLiquidation: mockGetLiquidation,
    getDataByExport: mockGetDataByExport,
    loading: false,
  }),
}));

jest.mock("@/pages/liquidations/hooks", () => ({
  useButtonsDisabled: () => ({
    disabledButtonExport: false,
  }),
  useValidationSearch: () => ({
    search: { months: { month: 1, year: 2025 } },
    setSearch: mockSetSearch,
  }),
}));



// Tests
describe("RecoveryGdM", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente los elementos básicos", () => {
    render(<RecoveryGdM />);
    expect(screen.getByText("Buscar")).toBeInTheDocument();
    expect(screen.getByText("Exportar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escriba aquí")).toBeInTheDocument();
    expect(screen.getByTestId("select-all")).toBeInTheDocument();
    expect(screen.getByTestId("recovery-card")).toBeInTheDocument();
  });

  it("permite escribir en el input de recobro", () => {
    render(<RecoveryGdM />);
    const input = screen.getByPlaceholderText("Escriba aquí") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5000" } });
    expect(input.value).toBe("5000");
  });

  it("ejecuta búsqueda al hacer clic en 'Buscar'", () => {
    render(<RecoveryGdM />);
    fireEvent.click(screen.getByText("Buscar"));
    expect(mockGetLiquidation).toHaveBeenCalled();
  });

  it("ejecuta exportación al hacer clic en 'Exportar'", async () => {
    render(<RecoveryGdM />);
    fireEvent.click(screen.getByText("Exportar"));
    await waitFor(() => {
      expect(mockGetDataByExport).toHaveBeenCalledWith(1, 2025);
    });
  });
});
