import React from "react";
import { SvgCalendar } from "./svgIcons";
import { MONTH_NAMES } from "@/core/utils";
import { MonthYearPickerProps } from "@/core/domain/InterfacesProps";
import { Dropdown, FormControl, ButtonGroup, Button, Form } from "react-bootstrap";

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ onChange, label, value }) => {

  const currentYear = new Date().getFullYear();
  const { month, year } = value;

  const handleMonthChange = (newMonth: number) => {
    onChange(newMonth, year);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    if (!isNaN(newYear) && newYear >= 1900 && newYear <= currentYear) {
      onChange(month, newYear);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="custom-label d-block">
        <span className="text-danger">* </span>
        {label || "Mes"}
      </Form.Label>
      <Dropdown as={ButtonGroup} container="body" className="custom-dropdown">
        <Button variant="light" className="custom-dropdown-button">
          <span className="text-truncate flex-grow-1 text-start ms-2">{MONTH_NAMES[month]} {year}</span>
          <SvgCalendar />
        </Button>
        <Dropdown.Toggle split variant="light" id="dropdown-split-basic" className="custom-dropdown-toggle">
          <span className="custom-dropdown-separator" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-3 shadow" align="end">
          <FormControl type="number" value={year} onChange={handleYearChange} className="mb-2 text-center" placeholder="Año" min={1900} max={currentYear} />
          <div className="d-flex flex-column">
            {MONTH_NAMES.map((name, index) => (
              <Button key={index} variant={index === month ? "primary" : "light"} className="mb-1 text-start" onClick={() => handleMonthChange(index)}>
                {name}
              </Button>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};
