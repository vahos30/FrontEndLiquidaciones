import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HigheringcomeFilters } from "@/core/components/molecules/Higheringcome/HigheringcomeFilters";

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

jest.mock('@/pages/higherincome/hooks', () => ({
  useHigheringcomeFilters: (onChangeSelects: any) => ({
    selectedMonth: 4,
    selectedYear: 2025,
    handleMonthYearChange: (val: any) => onChangeSelects(val),
    resetFilters: jest.fn()
  })
}));

describe('HigheringcomeFilters', () => {
  const mockOnSubmit = jest.fn();
  const mockOnChangeSelects = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('invoca onSubmit al hacer click en "Buscar"', () => {
    render(<HigheringcomeFilters onSubmit={mockOnSubmit} onChangeSelects={mockOnChangeSelects} isLoading={false} />);
    fireEvent.click(screen.getByText('Buscar'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
