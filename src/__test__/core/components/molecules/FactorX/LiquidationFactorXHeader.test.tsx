import { render, screen } from "@testing-library/react";
import { LiquidationFactorXHeader } from "../../../../../core/components/molecules/FactorX/LiquidationFactorXHeader";

describe("LiquidationFactorXHeader", () => {
    it("renders the headers correctly", () => {
        render(<LiquidationFactorXHeader liquidation={{ FuenteSuministro: "", FactorX: "" }} />);
        expect(screen.getByText("Fuente de suministro")).toBeInTheDocument();
        expect(screen.getByText("Factor X")).toBeInTheDocument();
    });

    it("renders the liquidation data correctly", () => {
        const mockLiquidation = {
            FuenteSuministro: "Test Source",
            FactorX: "10",
        };

        render(<LiquidationFactorXHeader liquidation={mockLiquidation} />);
        expect(screen.getByText("Fuente de suministro")).toBeInTheDocument();
        expect(screen.getByText("Factor X")).toBeInTheDocument();
        expect(screen.getByText("Test Source")).toBeInTheDocument();
        expect(screen.getByText("10%")).toBeInTheDocument();
    });
});