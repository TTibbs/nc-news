import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Nav = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-3">
          <Link to="/">
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Home
            </li>
          </Link>
          <Link to="/articles">
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Articles
            </li>
          </Link>
          <Link to="/topics">
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Topics
            </li>
          </Link>
        </ul>
      </nav>
      <nav
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-full bg-zinc-900 p-6 transition-all duration-700 ease-linear z-50 md:hidden`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <IoMdClose className="text-3xl relative right-2 top-2" />
        </button>
        <ul className="flex flex-col items-center justify-center gap-4 mt-12">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Home
            </li>
          </Link>
          <Link to="/articles" onClick={() => setIsMenuOpen(false)}>
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Articles
            </li>
          </Link>
          <Link to="/topics" onClick={() => setIsMenuOpen(false)}>
            <li className="py-2 px-3 text-lg rounded-xl hover:bg-redHover transition-colors duration-250 ease-linear">
              Topics
            </li>
          </Link>
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
