import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LiquidationCardHighering } from "@/core/components/molecules/Higheringcome/LiquidationCardHighering";

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

jest.mock("@/core/components/atoms", () => ({
  CustomAccordion: ({ header, children, clas }: any) => (
    <div data-testid="accordion" className={clas}>
      <div data-testid="accordion-header">{header}</div>
      <div data-testid="accordion-content">{children}</div>
    </div>
  )
}));

jest.mock("@/core/components/molecules", () => ({
  NoData: () => <div data-testid="NoData">No data</div>
}));

jest.mock("@/core/components/molecules/Higheringcome/LiquidationHigheringHeader", () => ({
  LiquidationHigheringHeader: ({ liquidation }: any) => (
    <div data-testid={`Header-${liquidation.idliquidation}`}>Header-{liquidation.idliquidation}</div>
  )
}));

jest.mock("@/core/components/molecules/Higheringcome/LiquidationCardHigheringDetails", () => ({
  LiquidationCardHigheringDetails: ({ liquidation }: any) => (
    <div data-testid={`Details-${liquidation.idliquidation}`}>Details-{liquidation.idliquidation}</div>
  )
}));

describe("LiquidationCardHighering", () => {
  test("renderiza <NoData /> si no hay liquidaciones", () => {
    render(<LiquidationCardHighering liquidations={[]} onChangeSelection={jest.fn()} />);
    expect(screen.getByTestId("NoData")).toBeInTheDocument();
  });

  test("renderiza un <CustomAccordion> por cada liquidación", () => {
    const mockLiquidations = [
      { idliquidation: "1", mensajeError: null },
      { idliquidation: "2", mensajeError: "Error encontrado" }
    ];
    render(<LiquidationCardHighering liquidations={mockLiquidations} onChangeSelection={jest.fn()} />);
    
    expect(screen.getAllByTestId("accordion")).toHaveLength(2);
    expect(screen.getByTestId("Header-1")).toBeInTheDocument();
    expect(screen.getByTestId("Details-2")).toBeInTheDocument();
  });

  test("añade clase 'has-error' si hay mensajeError", () => {
    const mockLiquidations = [{ idliquidation: "1", mensajeError: "Error" }];
    render(<LiquidationCardHighering liquidations={mockLiquidations} onChangeSelection={jest.fn()} />);
    const accordion = screen.getByTestId("accordion");
    expect(accordion).toHaveClass("has-error");
  });

  test("no añade clase 'has-error' si no hay mensajeError", () => {
    const mockLiquidations = [{ idliquidation: "2", mensajeError: null }];
    render(<LiquidationCardHighering liquidations={mockLiquidations} onChangeSelection={jest.fn()} />);
    const accordion = screen.getByTestId("accordion");
    expect(accordion).not.toHaveClass("has-error");
  });
});
