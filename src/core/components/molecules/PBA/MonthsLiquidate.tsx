import moment from "moment";
import { MONTHS_WITH_IDS } from "@/core/utils";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { MonthsLiquidateProps } from "@/core/domain/InterfacesProps";

export const MonthsLiquidate: React.FC<MonthsLiquidateProps> = ({ MesesLiquidar, handleMonthToggle }) => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  const [years, setYears] = useState<number>(currentYear);
  const [months, setMonths] = useState<{ mes: string, numeroMes: number, valido: boolean }[]>(MONTHS_WITH_IDS);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const ChangeYear = (change: number) => {
    setYears(prevYear => {
      const newYear = prevYear + change;
      const newMeses = MesesLiquidar.find((item) => item.anio === newYear)?.meses || MONTHS_WITH_IDS;
      setMonths(newMeses);
      setSelectedMonths([]);
      return newYear;
    });
  };

  const MonthToggle = (numeroMes: number) => {    
    const key = `${numeroMes}-${years}`;
    handleMonthToggle(key);
    setSelectedMonths(prev =>
      prev.includes(key)
        ? prev.filter(m => m !== key)
        : [...prev, key]
    );
  };

  useEffect(() => {
    const selectedYear = MesesLiquidar.find((item) => item.anio === years);
    setYears(selectedYear?.anio || currentYear);
    setMonths(selectedYear?.meses || MONTHS_WITH_IDS);
    setSelectedMonths([]);
  }, [MesesLiquidar, years]);

  return (
    <Container className="p-3 rounded shadow-sm" style={{ maxWidth: 300, border: "1px solid #ddd" }}>
      <h4 className="text-center titulo-two m-3">Año y meses a liquidar</h4>
      <div className="text-center">
        {MesesLiquidar?.findIndex((item) => item.anio === years) > 0 && (
          <ChevronLeft size={20} className="me-2" onClick={() => ChangeYear(-1)} />
        )}
        {MesesLiquidar.length > 1 && (
          <span className="text-with-values fw-bold text-gray">{years - 1}</span>
        )}
        <span className="text-with-values fw-bold text-primary">{years}</span>
        {MesesLiquidar.findIndex((item) => item.anio === years) < MesesLiquidar.length - 1 && MesesLiquidar.findIndex((item) => item.anio === years) > -1 && (
          <ChevronRight size={20} className="ms-2" onClick={() => ChangeYear(1)} />
        )}
      </div>
      <Form>
        <Row className="mt-3">
          {months && Array.from({ length: 6 }, (_, i) => [months[i], months[i + 6]])?.map(([first, second], idx) => (
            <React.Fragment key={idx}>
              <Col xs={6}>
                <Form.Check
                  type="checkbox"
                  label={first.mes}
                  id={`month-${first.numeroMes}`}
                  disabled={!first.valido || (years === currentYear && first.numeroMes > currentMonth)}
                  checked={selectedMonths.includes(`${first.numeroMes}-${years}`)}
                  onChange={() => MonthToggle(first.numeroMes)}
                />
              </Col>
              <Col xs={6}>
                <Form.Check
                  type="checkbox"
                  label={second.mes}
                  id={`month-${second.numeroMes}`}
                  disabled={!second.valido || (years === currentYear && second.numeroMes > currentMonth)}
                  checked={selectedMonths.includes(`${second.numeroMes}-${years}`)}
                  onChange={() => MonthToggle(second.numeroMes)}
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Form>
    </Container>
  );
};
