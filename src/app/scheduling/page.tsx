import AuthButton from "@/components/AuthButton";
import { getCurrentUser } from "@/lib/session";

import React from "react";

const Scheduling: React.FC = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Bem vindo ao agendamento {user?.name}</h1>
      <AuthButton  page="scheduling"/>
    </div>
  );
};

export default Scheduling;
