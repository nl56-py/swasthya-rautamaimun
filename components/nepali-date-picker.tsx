"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@munatech/nepali-datepicker/styles.css";

// Dynamic import to prevent SSR issues (document/window undefined)
const Picker = dynamic(
  () => import("@munatech/nepali-datepicker").then((mod) => mod.Picker),
  { ssr: false }
);

interface DateObject {
  year: number;
  month: number;
  day: number;
}

export function NepaliDatePicker({
  name,
  placeholder,
  required,
  onChange
}: {
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (bsDateStr: string | null) => void;
}) {
  const [date, setDate] = useState<DateObject | undefined>();

  const handleChange = (selectedDate: DateObject | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Pad month and day to YYYY-MM-DD
      // Note: selectedDate.month is typically 0-indexed in standard JS-style dates, 
      // but let's make sure it corresponds to the correct month.
      // In @munatech/nepali-datepicker, the month index starts from 0 (Baishakh = 0, Jestha = 1).
      // We format it as 1-indexed string e.g. "2083-01-15" for Baishakh 15.
      const mm = String(selectedDate.month + 1).padStart(2, "0");
      const dd = String(selectedDate.day).padStart(2, "0");
      const dateStr = `${selectedDate.year}-${mm}-${dd}`;
      if (onChange) onChange(dateStr);
    } else {
      if (onChange) onChange(null);
    }
  };

  const valueStr = date
    ? `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
    : "";

  return (
    <div className="w-full">
      <Picker
        value={date}
        onChange={handleChange}
        placeholder={placeholder}
        className="admin-input w-full"
      />
      <input type="hidden" name={name} value={valueStr} required={required} />
    </div>
  );
}
