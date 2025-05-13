import React from "react";
import { LoadingComponent } from "@/core/components/atoms";
import { useLiquidationOBA, useValidationSearch } from "./hooks";
import { LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { FiltersLiquidationOBA, LiquidationOBAProps } from "@/core/domain/Entities";
import { LiquidationDataCardOBA, LiquidationOBAFilters } from "@/core/components/molecules/OBA";
import { LiquidationOBAActionButtons } from "@/core/components/molecules/OBA/LiquidationOBAActionButtons";
import { defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL_LIQUIDATION_OBA, MONTH_NAMES } from "@/core/utils";

const OBAManager: React.FC = () => {
    const { search, setSearch } = useValidationSearch();
    const { liquidationsOBA, getLiquidation, loading, setLiquidationsOBA, error, makeCalculations, success } = useLiquidationOBA(search);

    const handleChangeFilters = (updatedFilters: FiltersLiquidationOBA) => {
        setSearch(updatedFilters);
    };
    const handleSelectOneOrAll = (updatedLiquidations: LiquidationOBAProps[]) => {
        setLiquidationsOBA(updatedLiquidations);
    }
    const handleExport = () => {
        const cleanedData = liquidationsOBA.map(item => {
            const {
                idliquidation,
                checked,
                idPuntoEntrega,
                mensajeError,
                puntoDeEntrega,
                acumuladoConsolidadoNominaciones,
                acumuladoEntregaKPC,
                acumuladoPoderCalorifico,
                acumuladoDesbalanceDiarioMbtu,
                acumuladoDesbalanceMensualMbtu,
                acumuladoDesbalanceAcumuladoMbtu,
                acumuladoDesbalanceUsd,
                ...rest
            } = item;
            return {
                date: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth] + " - " + search.months?.year,
                puntoDeEntrega: puntoDeEntrega,
                acumuladoConsolidadoNominaciones: acumuladoConsolidadoNominaciones,
                acumuladoEntregaKPC: acumuladoEntregaKPC,
                acumuladoPoderCalorifico: acumuladoPoderCalorifico,
                acumuladoDesbalanceDiarioMbtu: acumuladoDesbalanceDiarioMbtu,
                acumuladoDesbalanceMensualMbtu: acumuladoDesbalanceMensualMbtu,
                acumuladoDesbalanceAcumuladoMbtu: acumuladoDesbalanceAcumuladoMbtu,
                acumuladoDesbalanceUsd: acumuladoDesbalanceUsd,
                ...rest
            };
        });

        ExcelClass.ExportExcel(cleanedData, 'Liquidacion OBA', HEADERS_EXPORT_EXCEL_LIQUIDATION_OBA);
    };

    return (
        <>
            <header>
                <LiquidationOBAFilters onSubmit={getLiquidation} onChangeSelects={handleChangeFilters} isLoading={loading} />
                <LiquidationOBAActionButtons 
                    onExport={handleExport} 
                    onAction={makeCalculations} 
                    disabledExport={liquidationsOBA.length === 0} 
                    disabledLiquidate={liquidationsOBA.filter((liquidation) => liquidation.checked).map((liquidation) => liquidation.idPuntoEntrega).length === 0} 
                />
                <LiquidationSelectAll liquidations={liquidationsOBA} onChangeSelection={handleSelectOneOrAll}
                    month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
                    year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()} disabled={false} />
            </header>
            <main>
                <LoadingComponent isLoading={loading} />
                {!loading &&
                    <LiquidationDataCardOBA
                        canLiquidate={false}
                        liquidations={liquidationsOBA}
                        onChangeSelection={handleSelectOneOrAll}
                        search={search}
                        month={search?.months?.month.toString()}
                        year={search?.months?.year.toString()}
                    />
                }
            </main>
            <MessageAndExit errorMessage={error ?? ''} successMessage={success} />
        </>
    )
}

export default OBAManager;