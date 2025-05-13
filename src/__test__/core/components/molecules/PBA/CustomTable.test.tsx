import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomTable } from "@/core/components/molecules/PBA/CustomTable";
import { useDailyConsumption } from "@/pages/pba/hooks/useDailyConsumption";

jest.mock("@/pages/pba/hooks/useDailyConsumption", () => ({
  useDailyConsumption: jest.fn(),
}));

jest.mock("@/core/components/atoms", () => ({
  LoadingComponent: ({ isLoading }: any) => isLoading ? <div data-testid="loading" /> : null,
  TextWithValues: ({ title, value }: any) => (
    <div data-testid="text-with-values">
      {title}: {value}
    </div>
  ),
}));

jest.mock("@/core/components/organisms", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

describe("CustomTable", () => {
  const mockGetDailyConsumption = jest.fn();

  const mockSearchFilters = {
    months: { month: 2, year: 2025 }, // Marzo (mes inicia desde 0 si es moment, aquí se usa 1-based)
    consecutives: [{ value: "123", label: "Socio A" }]
  };
  

  const mockDataWithItems = {
    DataDailyConsumption: {
      FuenteSuministro: "Fuente X",
      Fechas: {
        items: [
          {
            fecha: "2024-01-01",
            resultados: [{ id: 1, energia: 100, desbalance: 10 }],
          },
        ],
        totalCount: 1,
      },
      Socios: [{ id: 1, nombre: "Socio 1" }],
    },
    loading: false,
    getDailyConsumption: mockGetDailyConsumption,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading component when loading is true", () => {
    (useDailyConsumption as jest.Mock).mockReturnValue({
      loading: true,
      DataDailyConsumption: {},
      getDailyConsumption: jest.fn(),
    });

    render(<CustomTable searchFilters={mockSearchFilters} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders table with data when items exist", () => {
    (useDailyConsumption as jest.Mock).mockReturnValue(mockDataWithItems);

    render(<CustomTable searchFilters={mockSearchFilters} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders Pagination component", () => {
    (useDailyConsumption as jest.Mock).mockReturnValue(mockDataWithItems);

    render(<CustomTable searchFilters={mockSearchFilters} />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
