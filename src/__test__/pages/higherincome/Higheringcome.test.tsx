import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Higheringcome from '@/pages/higherincome/Higheringcome';
import { ExcelClass } from '@/core/utils/ExcelClass';

// Mock modules
jest.mock('@/core/infrastructure/axiosLiquidations', () => ({
  default: {
    create: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
    },
  },
}));
jest.mock('@/core/infrastructure/axiosContract', () => ({
  default: {
    create: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
    },
  },
}));
jest.mock('@/core/utils/ExcelClass', () => ({ ExcelClass: { ExportExcel: jest.fn() } }));

// Mock hooks
jest.mock('@/pages/liquidations/hooks/useValidationSearch', () => ({
  useValidationSearch: () => ({
    search: { months: { month: 5, year: 2025 }, clients: [], consecutives: [], supplys: [], states: [] },
    setSearch: jest.fn(),
  }),
}));
jest.mock('@/pages/higherincome/hooks/useLiquidationHigheringcome', () => ({
  useLiquidationHigheringcome: () => ({
    liquidation: [{ idliquidation: '1', checked: true, foo: 'bar' }],
    canLiquidate: false,
    error: 'err',
    success: 'ok',
    getLiquidation: jest.fn(),
    updateLiquidation: jest.fn(),
    loading: false,
  }),
}));
jest.mock('@/pages/liquidations/hooks/useButtonsDisabled', () => ({
  useButtonsDisabled: () => ({
    disabledButtonLiquidate: false,
    disabledButtonExport: false,
    disabledReadyToSap: false,
  }),
}));

// Mock components
jest.mock('@/core/components/atoms', () => ({ LoadingComponent: () => <div data-testid="loading" /> }));
jest.mock('@/core/components/molecules/Liquidations/LiquidationActionButtons', () => ({
  LiquidationActionButtons: (props: { onExport: () => void; onAction: () => void; disabledExport: boolean; disabledLiquidate: boolean }) => (
    <div>
      <button onClick={props.onExport} disabled={props.disabledExport}>Export</button>
      <button onClick={props.onAction} disabled={props.disabledLiquidate}>Liquidate</button>
    </div>
  ),
}));
jest.mock('@/core/components/molecules/Higheringcome', () => ({
  HigheringcomeFilters: (props: { onSubmit: () => void }) => <button onClick={props.onSubmit}>Search</button>,
  LiquidationCardHighering: (props: { liquidations: Array<{ idliquidation: string }> }) => (
    <ul data-testid="list">
      {props.liquidations.map(item => <li key={item.idliquidation}>{item.idliquidation}</li>)}
    </ul>
  ),
}));
jest.mock('@/core/components/molecules/MessageAndExit', () => ({
  MessageAndExit: (props: { errorMessage?: string; successMessage?: string }) => (
    <div>
      {props.errorMessage && <div data-testid="error">{props.errorMessage}</div>}
      {props.successMessage && <div data-testid="success">{props.successMessage}</div>}
    </div>
  ),
}));



describe('Higheringcome Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of liquidations', () => {
    render(<Higheringcome />);
    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('clicking Export calls ExportExcel', () => {
    render(<Higheringcome />);
    fireEvent.click(screen.getByText('Export'));
    expect(ExcelClass.ExportExcel).toHaveBeenCalled();
  });

  it('displays error and success messages', () => {
    render(<Higheringcome />);
    expect(screen.getByTestId('error')).toHaveTextContent('err');
    expect(screen.getByTestId('success')).toHaveTextContent('ok');
  });
});







