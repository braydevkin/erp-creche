"use client";

import { User } from "@prisma/client";
import { useSession, getSession } from "next-auth/react";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useMemo } from "react";

type IsAuthenticatedProps = {
  children: React.ReactNode;
};

const ADMIN_ROUTES = ["/students"];

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({
  children,
}: IsAuthenticatedProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { status, data } = useSession();

  const user = useMemo(() => {
    if (data?.user) return data?.user as User;
  }, [data?.user]);

  useEffect(() => {
    console.log(ADMIN_ROUTES.indexOf(pathname));
    if (ADMIN_ROUTES.indexOf(pathname) !== -1 && user && user.role !== "ADMIN") {
      router.back();
    }
    if (status === "unauthenticated" && pathname !== "/signup") {
      router.push("/api/auth/signin");
    }
  }, [pathname, user, router, status]);

  return children;
};

export default IsAuthenticated;
