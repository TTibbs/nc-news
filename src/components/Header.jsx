import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full fixed z-20 h-20 py-5 px-4 md:px-14 bg-navBg top-0 left-0 flex items-center justify-between text-textPrimary">
      <Link to="/">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">N(c)ews</h2>
      </Link>
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <IoMenu className="text-2xl" />
      </button>
      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
