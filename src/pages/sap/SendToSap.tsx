import React, { useEffect, useState } from "react";
import { LiquidationActionButtons, LiquidationFilters } from "@/core/components/molecules";
import { Line } from "@/core/components/atoms";
import { TableCustom } from "@/core/components/organisms/TableCustom";
import { Loading } from "@/core/components/molecules/Loading/Loading";
import { Pagination } from "@/core/components/organisms/Pagination";
import { SapApi } from "@/core/infrastructure/api/sapApi";
import { MessageExitModal } from "@/core/components/atoms/MessageExitModal";
import { useValidationSearch } from "../liquidations/hooks";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { ExcelClass, HEADERS_EXPORT_EXCEL_ORDERS_SAP, MONTH_NAMES } from "@/core/utils";
import { Alert } from "react-bootstrap";

export const SendToSap: React.FC = () => {

  const sapApi = new SapApi();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);

  const [selecteds, setSelecteds] = useState<string[]>([]);

  const [modal, setModal] = useState<any>({
    show: false,
    onHide: () => { setModal({ ...modal, show: false }) },
    onCancel: () => { setModal({ ...modal, show: false }) },
    message: "",
    title: "",
    type: "success"
  });
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [canSendToSap, setCanSendToSap] = useState<boolean>(true);
  const { search, setSearch } = useValidationSearch();

  const columns = [
    { header: "Número de contrato en SAP", key: "associatedContract" },
    { header: "Consecutivo de contrato", key: "consecutive" },
    { header: "Fuente de suministro", key: "sourceSupplyName" },
    { header: "Cliente", key: "clientName" },
    { header: "Moneda de liquidación", key: "currency" },
    { header: "TRM", key: "exchangeRate" },
    { header: "Cantidad", key: "quantity" },
    { header: "Precio", key: "rate" },
    { header: "Total Suministro", key: "totalSupply" },
    { header: "Número de pedido", key: "orderNumber" },
    { header: "Estado", key: "state", type: "STATE" }
  ];

  const getMonthDefault = () => {
    const today = new Date();
    return today.getMonth() === 0 ? 10 : today.getMonth() - 1;
  }

  const getYearDefault = () => {
    const today = new Date();
    return today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  }

  useEffect(() => {
    setSearch({...search, months: {
      month: getMonthDefault(), year: getYearDefault()
    }})
  }, [])

  useEffect(() => {
    fetchPendingsForSendToSap(
      currentPage,
      pageSize,
      false
    );    
  }, [currentPage, pageSize])

  //#region Obtener datos
  const fetchPendingsForSendToSap = async (
    page: number,
    rowsPerPage: number,
    loading: boolean = true
  ) => {
    try {
      setCanSendToSap(true)
      if(loading) setLoading(true);
      const result = await sapApi.getPendingForSendToSap({
        page: page,
        rowsPerPage: rowsPerPage,
        month: search.months?.month! + 1,
        year:  search.months?.year!,
        clients: search.clients.map((item) => parseInt(item.value)),
        supplys: search.supplys.map((item) => parseInt(item.value)),
        states: search.states.map((item) => item.value)
      });
      setLoading(false);
      setList(result.items);
      setTotalItems(result.totalCount);
      setTotalPages(result.totalPages);

      if (result.items.filter(p => p.state == "Procesando en SAP").length > 0) {
        setTimeout(async () => {
          await fetchPendingsForSendToSap(page, rowsPerPage, false)
        }, 3 * 1000);
      }

      setCanSendToSap(result.items.filter(p => !p.canSendToSap).length == 0)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProcess = async () => {
    try {
      setLoading(true);
      sapApi.processPendingsPost(selecteds);
      setList(list.map((item) => {
        if (selecteds.filter(id => id == item.id).length > 0) {
          item.state = "Procesando en SAP";
        }
        return item;
      }))
      setLoading(false);
      
      setModal({...modal, 
        show: true,
        type: "success",
        message: "Se inicio el proceso de envio de pedidos a sap exitosamente.",
        title: "Exitoso"
      });

      setTimeout(async () => {
        fetchPendingsForSendToSap(
          currentPage,
          pageSize,
          false 
        );
      }, 5 * 1000);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
      setModal({...modal, 
        show: true,
        type: "error",
        message: "Ocurrio un error al realizar la operación: " + error,
        title: "Error"
      })
    }
  };

  //#endregion Obtener datos

  const disabledLiquidate = (): boolean => {
    return selecteds.length == 0 || loading || 
    (selecteds.length > 0 && list.filter(p => selecteds.find(i => i == p.id) != null && p.state != "Pendiente envio SAP" && p.state != "Error envio a SAP").length > 0)
  }

  const handleSubmit = () => {
    if (!search) return;
    fetchPendingsForSendToSap(
      currentPage,
      pageSize
    );
  }

  const handleChangeFilters = (updatedFilters: FiltersLiquidation) => {
    setSearch(updatedFilters);
  };

  const handleExport = () => {
      const cleanedData = list.map(item => {
        const {
          id,
          idLiquidationType,
          nameLiquidationType,
          idLiquidation,
          errorMessage,
          orderDate,
          clientReferenceNumber,
          checked,
          canSendToSap,
          ...rest
        } = item;
        return {
          date: MONTH_NAMES[search?.months?.month ?? getMonthDefault()] + " - " + search.months?.year,
          ...rest
        };
      });
  
      ExcelClass.ExportExcel(cleanedData, 'Pedidos SAP', HEADERS_EXPORT_EXCEL_ORDERS_SAP);
    };

  return (
    <>
      <header>
        <LiquidationFilters 
        filtersShow={["month", "clients", "supplys", "states"]}
        onSubmit={handleSubmit} 
        onChangeSelects={handleChangeFilters} 
        isLoading={loading}
        monthsDefault={{ month: getMonthDefault(), year: getYearDefault() }} 
        />
        {!canSendToSap && 
          <Alert variant={"warning"}>
            El mes y año seleccionado estan bloqueados para envio a SAP
          </Alert>
        }
        <LiquidationActionButtons
          onExport={() => { handleExport() }}
          onAction={fetchProcess}
          disabledExport={ list.length == 0 }
          disabledLiquidate={disabledLiquidate()}
          textAction="Enviar a SAP"
        />

        <div className="table-container">
          {loading && <Loading isLoading={loading} />}
          {!loading && (
            <>
              <TableCustom
                columns={columns}
                list={list}
                multiSelected={true}
                selectedIds={selecteds}
                onSelecteds={setSelecteds}
                multiSelectedDisabled={!canSendToSap}
              />
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => setPageSize(size)}
                onGoToPage={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
        <Line />
      </header>

      <MessageExitModal
        show={modal.show}
        onHide={modal.onHide}
        onExit={modal.onCancel}
        message={modal.message}
        title={modal.title}
        textButtonConfirm = "Aceptar"
     />
    </>
  )
}
