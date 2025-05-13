import { renderHook, act } from "@testing-library/react";
import { useParticipationPartner } from "@/pages/pba/hooks/useParticipationPartner";

jest.mock("@/core/infrastructure/axiosLiquidations", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() } }
  }))
}));

jest.mock("@/core/infrastructure/api", () => ({
  MasterApi: jest.fn().mockImplementation(() => ({
    getParticipationByDate: jest.fn().mockResolvedValue([
      { NombreSocio: "Socio A", PorcentajeParticipacion: 25 }
    ])
  }))
}));

describe("useParticipationPartner", () => {
  const mockContractId = "ABC123";
  const mockDate = "2025-05-01";

  test("inicializa con arreglo vacío y carga participación correctamente", async () => {
    const { result } = renderHook(() =>
      useParticipationPartner(mockContractId, mockDate)
    );

    await act(async () => {
      await result.current.getParticipationByDate();
    });

    expect(result.current.participationByDate).toEqual([
      { NombreSocio: "Socio A", PorcentajeParticipacion: 25 }
    ]);
  });
});
