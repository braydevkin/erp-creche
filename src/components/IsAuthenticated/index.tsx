"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type IsAuthenticatedProps = {
  children: React.ReactNode;
};

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({
  children,
}: IsAuthenticatedProps) => {
  const router = useRouter();
  const { status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/signup") {
      router.push("/api/auth/signin");
    }
  }, [pathname, router, status]);

  return <section>{children}</section>;
};

export default IsAuthenticated;
