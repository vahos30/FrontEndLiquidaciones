import { useValidationSearch } from "./hooks";
import React, { useEffect, useState } from "react";
import { MessageAndExit, NoData } from "@/core/components/molecules";
import { useLiquidationPBA } from "./hooks/useLiquidationPBA";
import { FiltersLiquidationPBA } from "@/core/domain/Entities";
import { CustomTable, LiquidationPBAActionButtons, LiquidationPBAFilters, ParticipationAgreement, PeriodsAndTotals } from "@/core/components/molecules/PBA";

const PBAManager: React.FC = () => {
  const { search, setSearch } = useValidationSearch();
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const { getMainCalculations, getInfoLatestLiquidation, makeLiquidation, makeCalculations, success, exportPBA,
    DataMainCalculations, PeriodoAcumulado, UltimoMesLiquidado, MesesLiquidar, error, onSubmit, setOnSubmit } = useLiquidationPBA(search, selectedMonths);

  const submitSearch = () => {
    setOnSubmit(!onSubmit); // pdte. fix. only in false
    getMainCalculations();
    getInfoLatestLiquidation();
  }
  const handleChangeFilters = (updatedFilters: FiltersLiquidationPBA) => {
    if (updatedFilters.consecutives.length > 1)
      updatedFilters.consecutives.shift();
    setSearch(updatedFilters);
  }
  const handleMonthToggle = (key: string) => {
    setSelectedMonths(prev =>
      prev.includes(key)
        ? prev.filter(m => m !== key)
        : [...prev, key]
    );
  };

  useEffect(() => {
    if (selectedMonths.length > 0)
      getMainCalculations(selectedMonths);

  }, [selectedMonths]);

  return (
    <>
      <header>
        <LiquidationPBAFilters onSubmit={submitSearch} onChangeSelects={handleChangeFilters} isLoading={false} />
        <LiquidationPBAActionButtons
          onExport={() => exportPBA()}
          onAction={() => makeCalculations()}
          disabledExport={false}
          disabledLiquidate={search.consecutives.length === 0}
        />
      </header>
      <main>
        {(DataMainCalculations?.nominationConfirmedPartner?.length === 0 || search.consecutives.length === 0) ? (<NoData />) : (
          <>
            <PeriodsAndTotals DataMainCalculations={DataMainCalculations} PeriodoAcumulado={PeriodoAcumulado} handleMonthToggle={handleMonthToggle}
              UltimoMesLiquidado={UltimoMesLiquidado} MesesLiquidar={MesesLiquidar} />
            <ParticipationAgreement searchFilters={search} onSubmit={onSubmit} />
            <CustomTable searchFilters={search} onSubmit={onSubmit} />
          </>
        )}
      </main>
      <MessageAndExit errorMessage={error} successMessage={success} isPBA disabledLiquidate={search.consecutives.length === 0} Onliquidate={() => makeLiquidation()} />
    </>
  );
}

export default PBAManager;