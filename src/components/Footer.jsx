import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 left-0 p-3 md:p-4 lg:p-5 md:px-20 bg-navBg text-textPrimary">
      <nav className="flex items-center justify-between gap-4">
        <Link to="/">
          <h2 className="text-lg font-semibold">N(c)ews</h2>
        </Link>
        <p className="max-w-[180px] md:max-w-[400px] text-xs md:text-sm text-center">
          Created as part of a Digital Skills Bootcamp in Software Engineering
          provided by
          <Link
            to="https://northcoders.com/"
            className="ml-1 text-redPrimary font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Northcoders
          </Link>
        </p>
        <ul className="flex flex-col lg:flex-row items-center gap-2 text-sm md:text-base">
          <li>
            <Link to="/" className="hover:bg-redHover py-2 px-3 rounded-lg">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className="hover:bg-redHover py-2 px-3 rounded-lg"
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to="/topics"
              className="hover:bg-redHover py-2 px-3 rounded-lg"
            >
              Topics
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
