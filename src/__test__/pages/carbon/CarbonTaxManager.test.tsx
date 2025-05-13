import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarbonTaxManager from '../../../pages/carbon/CarbonTaxManager';

jest.mock('../../../pages/carbon/hooks', () => ({
  useLiquidationCarbonTax: jest.fn(() => ({
    liquidation: [],
    canLiquidate: false,
    error: null,
    rate: false,
    success: '',
    setLiquidation: jest.fn(),
    getLiquidation: jest.fn(),
    updateLiquidation: jest.fn(),
    loading: false,
  })),
}));

jest.mock('../../../pages/liquidations/hooks', () => ({
  useValidationSearch: jest.fn(() => ({
    search: { months: { month: 0, year: 2025 } },
    setSearch: jest.fn(),
  })),
  useButtonsDisabled: jest.fn(() => ({
    disabledButtonLiquidate: false,
    disabledButtonExport: false,
  })),
}));

jest.mock('@/core/utils', () => ({
  ExcelClass: { ExportExcel: jest.fn() },
  MONTH_NAMES: ['Enero', 'Febrero'],
  defaultMonthAndYear: () => ({ defaultMonth: 0, defaultYear: 2025 }),
  HEADERS_EXPORT_EXCEL_CARBON: [],
}));

jest.mock('@/core/components/molecules', () => ({
  LiquidationCarbonFilters: jest.fn(() => <div data-testid="filters" />),
  LiquidationActionButtons: jest.fn(() => <div data-testid="action-buttons" />),
  LiquidationSelectAll: jest.fn(() => <div data-testid="select-all" />),
  LiquidationCardCarbonTax: jest.fn(() => <div data-testid="card" />),
  MessageAndExit: jest.fn(() => <div data-testid="message" />),
}));

jest.mock('@/core/components/atoms', () => ({
  LoadingComponent: jest.fn(({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div data-testid="loading" /> : null
  ),
}));

describe('CarbonTaxManager', () => {
  it('renderiza correctamente los elementos principales', () => {
    render(<CarbonTaxManager />);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('select-all')).toBeInTheDocument();
    expect(screen.getByTestId('message')).toBeInTheDocument();
  });
});
    
    
    it('muestra el componente de carga cuando loading es verdadero', () => {
        (jest.requireMock('@/core/components/atoms').LoadingComponent as jest.Mock).mockImplementation(() => <div data-testid="loading" />);
        render(<CarbonTaxManager />);
    
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
    
    it('no muestra el componente de carga cuando loading es falso', () => {
        (jest.requireMock('@/core/components/atoms').LoadingComponent as jest.Mock).mockImplementation(() => null);
        render(<CarbonTaxManager />);
    
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
