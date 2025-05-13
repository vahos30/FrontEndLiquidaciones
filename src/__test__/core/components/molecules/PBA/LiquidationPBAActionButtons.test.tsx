import React from "react";
import { LiquidationPBAActionButtons } from "@/core/components/molecules/PBA/LiquidationPBAActionButtons";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@components/atoms/svgIcons", () => ({
  SvgCheckList: () => <div data-testid="svg-checklist">checklist-icon</div>,
  SvgDownload: () => <div data-testid="svg-download">download-icon</div>,
}));

jest.mock("@components/atoms", () => ({
  CustomButton: ({ onClick, disabled, children }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid="custom-button">
      {children}
    </button>
  ),
}));

describe("LiquidationPBAActionButtons", () => {
  const mockExport = jest.fn();
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both buttons and icons", () => {
    render(
      <LiquidationPBAActionButtons
        onExport={mockExport}
        onAction={mockAction}
        disabledExport={false}
        disabledLiquidate={false}
      />
    );

    expect(screen.getByText("Descargar")).toBeInTheDocument();
    expect(screen.getByText("Calcular")).toBeInTheDocument();
    expect(screen.getByTestId("svg-download")).toBeInTheDocument();
    expect(screen.getByTestId("svg-checklist")).toBeInTheDocument();
  });

  it("calls onExport when Descargar button is clicked", () => {
    render(
      <LiquidationPBAActionButtons
        onExport={mockExport}
        onAction={mockAction}
        disabledExport={false}
        disabledLiquidate={false}
      />
    );

    const buttons = screen.getAllByTestId("custom-button");
    fireEvent.click(buttons[0]); // Descargar
    expect(mockExport).toHaveBeenCalled();
  });

  it("calls onAction when Calcular button is clicked", () => {
    render(
      <LiquidationPBAActionButtons
        onExport={mockExport}
        onAction={mockAction}
        disabledExport={false}
        disabledLiquidate={false}
      />
    );

    const buttons = screen.getAllByTestId("custom-button");
    fireEvent.click(buttons[1]); // Calcular
    expect(mockAction).toHaveBeenCalled();
  });

  it("disables buttons based on props", () => {
    render(
      <LiquidationPBAActionButtons
        onExport={mockExport}
        onAction={mockAction}
        disabledExport={true}
        disabledLiquidate={true}
      />
    );

    const buttons = screen.getAllByTestId("custom-button");
    expect(buttons[0]).toBeDisabled(); // Descargar
    expect(buttons[1]).toBeDisabled(); // Calcular
  });
});
