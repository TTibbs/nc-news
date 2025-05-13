import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-5 px-4 md:px-14 bg-navBg flex items-center justify-between text-textPrimary">
      <Link to="/">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          N(c)ews
        </h2>
      </Link>
      <p className="max-w-[140px] md:max-w-[400px] text-xs md:text-sm lg:text-base text-center">
        Created as part of a Digital Skills Bootcamp in Software Engineering
        provided by
        <Link
          to="https://northcoders.com/"
          className="ml-1 underline decoration-redPrimary decoration-2 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Northcoders
        </Link>
      </p>
      <ul className="flex flex-col lg:flex-row items-center gap-3 text-sm md:text-base">
        <li>
          <Link
            to="https://github.com/TTibbs/be-nc-news"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
          >
            Backend
          </Link>
        </li>
        <li>
          <Link
            to="https://github.com/TTibbs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
          >
            GitHub
          </Link>
        </li>
        <li>
          <Link
            to="https://www.linkedin.com/in/terry-www/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
          >
            LinkedIn
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
