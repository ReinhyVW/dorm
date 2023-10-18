"use client"

import { useState } from "react";
import { format } from "date-fns";

export default function Datepicker({
  selectedDate,
  readOnly,
}: {
  selectedDate: string | null;
  readOnly: boolean;
}) {
  // Obtén la fecha actual en formato "yyyy-MM-dd"
  const today = format(new Date(), "yyyy-MM-dd");

  // Función para convertir la fecha al formato HTML de fecha
  function convertToHtmlDate(originalDate: string | null): string {
    if (originalDate === null) {
      return today; // Devuelve la fecha de hoy si selectedDate es nulo
    }

    try {
      return originalDate
    } catch (error) {
      console.error("Error converting date:", error);
    }

    return today;
  }

  // Estado local para la fecha
  const [date, setDate] = useState(convertToHtmlDate(selectedDate));

  // Manejador de cambio de fecha
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  // Renderizar el componente input de tipo fecha
  return (
    <input
      type="date"
      name="datepicker"
      id="datepicker"
      value={date}
      disabled={readOnly}
      onChange={handleDateChange}
      className="w-40 p-3 text-foreground-500 bg-default-100 border-default-300 border-1 rounded-lg"
    />
  );
}
