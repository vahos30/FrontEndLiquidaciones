import { MasterApi } from "../../core/infrastructure/api/masterApi";
import axiosContract from '@/core/infrastructure/axiosContract';
import moment from 'moment';

jest.mock('../../core/infrastructure/axiosContract', () => ({
  get: jest.fn(),
}));

describe('MasterApi', () => {
  let api: MasterApi;

  beforeEach(() => {
    api = new MasterApi();
    jest.clearAllMocks();
  });

  test('getClients devuelve clientes correctamente', async () => {
    (axiosContract.get as jest.Mock).mockResolvedValue({
      data: { value: [{ id: 1, nameClient: 'Cliente A' }] },
    });
    const result = await api.getClients({ month: 0, year: 2024 });
    expect(axiosContract.get).toHaveBeenCalledWith('getclientebydate?ContractDate=1-2024');
    expect(result).toEqual([{ value: 1, label: 'Cliente A' }]);
  });

  test('getConsecutivesAndSupplys devuelve consecutivos y fuentes', async () => {
    (axiosContract.get as jest.Mock).mockResolvedValue({
      data: {
        value: {
          consecutive: ['C1', 'C2'],
          sourceSupply: [
            { id: 101, name: 'Fuente 1' },
            { id: 102, name: 'Fuente 2' },
          ],
        },
      },
    });

    const result = await api.getConsecutivesAndSupplys(5, 0, 2024);
    expect(axiosContract.get).toHaveBeenCalledWith('getconsecutiveandsourcesupply?IdClient=5&ContractDate=1-2024');
    expect(result).toEqual({
      consecutives: [
        { value: 'C1', label: 'C1' },
        { value: 'C2', label: 'C2' },
      ],
      supplies: [
        { value: '101', label: 'Fuente 1' },
        { value: '102', label: 'Fuente 2' },
      ],
    });
  });

  test('getConsecutivesByMonthYear retorna consecutivos correctamente', async () => {
    (axiosContract.get as jest.Mock).mockResolvedValue({
      data: { value: [{ consecutivo: 'A1' }] },
    });
    const result = await api.getConsecutivesByMonthYear({ month: 0, year: 2024 });
    expect(axiosContract.get).toHaveBeenCalledWith('getconsecutivesbydate?ContractDate=1-2024');
    expect(result).toEqual([{ value: 'A1', label: 'A1' }]);
  });

  test('getConsecutivesByMonthYearPBA retorna correctamente', async () => {
    (axiosContract.get as jest.Mock).mockResolvedValue({
      data: { value: [{ idContrato: 99, consecutivo: 'Z9' }] },
    });
    const result = await api.getConsecutivesByMonthYearPBA({ month: 0, year: 2024 });
    expect(axiosContract.get).toHaveBeenCalledWith('getconsecutivespbabydate?ContractDate=1-2024');
    expect(result).toEqual([{ value: 99, label: 'Z9' }]);
  });

  test('getParticipationByDate con date nulo debe usar fecha actual', async () => {
    const today = moment().format('DD-MM-YYYY');
    (axiosContract.get as jest.Mock).mockResolvedValue({
      data: [
        { clientName: 'Socio X', percentage: 20 },
        { clientName: 'Socio Y', percentage: 80 },
      ],
    });

    const result = await api.getParticipationByDate('123', '');
    expect(axiosContract.get).toHaveBeenCalledWith(
      `getParticipationByDate?Date=${today}&IdContract=123`
    );
    expect(result).toEqual([
      { NombreSocio: 'Socio X', PorcentajeParticipacion: 20 },
      { NombreSocio: 'Socio Y', PorcentajeParticipacion: 80 },
    ]);
  });

  test('getParticipationByDate debe retornar arreglo vacío si respuesta nula', async () => {
    (axiosContract.get as jest.Mock).mockResolvedValue({ data: null });
    const result = await api.getParticipationByDate('123', '01-01-2024');
    expect(result).toEqual({});
  });
});