"use client";

import * as React from "react";

import AuthButton from "../AuthButton";

type HeaderProps = {
  page: string;
};

const Header = ({ page }: HeaderProps) => {
  const [state, setState] = React.useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 bg-blue-500 shadow-lg">
      <div>
        <h1 className="font-bold text-white">Logo</h1>
      </div>
      <button
        className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
        onClick={() => setState(!state)}
      >
        <AuthButton page={page} />
      </button>
    </nav>
  );
};

export default Header;
