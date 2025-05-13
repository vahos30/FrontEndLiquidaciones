import React from "react";
import { useLiquidationCarbonTax } from "./hooks";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { useButtonsDisabled, useValidationSearch } from "../liquidations/hooks";
import { defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL_CARBON, MONTH_NAMES } from "@/core/utils";
import { LiquidationActionButtons, LiquidationCarbonFilters, LiquidationCardCarbonTax, LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { LoadingComponent } from "@/core/components/atoms";

const CarbonTaxManager: React.FC = () => {

    const { search, setSearch } = useValidationSearch();
    const { liquidation, canLiquidate, error, rate, success, setLiquidation, getLiquidation, updateLiquidation, loading }
        = useLiquidationCarbonTax(search);
    const { disabledButtonLiquidate, disabledButtonExport } = useButtonsDisabled(liquidation);

    const handleSelectOneOrAll = (updatedLiquidations: any[]) => {
        setLiquidation(updatedLiquidations);
    }

    const handleChangeFilters = (updatedFilters: FiltersLiquidation) => {
        setSearch(updatedFilters);
    };

    const handleSubmit = () => {
        if (!search) return
        getLiquidation();
    }

    const handleExport = () => {
        const cleanedData = liquidation.map(item => {
            const {
                checked, idliquidation, idContrato, mensaje,
                ...rest
            } = item;

            return {
                ...rest,
                anio: search.months?.year,
                mes: MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]
            };
        });

        ExcelClass.ExportExcel(cleanedData, 'Liquidacion impuesto al carbono', HEADERS_EXPORT_EXCEL_CARBON);
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
            liquidationToUpdate.totalDeliveredMBTU = totalEntregado;
            setLiquidation([...liquidation]);
        }
    }

    return (
        <>
            <header>
                <LiquidationCarbonFilters onSubmit={handleSubmit} onChangeSelects={handleChangeFilters} isLoading={loading} />
                <LiquidationActionButtons onExport={handleExport} onAction={handleLiquidation} disabledExport={disabledButtonExport} disabledLiquidate={disabledButtonLiquidate} />
                <LiquidationSelectAll
                    liquidations={liquidation}
                    onChangeSelection={handleSelectOneOrAll}
                    month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
                    year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()}
                    disabled={canLiquidate}
                    showRate={rate}
                />
            </header>
            <main>
                <LoadingComponent isLoading={loading} />
                {!loading &&
                    <LiquidationCardCarbonTax liquidations={liquidation} onChangeSelection={handleSelectOneOrAll} canLiquidate={canLiquidate} onUpdateLiquidation={updateLiquidationById} month={search?.months?.month.toString()} year={search?.months?.year.toString()} />
                }
            </main>
            <MessageAndExit errorMessage={error} successMessage={success} />
        </>
    )
}

export default CarbonTaxManager;