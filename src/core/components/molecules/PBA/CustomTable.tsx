import React, { useEffect, useState } from "react";
import { NoData } from "../NoData";
import { LoadingComponent, TextWithValues } from "../../atoms"
import { Pagination } from "../../organisms";
import { Container, Table } from "react-bootstrap"
import { ConsumoDiarioPBAProps } from "@/core/domain/Entities";
import { useDailyConsumption } from "@/pages/pba/hooks/useDailyConsumption";

export const CustomTable: React.FC<ConsumoDiarioPBAProps> = ({ searchFilters, onSubmit = false }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const { DataDailyConsumption, loading, getDailyConsumption } = useDailyConsumption(searchFilters, pageNumber, pageSize);

    useEffect(() => {
        if (onSubmit) getDailyConsumption();
    }, [onSubmit, pageNumber, pageSize]);

    const totalItems = DataDailyConsumption.Fechas?.totalCount || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (loading) return <LoadingComponent isLoading={loading} />;

    return (
        <Container className="scrollable-container">
            <TextWithValues title="Consumos diarios en" value={DataDailyConsumption?.FuenteSuministro} />
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <th className="min-width-120">Fecha</th>
                        {DataDailyConsumption?.Socios?.map((socio) => (
                            <React.Fragment key={`header-${socio.id}`}>
                                <th className="text-center">
                                    Energia <br />{socio.nombre}
                                </th>
                                <th className="text-center">
                                    Desbalance<br />{socio.nombre}
                                </th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {DataDailyConsumption?.Fechas?.items?.length === 0 ? (
                        <tr>
                            <td colSpan={1 + DataDailyConsumption?.Socios?.length * 2}>
                                <NoData />
                            </td>
                        </tr>
                    ) : (
                        DataDailyConsumption?.Fechas?.items?.map((fechaItem:any, indexData) => (
                            <tr key={`row-${indexData}`}>
                                <td className="text-center">{fechaItem.fecha}</td>
                                {DataDailyConsumption.Socios.map((socio) => {
                                    const registrosSocio: { id: number; energia?: number; desbalance?: number }[] = fechaItem.resultados.filter((r: { id: number }) => r.id === socio.id);
                                    const energiaTotal: number = registrosSocio.reduce((sum: number, r: { energia?: number }) => sum + (r.energia ?? 0), 0);
                                    const desbalanceTotal: number = registrosSocio.reduce((sum: number, r: { desbalance?: number }) => sum + (r.desbalance ?? 0), 0);

                                    return (
                                        <React.Fragment key={`data-${fechaItem.fecha}-${socio.id}`}>
                                            <td className="text-center">{energiaTotal}</td>
                                            <td className="text-center">{desbalanceTotal}</td>
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <Pagination
                totalItems={totalItems}
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(page) => setPageNumber(page)}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageNumber(1);
                }}
                onGoToPage={(page) => setPageNumber(page)}
            />
        </Container>
    );
}