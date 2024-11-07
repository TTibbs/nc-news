import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 left-0 py-5 px-4 md:px-20 bg-zinc-800 text-zinc-200">
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold">N(c)ews</p>
        <p className="max-w-[200px] md:max-w-[400px] text-sm md:text-base text-center">
          Created as part of a Digital Skills Bootcamp in Software Engineering
          provided by
          <Link
            to="https://northcoders.com/"
            className="ml-1 text-red-500 hover:text-red-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Northcoders
          </Link>
        </p>
        <nav>
          <ul className="flex items-center gap-4 text-sm md:text-base">
            <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-red-500">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/topics" className="hover:text-red-500">
                Topics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
