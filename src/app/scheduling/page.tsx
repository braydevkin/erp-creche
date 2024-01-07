import React from "react";

import LoggedLayout from "@/layout/LoggedLayout";
import PickerDate from "@/components/PickerDate";

const Scheduling: React.FC = async () => {
  return (
    <LoggedLayout page="scheduling">
      <PickerDate />
    </LoggedLayout>
  );
};

export default Scheduling;
