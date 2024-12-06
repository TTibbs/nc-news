import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../contexts/UserContext";

const Nav = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-3">
          <Link to="/">
            <li className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Home
            </li>
          </Link>
          <Link to="/articles?p=1">
            <li className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Articles
            </li>
          </Link>
          <Link to="/topics">
            <li className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Topics
            </li>
          </Link>
          {user ? (
            <div>
              <Link to="/auth">
                <button
                  onClick={handleLogout}
                  className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
                >
                  Log Out
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <button className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
                Log In
              </button>
            </Link>
          )}
        </ul>
      </nav>
      <nav
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-full bg-zinc-900 p-6 transition-all duration-500 ease-linear z-50 md:hidden`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <IoMdClose className="text-3xl relative right-2 top-2" />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">N(c)ews</h1>
        <ul className="h-full flex flex-col items-center justify-center gap-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <li className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Home
            </li>
          </Link>
          <Link to="/articles?p=1" onClick={() => setIsMenuOpen(false)}>
            <li className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Articles
            </li>
          </Link>
          <Link to="/topics" onClick={() => setIsMenuOpen(false)}>
            <li className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Topics
            </li>
          </Link>
          {user ? (
            <div>
              <Link to="/auth" onClick={handleLogout}>
                <button className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
                  Log Out
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
              <button className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
                Log In
              </button>
            </Link>
          )}
        </ul>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;
