import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LiquidationCardHigheringDetails } from "@/core/components/molecules/Higheringcome/LiquidationCardHigheringDetails";
import { STATE_LIQUIDATED, HEADERS_DETAILS_LIQUIDATION_HIGHERING } from "@/core/utils";

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

jest.mock("@/core/components/atoms/svgIcons", () => ({
  SvgCheck: () => <svg data-testid="SvgCheck" />,
  SvgError: ({ message, index }: { message: string; index: string }) => (
    <svg data-testid="SvgError" data-message={message} data-index={index} />
  )
}));

describe("LiquidationCardHigheringDetails", () => {
  const mockLiquidation = {
    idliquidation: "123",
    estado: STATE_LIQUIDATED,
    mensajeError: "Error grave",
    totalHigherIncome: "1000",
    totalIncomeUSD: "500",
    totalIncomeKPC: "1500",
    liquidationPercentage: "75%"
  };

  test("renderiza todos los headers correctamente", () => {
    render(<LiquidationCardHigheringDetails liquidation={mockLiquidation} />);
    HEADERS_DETAILS_LIQUIDATION_HIGHERING.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renderiza valores de liquidación correctamente", () => {
    render(<LiquidationCardHigheringDetails liquidation={mockLiquidation} />);
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  test("renderiza SvgCheck y SvgError cuando estado es 'LIQUIDATED' y mensajeError existe", () => {
    render(<LiquidationCardHigheringDetails liquidation={mockLiquidation} />);
    expect(screen.getByTestId("SvgCheck")).toBeInTheDocument();
    expect(screen.getByTestId("SvgError")).toBeInTheDocument();
    expect(screen.getByTestId("SvgError")).toHaveAttribute("data-message", "Error grave");
    expect(screen.getByTestId("SvgError")).toHaveAttribute("data-index", "123");
  });

  test("no renderiza SvgCheck si estado no es 'LIQUIDATED'", () => {
    const mock = { ...mockLiquidation, estado: "PENDIENTE" };
    render(<LiquidationCardHigheringDetails liquidation={mock} />);
    expect(screen.queryByTestId("SvgCheck")).not.toBeInTheDocument();
  });

  test("no renderiza SvgError si mensajeError es null", () => {
    const mock = { ...mockLiquidation, mensajeError: null };
    render(<LiquidationCardHigheringDetails liquidation={mock} />);
    expect(screen.queryByTestId("SvgError")).not.toBeInTheDocument();
  });
});
