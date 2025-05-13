import { renderHook, act } from '@testing-library/react';
import { useLiquidation } from '@/pages/liquidations/hooks/useLiquidation';
import { LiquidationsApi } from '@/core/infrastructure/api';

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock('@/core/infrastructure/api', () => ({
  LiquidationsApi: jest.fn().mockImplementation(() => ({
    getLiquidation: jest.fn().mockResolvedValue([
      { idliquidation: '1', puedeLiquidar: true, estado: 'Inicial', checked: true }
    ]),
    updateLiquidation: jest.fn().mockResolvedValue("Exitoso!"),
    sendToPrepareSap: jest.fn().mockResolvedValue({ success: true, mensaje: "Enviado a SAP" })
  }))
}));

describe('useLiquidation', () => {
  const filters = {
    months: { month: 3, year: 2025 },
    clients: [],
    consecutives: [],
    supplys: [],
    states: []
  };

  test('getLiquidation carga liquidaciones y evalúa puedeLiquidar', async () => {
    const { result } = renderHook(() => useLiquidation(filters));
    await act(() => result.current.getLiquidation());

    expect(result.current.liquidation).toHaveLength(1);
    expect(result.current.canLiquidate).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  test('updateLiquidation actualiza success si todo sale bien', async () => {
    const { result } = renderHook(() => useLiquidation(filters));

    await act(() => result.current.updateLiquidation([
      { idliquidation: '1', month: 4, year: 2025 }
    ]));

    expect(result.current.success).toBe("Liquidación realizada correctamente!");
    expect(result.current.error).toBe('');
  });

  test('sendToPrepareSap actualiza estado de las liquidaciones y success', async () => {
    const { result } = renderHook(() => useLiquidation(filters));
    await act(() => result.current.getLiquidation());

    await act(() => result.current.sendToPrepareSap(['1']));

    expect(result.current.success).toBe("Enviado a SAP");
    expect(result.current.liquidation[0].estado).toBe("Pendiente Envío SAP");
    expect(result.current.liquidation[0].checked).toBe(false);
  });

  test('sendToPrepareSap captura mensaje de error del response', async () => {
    const apiMock = new LiquidationsApi();
    jest.spyOn(apiMock, 'sendToPrepareSap').mockResolvedValueOnce({ success: false, mensaje: 'Error SAP' });

    const { result } = renderHook(() => useLiquidation(filters));
    await act(() => result.current.sendToPrepareSap(['1']));

    expect(result.current.error).toBe("");
  });

  test('maneja errores inesperados y actualiza error', async () => {
    const apiMock = new LiquidationsApi();
    jest.spyOn(apiMock, 'getLiquidation').mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useLiquidation(filters));
    await act(() => result.current.getLiquidation());

    expect(result.current.error).toBe("");
    expect(result.current.loading).toBe(false);
  });
});
