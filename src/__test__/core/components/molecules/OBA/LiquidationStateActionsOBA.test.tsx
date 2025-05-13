import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LiquidationStateActionsOBA } from "@/core/components/molecules/OBA/LiquidationStateActionsOBA";

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

jest.mock("@components/atoms/ModalBase", () => ({
  ModalBase: ({ show, onHide, children }: any) => show ? (
    <div data-testid="ModalBase">
      <button onClick={onHide}>Cerrar</button>
      {children}
    </div>
  ) : null
}));

const mockLiquidation = {
  idliquidation: "123",
  estado: "Liquidado",
  mensajeError: "Error crítico",
  puntoDeEntrega: "Punto X",
  idPuntoEntrega: 456,
  acumuladoDesbalanceDiarioMbtu: 10,
  acumuladoDesbalanceMensualMbtu: 20,
  acumuladoDesbalanceAcumuladoMbtu: 30,
  acumuladoDesbalanceUsd: 1000,
  acumuladoConsolidadoNominaciones: 50,
  acumuladoEntregaKPC: 200,
  acumuladoPoderCalorifico: 9500,
  checked: true,
  fechaLiquidacion: "2023-01-01",
  tipoLiquidacion: "Final",
  usuarioLiquidacion: "admin",
  observaciones: "Sin observaciones",
  verDetalle: true // Updated to match the expected type
};

const mockSearch = {
  months: { month: 1, year: 2023 },
  deliveryPoint: [{ label: "Point A", value: "123" }]
};

describe("LiquidationStateActionsOBA", () => {
  test("cierra el modal al hacer click en 'Cerrar'", () => {
    render(<LiquidationStateActionsOBA liquidation={mockLiquidation} search={mockSearch} />);
    fireEvent.click(screen.getByRole("button")); // abrir
    fireEvent.click(screen.getByText("Cerrar")); // cerrar
    expect(screen.queryByTestId("ModalBase")).not.toBeInTheDocument();
  });

  test("no renderiza SvgCheck ni SvgError cuando no aplica", () => {
    const liquidation = { ...mockLiquidation, estado: "Pendiente", mensajeError: null };
    render(<LiquidationStateActionsOBA liquidation={liquidation} search={mockSearch} />);
    expect(screen.queryByTestId("SvgCheck")).not.toBeInTheDocument();
    expect(screen.queryByTestId("SvgError")).not.toBeInTheDocument();
  });
});
