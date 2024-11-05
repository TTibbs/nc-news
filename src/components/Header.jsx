import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="w-full h-20 py-5 px-20 bg-zinc-800 top-0 left-0 flex items-center justify-between text-zinc-200">
      <Link to="/">
        <p className="text-2xl font-bold">N(c)ews</p>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
