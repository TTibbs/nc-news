import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="w-full fixed z-20 h-20 py-5 px-4 md:px-14 bg-navBg top-0 left-0 flex items-center justify-between text-textPrimary">
      <Link to="/" className="flex items-center justify-center gap-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">N(c)ews</h2>
        <img src="/ncnewslogo.png" alt="NC News Logo" className="w-12" />
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
