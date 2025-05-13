import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomTableOBA } from "@/core/components/molecules/OBA/CustomTableOBA";
import { HEADER_LIQUIDATIONS_OBA } from "@/core/utils";

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

describe("CustomTableOBA Component", () => {
    const mockLiquidationDetails = [
        {
            fecha: "2023-01-01",
            entregaKPC: 100,
            poderCalorifico: 50,
            consolidadoNominaciones: 200,
            desbalanceDiarioMbtu: 10,
            desbalanceMensualMbtu: 20,
            desbalanceAcumuladoMbtu: 30,
            desbalanceUsd: 40,
        },
    ];

    it("renders the table headers correctly", () => {
        render(<CustomTableOBA liquidationDetails={mockLiquidationDetails} />);
        
        HEADER_LIQUIDATIONS_OBA.forEach((header, index) => {
            if (index <= 7) {
                expect(screen.getByText(header)).toBeInTheDocument();
            }
        });
    });

    it("renders the specific header value correctly", () => {
        render(<CustomTableOBA liquidationDetails={mockLiquidationDetails} />);
        
        expect(screen.getByText(HEADER_LIQUIDATIONS_OBA[6])).toBeInTheDocument();
    });
});