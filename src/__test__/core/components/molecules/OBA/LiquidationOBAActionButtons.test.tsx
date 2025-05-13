import { render, screen, fireEvent } from "@testing-library/react";
import { LiquidationOBAActionButtons } from "@/core/components/molecules/OBA/LiquidationOBAActionButtons";

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

describe("LiquidationOBAActionButtons", () => {
    const mockOnExport = jest.fn();
    const mockOnAction = jest.fn();

    const defaultProps = {
        onExport: mockOnExport,
        onAction: mockOnAction,
        disabledExport: false,
        disabledLiquidate: false,
    };

    it("calls onExport when the export button is clicked", () => {
        render(<LiquidationOBAActionButtons {...defaultProps} />);

        const exportButton = screen.getByRole("button", { name: /descargar/i });
        fireEvent.click(exportButton);

        expect(mockOnExport).toHaveBeenCalledTimes(1);
    });

    it("calls onAction when the action button is clicked", () => {
        render(<LiquidationOBAActionButtons {...defaultProps} />);

        const actionButton = screen.getByRole("button", { name: /calcular/i });
        fireEvent.click(actionButton);

        expect(mockOnAction).toHaveBeenCalledTimes(1);
    });

    it("disables the export button when disabledExport is true", () => {
        render(<LiquidationOBAActionButtons {...defaultProps} disabledExport={true} />);

        const exportButton = screen.getByRole("button", { name: /descargar/i });
        expect(exportButton).toBeDisabled();
    });

    it("disables the action button when disabledLiquidate is true", () => {
        render(<LiquidationOBAActionButtons {...defaultProps} disabledLiquidate={true} />);

        const actionButton = screen.getByRole("button", { name: /calcular/i });
        expect(actionButton).toBeDisabled();
    });
});