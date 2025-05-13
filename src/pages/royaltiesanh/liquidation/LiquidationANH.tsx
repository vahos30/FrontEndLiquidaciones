import { LoadingComponent } from '@/core/components/atoms';
import { MessageExitModal } from '@/core/components/atoms/MessageExitModal';
import { LiquidationActionButtons, LiquidationDataCardANH, LiquidationSelectAll, MessageAndExit } from '@/core/components/molecules';
import { MONTH_NAMES, defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_LIQUIDATION } from '@/core/utils';
import {  useButtonsDisabled } from '@/pages/liquidations/hooks';
import React, { useState } from 'react'
import { useRoyalitiesANHLiquidation } from './hooks';
import { RoyalitiesANHFilters } from '@/core/components/molecules/RoyalitiesANH/RoyalitiesANHFilters';
import { FiltersLiquidationANH } from '@/core/domain/Entities/FiltersLiquidationANH';
import { useValidationSearch } from './hooks/useValidationSearch';

export const LiquidationANH: React.FC = () => {
  const [modal, setModal] = useState<any>({
    show: false,
    onHide: () => { setModal({ ...modal, show: false }) },
    onCancel: () => { setModal({ ...modal, show: false }) },
    message: "",
    title: "",
    type: "success"
  });

  const { search, setSearch } = useValidationSearch();
  const { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation,LiquidateToLiquidation,UpdateLiquidation, loading, messageLiquidation,liquidationPrice,setLiquidationPrice } = useRoyalitiesANHLiquidation(search);
  const { disabledButtonLiquidate, disabledButtonExport, disabledReadyToSap } = useButtonsDisabled(liquidation);

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
        checked,
        estado,
        message,
        ...rest
      } = item;
      return {
        date: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth] + " - " + search.months?.year,
        ...rest
      };
    });

    ExcelClass.ExportExcel(cleanedData, 'Regalías ANH liquidación', HEADERS_EXPORT_EXCEL_ROYALITIES_ANH_LIQUIDATION);
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
          disabledLiquidate={disabledButtonLiquidate == false ? messageLiquidation != '' : disabledButtonLiquidate}
          disabledExport={disabledButtonExport}
          disabledReadyToSap={disabledReadyToSap}
        />
        <LiquidationSelectAll liquidations={liquidation} onChangeSelection={handleSelectOneOrAll}
          month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
          year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()} disabled={canLiquidate} />
      </header>
      <main>
        <LoadingComponent isLoading={loading} />
        {!loading &&
          <LiquidationDataCardANH canLiquidate={canLiquidate} liquidations={liquidation} onChangeSelection={handleSelectOneOrAll} onUpdateLiquidation={UpdateLiquidation} month={search?.months?.month.toString()} year={search?.months?.year.toString()} />
        }
      </main>
      <MessageAndExit errorMessage={error} successMessage={success} />
      <MessageExitModal
        show={!liquidationPrice}
        onHide={()=>setLiquidationPrice(!liquidationPrice)}
        onExit={()=>setLiquidationPrice(!liquidationPrice)}
        message={messageLiquidation}
        title={modal.title}
        textButtonConfirm="Aceptar"
      />
    </>
  )
}