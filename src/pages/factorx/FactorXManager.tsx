import React from "react";
import { FactorXFilters, LiquidationActionButtons, LiquidationCardFactorX, LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { ExcelClass, HEADERS_EXPORT_EXCEL_FACTOR_X, MONTH_NAMES, defaultMonthAndYear } from '@/core/utils';
import { useFactorXLiquidation, useValidationSearch } from "./hooks";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";
import { useButtonsDisabled } from "../liquidations/hooks";
import { LoadingComponent } from "@/core/components/atoms";


const FactorXManager: React.FC = () => {
    const { search, setSearch } = useValidationSearch();
    const {factors,getLiquidation,setFactors,liquidateFactorX,error,success,loading} = useFactorXLiquidation(search);
    const {disabledButtonLiquidate,disabledButtonExport} = useButtonsDisabled(factors)
    const handleChangeFilters = (updatedFilters: FiltersLiquidationANH) => {
        setSearch(updatedFilters);
    };
    const searchFactors = () => {
        getLiquidation();
    }
    const handleSelectOneOrAll = (updatedFactors: any[]) => {
        setFactors(updatedFactors);
    }
    const handleExport = () => {
        const cleanedData = factors.map(item => {
          const {
            idliquidation,
            checked,
            IdFuenteSuministro,
            IdEstadoLiquidacion,
            MensajeError,
            ...rest
          } = item;
          return {
            date: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth] + " - " + search.months?.year,
            ...rest
          };
        });
    
        ExcelClass.ExportExcel(cleanedData, 'Factor X', HEADERS_EXPORT_EXCEL_FACTOR_X);
    };  
    return (
        <>
            <header>
                <FactorXFilters
                    onSubmit={searchFactors}
                    onChangeSelects={handleChangeFilters}
                    isLoading={false} 
                />
                <LiquidationActionButtons
                    onExport={handleExport}
                    onAction={()=>liquidateFactorX(factors.filter((liq) => liq.checked).map((liq) => liq.idliquidation))}
                    disabledLiquidate={disabledButtonLiquidate}
                    disabledExport={disabledButtonExport}
                    disabledReadyToSap={false}
                />
                <LiquidationSelectAll liquidations={factors} onChangeSelection={handleSelectOneOrAll}
                month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
                year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()} disabled={false} />
            </header>
            <main>
                <LoadingComponent isLoading={loading} />
                {
                    !loading &&
                    <LiquidationCardFactorX
                        liquidations={factors}
                        onChangeSelection={handleSelectOneOrAll}
                        canLiquidate={false}
                        onUpdateLiquidation={()=>{}}
                        month={search.months?.month?.toString() ?? defaultMonthAndYear().defaultMonth.toString()}
                        year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()}
                    />
                }
            </main>
            <MessageAndExit errorMessage={error} successMessage={success}/>
        </>
    )
}

export default FactorXManager;