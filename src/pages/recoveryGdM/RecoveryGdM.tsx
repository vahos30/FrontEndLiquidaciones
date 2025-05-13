import React, { useState } from "react";
import { useRecoveryGdM } from "./hooks";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { useButtonsDisabled, useValidationSearch } from "../liquidations/hooks";
import { defaultMonthAndYear, ExcelClass, getMonthDefault, getYearDefault, HEADERS_EXPORT_EXCEL_GDM, MONTH_NAMES } from "@/core/utils";
import { LiquidationActionButtons, LiquidationFilters, LiquidationSelectAll, MessageAndExit } from "@/core/components/molecules";
import { LoadingComponent } from "@/core/components/atoms";
import { Form } from "react-bootstrap";
import { RecoveryGdMCard } from "@/core/components/molecules/RecoveryGdM/RecoveryGdMCard";

const RecoveryGdM: React.FC = () => {

    const { search, setSearch } = useValidationSearch();
    const { liquidation, error, success, setLiquidation, getLiquidation, getDataByExport, loading }
        = useRecoveryGdM(search);
    const { disabledButtonExport } = useButtonsDisabled(liquidation);
    const [repayment, setRepayment] = useState<string>();
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
        const dataExport: any[] = getDataByExport(search?.months?.month ?? getMonthDefault(), search.months?.year ?? getYearDefault())
        ExcelClass.ExportExcel(dataExport, 'Liquidacion recobro GdM', HEADERS_EXPORT_EXCEL_GDM);
    };

    return (
        <>
            <header>
                <LiquidationFilters 
                onSubmit={handleSubmit} 
                onChangeSelects={handleChangeFilters} 
                isLoading={loading}
                filtersShow={["month", "clients"]}
                monthsDefault={{ month: getMonthDefault(), year: getYearDefault() }} 
                />
                <LiquidationActionButtons 
                onExport={handleExport} 
                onAction={() => {}} 
                disabledExport={disabledButtonExport} 
                disabledLiquidate={repayment == null || repayment == ""} 
                />
                <LiquidationSelectAll
                    liquidations={liquidation}
                    onChangeSelection={handleSelectOneOrAll}
                    month={MONTH_NAMES[search?.months?.month ?? defaultMonthAndYear().defaultMonth]}
                    year={search.months?.year?.toString() ?? defaultMonthAndYear().defaultYear.toString()}
                    disabled={false}
                    showCheck={false}
                />
            </header>
            <main>
                <LoadingComponent isLoading={loading} />
                <Form.Group className="mb-3 w-25">
                    <Form.Label className="custom-label">
                        <span className="text-danger">*</span> Recobro Gestor del Mercado
                    </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Escriba aquí"
                        style={{ fontSize: '14px' }}
                        value={repayment}
                        isInvalid={!!error}
                        onChange={(e: React.ChangeEvent<any>) => setRepayment(e.target.value)
                        }
                    />
                </Form.Group>
                {!loading &&
                    <RecoveryGdMCard liquidations={liquidation} />
                }
            </main>
            <MessageAndExit errorMessage={error} successMessage={success} />
        </>
    )
}

export default RecoveryGdM;