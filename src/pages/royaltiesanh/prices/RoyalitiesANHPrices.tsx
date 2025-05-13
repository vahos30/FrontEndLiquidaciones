import React, { useState } from "react";
import { defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_PRICES, MONTH_NAMES } from "@/core/utils";
import { LiquidationActionButtons, LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { MessageExitModal } from "@/core/components/atoms/MessageExitModal";
import { LoadingComponent } from "@/core/components/atoms";
import { RoyalitiesANHFilters } from "@/core/components/molecules/RoyalitiesANH/RoyalitiesANHFilters";
import { useRoyalitiesANHPrices } from "@/pages/royaltiesanh/prices/hooks/useRoyalitiesANHPrices";
import { RoyalitiesANHDataCard } from "@/core/components/organisms/RoyalitiesANHPricesDataCard";
import { useValidationSearch } from "./hooks/useValidationSearch";
import { useButtonsDisabled } from "./hooks/useButtonsDisabled";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export const RoyalitiesANHPrices: React.FC = () => {
  const [modal, setModal] = useState<any>({
    show: false,
    onHide: () => { setModal({ ...modal, show: false }) },
    onCancel: () => { setModal({ ...modal, show: false }) },
    message: "",
    title: "",
    type: "success"
  });

  const { search, setSearch } = useValidationSearch();
  const { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation, loading, LiquidateToLiquidation } = useRoyalitiesANHPrices(search);
  const { disabledButtonLiquidate, disabledButtonExport } = useButtonsDisabled(liquidation);

  const handleChangeFilters = (updatedFilters: FiltersLiquidationANH) => {
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
        idLiquidation,
        detail,
        state,
        checked,
        ...rest
      } = item;
      return {
        date: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth] + " - " + search.months?.year,
        ...rest
      };
    });

    ExcelClass.ExportExcel(cleanedData, 'Regalías ANH', HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_PRICES);
  };

  return (
    <>
      <header>
        <RoyalitiesANHFilters
          onSubmit={handleSubmit}
          onChangeSelects={handleChangeFilters}
          isLoading={loading}
        />
        <LiquidationActionButtons
          onExport={handleExport}
          onAction={()=>LiquidateToLiquidation(liquidation.filter((liq) => liq.checked).map((liq) => liq.idliquidation))}
          disabledLiquidate={disabledButtonLiquidate}
          disabledExport={disabledButtonExport}
        />
        <LiquidationSelectAll liquidations={liquidation} onChangeSelection={handleSelectOneOrAll}
          month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
          year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()} disabled={canLiquidate} />
      </header>
      <main>
        <LoadingComponent isLoading={loading} />
        {!loading &&
          <RoyalitiesANHDataCard canLiquidate={canLiquidate} liquidations={liquidation} onChangeSelection={handleSelectOneOrAll} onUpdateLiquidation={() => { }} month={search?.months?.month.toString()} year={search?.months?.year.toString()} />
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
