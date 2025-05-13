import { render, screen } from "@testing-library/react";
import { LiquidationDataCardOBA } from "@/core/components/molecules/OBA/LiquidationDataCardOBA";

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

jest.mock("@components/molecules", () => ({
    NoData: jest.fn(() => <div>No Data Available</div>),
}));

jest.mock("@components/atoms", () => ({
    Checkbox: jest.fn(({ checked, onChange, disabled }) => (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    )),
    Line: jest.fn(() => <hr />),
    TextWithValues: jest.fn(({ title, value }) => (
        <div>
            {title}
            {value}
        </div>
    )),
}));

jest.mock("@/pages/liquidations/hooks", () => ({
    useCheckboxSelection: jest.fn(() => ({
        selectedLiquidations: [],
        handleCheckboxChange: jest.fn(),
    })),
}));

jest.mock("@/core/components/molecules/OBA/LiquidationDataCardOBADetails", () => ({
    LiquidationCardOBADetalis: jest.fn(({ liquidation, search }) => (
        <div>
            Details for {liquidation.idliquidation} with search {search}
        </div>
    )),
}));

describe("LiquidationDataCardOBA", () => {
    const mockSearch ={
        months: { month: 1, year: 2025 },
        deliveryPoint: [{ label: "Arjona", value: "1" }],
    }
    
    const mockOnChangeSelection = jest.fn();

    it("renders NoData when liquidations array is empty", () => {
        render(
            <LiquidationDataCardOBA
                liquidations={[]}
                onChangeSelection={mockOnChangeSelection}
                search={mockSearch}
            />
        );
        expect(screen.getByText("No Data Available")).toBeInTheDocument();
    });
});