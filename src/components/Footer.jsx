import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-20 py-5 px-4 md:px-14 bg-navBg flex items-center justify-between text-textPrimary">
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
          <Link
            to="https://github.com/TTibbs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-redHover py-2 px-3 rounded-lg"
          >
            GitHub
          </Link>
        </li>
        <li>
          <Link
            to="https://www.linkedin.com/in/terry-www/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-redHover py-2 px-3 rounded-lg"
          >
            LinkedIn
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
