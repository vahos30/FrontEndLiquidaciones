import { NoData } from "../NoData"
import { Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { CustomAccordion } from "../../atoms"
import { CustomTableOBA } from "./CustomTableOBA"
import { MessageAndExit } from "../MessageAndExit"
import { useLiquidationObaDetail } from "@/pages/oba/hooks"
import { DetailOBAModalProps } from "@/core/domain/InterfacesProps"
import { ExcelClass, HEADERS_EXPORT_EXCEL_LIQUIDATION_DETALLE_OBA } from "@/core/utils"
import { MonthsLiquidateOBA } from "./MonthsLiquidateOBA"

export const DetailOBAModal: React.FC<DetailOBAModalProps> = ({ liquidation, handleExitModal, search }) => {
    const { liquidationOBADetail,desbalancesOBA, filterMothDesbalance, makeLiquidation } = useLiquidationObaDetail(search, liquidation.idPuntoEntrega, liquidation.idliquidation);
    const { error, getInfoLatestLiquidationResponse } = liquidationOBADetail;    
    const [selectedMonths, setSelectedMonths] = useState<{anio:number,meses:{mes:string,numeroMes:number,habilitado:boolean,marcado:boolean,puedeLiquidar:boolean}[]}[]>([]);
    const [puedeLiquidar, setPuedeLiquidar] = useState<boolean>(selectedMonths.some(anioData =>  anioData.meses.some(mes => mes.puedeLiquidar)));
    const handleMonthToggle = (anio: number,numeroMes:number) => {
        setSelectedMonths((prevSelectedMonths) => {
            const existingYear = prevSelectedMonths.find((item) => item.anio === anio);
            if (existingYear) {
                const updatedMeses = existingYear.meses.map((mes) => {
                    if (mes.numeroMes === numeroMes) {
                        return { ...mes, marcado: !mes.marcado };
                    }
                    return mes;
                });
                return prevSelectedMonths.map((item) =>
                    item.anio === anio ? { ...item, meses: updatedMeses } : item
                );
            } else {                
                return [
                    ...prevSelectedMonths                    
                ];
            }
        });
    };

    useEffect(() => {
        setSelectedMonths(getInfoLatestLiquidationResponse?.periodosLiquidar || []);
    }, [getInfoLatestLiquidationResponse]);

    useEffect(() => {
        const meses = selectedMonths
            .flatMap(anioData => 
                anioData.meses
                .filter(mes => mes.marcado) // Filtramos solo los meses marcados
                .map(mes => `${mes.numeroMes}-${anioData.anio}`) // Formateamos como "numeroMes-Año"
            );
        filterMothDesbalance(meses,10,1);
        setPuedeLiquidar(selectedMonths.some(anioData =>  anioData.meses.some(mes => mes.puedeLiquidar)));
    }, [selectedMonths]);
    

    const handleExport = () => {
        const cleanedData = desbalancesOBA?.items.map(item => {
            const {
                fecha,
                consolidadoNominaciones,
                entregaKPC,
                poderCalorifico,
                desbalanceDiarioMbtu,
                desbalanceMensualMbtu,
                desbalanceAcumuladoMbtu,
                desbalanceUsd,
                ...rest
            } = item;
            return {
                fecha: fecha,
                puntoDeEntrega: liquidation.puntoDeEntrega,
                consolidadoNominaciones: consolidadoNominaciones,
                entregaKPC: entregaKPC,
                poderCalorifico: poderCalorifico,
                desbalanceDiarioMbtu: desbalanceDiarioMbtu,
                desbalanceMensualMbtu: desbalanceMensualMbtu,
                desbalanceAcumuladoMbtu: desbalanceAcumuladoMbtu,
                desbalanceUsd: desbalanceUsd,
                ...rest
            };
        });

        ExcelClass.ExportExcel(cleanedData, 'Liquidacion Detalle OBA', HEADERS_EXPORT_EXCEL_LIQUIDATION_DETALLE_OBA);
    };

    if (!liquidationOBADetail.getInfoLatestLiquidationResponse) return <NoData />;

    return (
        <>
            <Row>
                <Col md={3} className="mb-2">
                    <MonthsLiquidateOBA MesesLiquidar={getInfoLatestLiquidationResponse?.periodosLiquidar} handleMonthToggle={handleMonthToggle} />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col>
                            <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Periodo acumulado</h1>}>
                                <span>{getInfoLatestLiquidationResponse?.periodoAcumulado}</span>
                            </CustomAccordion>
                        </Col>
                        <Col>
                            <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Último mes enviado a liquidar</h1>}>
                                <span>{getInfoLatestLiquidationResponse?.ultimoMesLiquidado}</span>
                            </CustomAccordion>
                        </Col>
                    </Row>
                    <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Desbalance mensual MBTU</h1>}>
                        <span>{liquidation.acumuladoDesbalanceMensualMbtu}</span>
                    </CustomAccordion>
                    <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Desbalance acumulado MBTU</h1>}>
                        <span>{liquidation.acumuladoDesbalanceAcumuladoMbtu}</span>
                    </CustomAccordion>
                    <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Desbalance USD</h1>}>
                        <span>{liquidation.acumuladoDesbalanceUsd}</span>
                    </CustomAccordion>
                </Col>
            </Row>
            <Row>
                <CustomTableOBA liquidationDetails={desbalancesOBA?.items} />
            </Row>
            <Row>
                <MessageAndExit 
                    errorMessage={error ?? ""} 
                    Onliquidate={makeLiquidation} 
                    successMessage={""} 
                    isOBA={true} 
                    disabledLiquidate={puedeLiquidar}
                    onDownload={handleExport} 
                    disabledExport={desbalancesOBA?.items?.length === 0} 
                    isPBA={true} 
                    exitDetailOba={handleExitModal} 
                />
            </Row>
        </>
    )
}