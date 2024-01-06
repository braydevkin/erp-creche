"use client";

import * as React from "react";

import { User } from "@prisma/client";

import AuthButton from "../AuthButton";

type HeaderProps = {
  page: string;
  user: Pick<User, "name" | "email"> | undefined;
};

const Header = ({ page, user }: HeaderProps) => {
  return (
    <nav className="w-full flex items-center justify-between px-4 bg-blue-500 shadow-lg py-2">
      <div>
        <h1 className="font-bold text-white">Logo</h1>
      </div>
      <div>
        <span className="text-white font-medium px-2">{user?.name ?? ""}</span>
        <AuthButton page={page} />
      </div>
    </nav>
  );
};

export default Header;
