import React from "react";
import Header from "@/components/Header";

type LoggedLayoutProps = {
  page: string;
  children: React.ReactNode;
};

const LoggedLayout: React.FC<LoggedLayoutProps> = ({
  page,
  children,
}: LoggedLayoutProps) => {
  return (
    <main>
      <Header page={page} />
      <div>{children}</div>
    </main>
  );
};

export default LoggedLayout;
