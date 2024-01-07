"use client";

import React from "react";
import { Calendar } from "../ui/calendar";

const PickerDate: React.FC = () => {
  const [date, setDate] = React.useState<Date[] | undefined>([]);

  return (
    <Calendar
      mode="multiple"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};

export default PickerDate;
