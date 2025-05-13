import { LoadingComponent } from "@/core/components/atoms";
import { LiquidationActionButtons, MessageAndExit } from "@/core/components/molecules";
import { HigheringcomeFilters, LiquidationCardHighering } from "@/core/components/molecules/Higheringcome";
import { useButtonsDisabled, useValidationSearch } from "../liquidations/hooks";
import { useLiquidationHigheringcome } from "./hooks";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { defaultMonthAndYear, ExcelClass, HEADERS_EXPORT_EXCEL_CARBON, MONTH_NAMES } from "@/core/utils";

const Higheringcome: React.FC = () => {
    const { search, setSearch } = useValidationSearch();
    const { liquidation, canLiquidate, error, success, getLiquidation, updateLiquidation, loading } = useLiquidationHigheringcome(search);
    const { disabledButtonExport } = useButtonsDisabled(liquidation);

    const handleSubmit = () => {
        if (!search) return
        getLiquidation();
    }

    const handleChangeFilters = (updatedFilters: FiltersLiquidation) => {
        setSearch(updatedFilters);
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
    }

    const handleLiquidation = () => {
        updateLiquidation(liquidation.map(item => ({
            ...item,
            month: (search?.months?.month ?? 0) + 1,
            year: search?.months?.year
        })));
    }

    return (
        <>
            <header>
                <HigheringcomeFilters onSubmit={handleSubmit} onChangeSelects={handleChangeFilters} isLoading={loading} />
                <LiquidationActionButtons onExport={handleExport} onAction={handleLiquidation} disabledExport={disabledButtonExport} disabledLiquidate={!!canLiquidate} />
            </header>
            <main>
                <LoadingComponent isLoading={false} />
                {!loading && <LiquidationCardHighering liquidations={liquidation} onChangeSelection={() => { }} />}
            </main>
            <MessageAndExit errorMessage={error} successMessage={success} />
        </>
    )
}

export default Higheringcome;