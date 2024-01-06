import React from "react";
import Header from "@/components/Header";

import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";

type LoggedLayoutProps = {
  page: string;
  children: React.ReactNode;
};

const LoggedLayout: React.FC<LoggedLayoutProps> = async ({
  page,
  children,
}: LoggedLayoutProps) => {
  const user = await getCurrentUser();

  return (
    <main>
      <Header
        user={user as Pick<User, "name" | "email"> | undefined}
        page={page}
      />
      <div>{children}</div>
    </main>
  );
};

export default LoggedLayout;
