import { render, screen, fireEvent } from "@testing-library/react";
import { LiquidationOBAFilters } from "@/core/components/molecules/OBA/LiquidationOBAFilters";
import { useLiquidationOBAFilters } from "@/pages/oba/hooks";

jest.mock("@/pages/oba/hooks");

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

const mockUseLiquidationOBAFilters = useLiquidationOBAFilters as jest.Mock;

describe("LiquidationOBAFilters", () => {
    const mockOnSubmit = jest.fn();
    const mockOnChangeSelects = jest.fn();

    beforeEach(() => {
        mockUseLiquidationOBAFilters.mockReturnValue({
            deliveryPoint: [{ label: "Point 1", value: "1" }],
            selectedDeliveryPoint: null,
            selectedMonth: 1,
            selectedYear: 2023,
            handleMonthYearChange: jest.fn(),
            handleChange: jest.fn(),
            resetFilters: jest.fn(),
        });
    });

    it("calls onSubmit when the 'Buscar' button is clicked", () => {
        render(
            <LiquidationOBAFilters
                onSubmit={mockOnSubmit}
                onChangeSelects={mockOnChangeSelects}
                isLoading={false}
            />
        );

        fireEvent.click(screen.getByText("Buscar"));
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("calls resetFilters when the 'Limpiar' button is clicked", () => {
        const mockResetFilters = jest.fn();
        mockUseLiquidationOBAFilters.mockReturnValueOnce({
            ...mockUseLiquidationOBAFilters(),
            resetFilters: mockResetFilters,
        });

        render(
            <LiquidationOBAFilters
                onSubmit={mockOnSubmit}
                onChangeSelects={mockOnChangeSelects}
                isLoading={false}
            />
        );

        fireEvent.click(screen.getByText("Limpiar"));
        expect(mockResetFilters).toHaveBeenCalled();
    });
});