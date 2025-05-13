import { CustomTablaOBAProps, DetalleOBAProps } from "@/core/domain/Entities"
import { Container, Table } from "react-bootstrap"
import { HEADER_LIQUIDATIONS_OBA } from "@/core/utils"
import { Pagination } from "../../organisms"
import { useState } from "react"
import { NoData } from "../NoData"

export const CustomTableOBA: React.FC<CustomTablaOBAProps> = ({liquidationDetails}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = liquidationDetails?.length || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (!liquidationDetails) return <NoData />;
    return (
        <Container fluid className="table-responsive">
            <Table size="md">
                <thead>
                    <tr>
                        <th className="min-width-120">{HEADER_LIQUIDATIONS_OBA[7]}</th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[2]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[0]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[1]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[3]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[4]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[5]}
                        </th>
                        <th className="text-center">
                            {HEADER_LIQUIDATIONS_OBA[6]}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        liquidationDetails.map((item: DetalleOBAProps, index: number) => (
                            <tr key={`row-${index}`}>
                                <td className="text-center">{item.fecha}</td>
                                <td className="text-center">{item.consolidadoNominaciones}</td>
                                <td className="text-center">{item.entregaKPC}</td>
                                <td className="text-center">{item.poderCalorifico}</td>
                                <td className="text-center">{item.desbalanceDiarioMbtu}</td>
                                <td className="text-center">{item.desbalanceMensualMbtu}</td>
                                <td className="text-center">{item.desbalanceAcumuladoMbtu}</td>
                                <td className="text-center">{item.desbalanceUsd}</td>
                            </tr>
                        ))
                    }                
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
    )
}