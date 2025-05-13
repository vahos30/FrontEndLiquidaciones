import React, { useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { LiquidationFilters } from "@/core/components/molecules";
import { LiquidationData } from "@/core/components/organisms/LiquidationDataCard";
import { defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL, MONTH_NAMES } from "@/core/utils";
import { useLiquidation, useValidationSearch, useButtonsDisabled } from "@/pages/liquidations/hooks";
import { LiquidationActionButtons, LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { MessageExitModal } from "@/core/components/atoms/MessageExitModal";
import { LoadingComponent } from "@/core/components/atoms";

export const Liquidation: React.FC = () => {
  const [modal, setModal] = useState<any>({
    show: false,
    onHide: () => { setModal({ ...modal, show: false }) },
    onCancel: () => { setModal({ ...modal, show: false }) },
    message: "",
    title: "",
    type: "success"
  });

  const { search, setSearch } = useValidationSearch();
  const { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation, updateLiquidation, sendToPrepareSap, loading } = useLiquidation(search);
  const { disabledButtonLiquidate, disabledButtonExport, disabledReadyToSap } = useButtonsDisabled(liquidation);
  const [ loadingSendToSap, setLoadingSendToSap ] = useState<boolean>(false);
  const handleChangeFilters = (updatedFilters: FiltersLiquidation) => {
    setSearch(updatedFilters);
  };

  const handleSubmit = () => {
    if (!search) return;
    getLiquidation();
  }

  const handleSelectOneOrAll = (updatedLiquidations: any[]) => {
    setLiquidation(updatedLiquidations);
  }

  const handleExport = () => {
    const cleanedData = liquidation.map(item => {
      const {
        idliquidation, puedeLiquidar, checked, idContrato, idTipoContrato, estado,isCarbonTax,fuenteSuministroId,idTypeLiquidation,
        ...rest
      } = item;

      return {
        ...rest,
        anio: search.months?.year,
        mes: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]
      };
    });

    ExcelClass.ExportExcel(cleanedData, 'Liquidaciones Suministro', HEADERS_EXPORT_EXCEL);
  };

  const handleLiquidation = () => {
    updateLiquidation(
      liquidation
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          month: (search?.months?.month ?? 0) + 1,
          year: search?.months?.year
        }))
    );
  }

  const updateLiquidationById = (id: string, totalEntregado: string) => {
    const liquidationToUpdate = liquidation.find(item => item.idliquidation == id);
    if (liquidationToUpdate) {
      liquidationToUpdate.entregado = totalEntregado;
      setLiquidation([...liquidation]);
    }
  }

  const handleReadyToSap = () => {
    const valids = liquidation.filter(p => p.checked && p.estado.toLowerCase() == "liquidado")
    if (valids.length == 0) {
      setModal({
        ...modal,
        show: true,
        type: "error",
        message: "No hay registros validos para la preparación de envio a sap, deben estar en estado Liquidado",
        title: "Error"
      })
      return;
    }
    const ids = valids.map(p => p.idliquidation);
    sendToPrepareSap(ids)
  }

  return (
    <>
      <header>
        <LiquidationFilters onSubmit={handleSubmit} onChangeSelects={handleChangeFilters} isLoading={loading} />
        <LiquidationActionButtons
          onExport={handleExport}
          onAction={handleLiquidation}
          disabledLiquidate={disabledButtonLiquidate}
          disabledExport={disabledButtonExport}
          disabledReadyToSap={disabledReadyToSap || loading}
          textReadyToSap={"Pendiente Envío SAP"}
          onActionReadyToSap={handleReadyToSap}
        />
        <LiquidationSelectAll liquidations={liquidation} onChangeSelection={handleSelectOneOrAll}
          month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]} showPPP={liquidation[0]?.ppp}
          year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()} disabled={canLiquidate} />
      </header>
      <main>
        <LoadingComponent isLoading={loading} />
        {!loading &&
          <LiquidationData canLiquidate={canLiquidate} liquidations={liquidation} onChangeSelection={handleSelectOneOrAll} onUpdateLiquidation={updateLiquidationById} month={search?.months?.month.toString()} year={search?.months?.year.toString()} />
        }
      </main>
      <MessageAndExit errorMessage={error} successMessage={success} />
      <MessageExitModal
        show={modal.show}
        onHide={modal.onHide}
        onExit={modal.onCancel}
        message={modal.message}
        title={modal.title}
        textButtonConfirm="Aceptar"
      />
    </>
  )
}
