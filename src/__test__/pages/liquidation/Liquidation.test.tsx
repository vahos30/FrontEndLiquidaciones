import React from 'react';
import '../../__mocks__/mockAxiosLiquidation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Liquidation } from '../../../pages/liquidations/Liquidation';


type AxiosMock = { interceptors: { request: { use: jest.Mock } }, get: jest.Mock, post: jest.Mock };
jest.mock('../../../core/infrastructure/axiosLiquidations', () => ({
  __esModule: true,
  default: { interceptors: { request: { use: jest.fn() } }, get: jest.fn(), post: jest.fn() } as AxiosMock
}));


const mockGet = jest.fn();

type ApiMock = { getLiquidation: typeof mockGet };
jest.mock('../../../core/infrastructure/api', () => ({
  LiquidationsApi: jest.fn().mockImplementation((): ApiMock => ({ getLiquidation: mockGet }))
}));


jest.mock('../../../pages/liquidations/hooks/useValidationSearch', () => ({
  useValidationSearch: () => ({ search: { months: { month: 0, year: 2025 } }, setSearch: jest.fn() })
}));


jest.mock('../../../core/components/molecules/Liquidations/LiquidationFilters', () => ({
  LiquidationFilters: ({ onSubmit }: { onSubmit: () => void }) => (
    <button data-testid="search-btn" onClick={onSubmit}>Buscar</button>
  )
}));
jest.mock('../../../core/components/atoms/LoadingComponent', () => ({ LoadingComponent: () => null }));
jest.mock('../../../core/components/molecules/MessageAndExit', () => ({ MessageAndExit: () => null }));
jest.mock('../../../core/components/atoms/MessageExitModal', () => ({ MessageExitModal: () => null }));
jest.mock('../../../core/components/organisms/LiquidationDataCard', () => ({ LiquidationData: () => <div data-testid="data">Data</div> }));

describe('Liquidation', () => {
  beforeEach(() => {
    mockGet.mockClear();
  });

  it('debe llamar a getLiquidation al hacer click en Buscar', async () => {
    mockGet.mockResolvedValue([]);

    render(<Liquidation />);

    fireEvent.click(screen.getByTestId('search-btn'));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith({ months: { month: 0, year: 2025 } });
    });
  });
});




