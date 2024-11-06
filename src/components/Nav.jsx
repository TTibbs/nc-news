import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-3">
        <Link to="/">
          <li className="py-2 px-3 text-lg rounded-xl hover:bg-blue-500 transition-colors duration-250 ease-linear">
            Home
          </li>
        </Link>
        <Link to="/articles">
          <li className="py-2 px-3 text-lg rounded-xl hover:bg-blue-500 transition-colors duration-250 ease-linear">
            Articles
          </li>
        </Link>
        <Link to="/">
          <li className="py-2 px-3 text-lg rounded-xl hover:bg-blue-500 transition-colors duration-250 ease-linear">
            Topics
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
