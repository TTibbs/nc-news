import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-5">
        <Link to="/">
          <li className="p-2 rounded-xl hover:bg-blue-500">Home</li>
        </Link>
        <Link to="/articles">
          <li className="p-2 rounded-xl hover:bg-blue-500">Articles</li>
        </Link>
        <Link to="/">
          <li className="p-2 rounded-xl hover:bg-blue-500">Topics</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
