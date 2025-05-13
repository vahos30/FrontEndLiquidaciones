import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import InputMask from "react-input-mask";
import { Calendar } from "react-bootstrap-icons";
import { DateInputProps } from "@/core/domain/InterfacesProps";
import { Form } from "react-bootstrap";

export const DateInput = forwardRef(({
  label,
  value = "",
  onChange,
  onBlur,
  placeholder = "DD-MM-YYYY",
  minDate,
  minDateText = "La fecha no puede ser menor a",
  maxDate,
  maxDateText = "La fecha no puede ser mayor a",
  required = false,
  disabled = false,
  name = "",
  isInvalid = false
}: DateInputProps, ref) => {
  
  const [maskedValue, setMaskedValue] = useState<string>(value || "");
  const [error, setError] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    validate: () => validateDate(maskedValue),
  }));

  useEffect(() => {
    setMaskedValue(value || "");
  }, [value]);

  const validateDate = (inputDate: string) => {
    if (!inputDate || inputDate.toString().includes("_")) {
      const errorMessage = required ? "Este campo es requerido." : "";
      setError(errorMessage);
      return false;
    }

    if (!moment(inputDate, "DD-MM-YYYY", true).isValid()) {
      setError("Formato inválido. Usa DD-MM-YYYY.");
      return false;
    }

    const date = moment(inputDate, "DD-MM-YYYY");
    if (minDate && date.isBefore(moment(minDate, "DD-MM-YYYY"))) {
      setError(minDateText);
      return false;
    }

    if (maxDate && date.isAfter(moment(maxDate, "DD-MM-YYYY"))) {
      setError(maxDateText);
      return false;
    }

    setError("");
    return true;
  };

  const handleMaskedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaskedValue(e.target.value);
    const event = { target: { name, value: e.target.value } } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) onChange(event);
  };

  const handleMaskedInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateDate(maskedValue);
    if (onBlur) onBlur(e);
  };

  const handleNativeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setMaskedValue("");
      setError(required ? "Este campo es requerido." : "");
      const event = { target: { name, value: "" } } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) onChange(event);
      return;
    }

    const formattedValue = moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY");
    setMaskedValue(formattedValue);

    const event = { target: { name, value: formattedValue } } as React.ChangeEvent<HTMLInputElement>;

    if (validateDate(formattedValue) && onChange) {
      onChange(event);
    }
  };

  const handleNativeInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateDate(maskedValue);
    if (onBlur) onBlur(e);
  };

  return (
    <div>
      <Form.Label className="custom-label">
                {required && (<span className="text-danger">* </span>)}
                {label}
            </Form.Label>
      <div className="input-wrapper">
        <InputMask
          name={name}
          mask="99-99-9999"
          value={maskedValue?.split("T")[0]}
          onChange={handleMaskedInputChange}
          onBlur={handleMaskedInputBlur}
          placeholder={placeholder}
          className={`date-input-masked ${error || isInvalid ? "error" : ""}`}
          disabled={disabled}
          required={required}
        />
        <div className="calendar-icon-container">
          <Calendar className="calendar-icon" title="Seleccionar fecha" />
          <input
            ref={dateInputRef}
            type="date"
            name={name}
            value={value ? moment(value?.split("T")[0], "DD-MM-YYYY").format("YYYY-MM-DD") : ""}
            onChange={handleNativeInputChange}
            onBlur={handleNativeInputBlur}
            className={`date-input-native ${isInvalid ? "error" : ""}`}
            disabled={disabled}
          />
        </div>
      </div>
      {(error && isInvalid) && <p className="error-text">{error}</p>}
    </div>
  );
});