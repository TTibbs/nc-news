import React from "react";
import backgroundMapping from "../utils/backgroundMapping";
import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const cardStyle = {
    backgroundImage: backgroundMapping[topic.slug] || "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <li
      className="flex flex-col items-center justify-center gap-3 text-zinc-200 border-black p-6 sm:p-8 md:p-10 rounded-lg transition-transform duration-300 hover:scale-105 relative overflow-hidden shadow-lg group"
      style={cardStyle}
    >
      <h1 className="text-base md:text-lg font-bold capitalize">
        {topic.slug}
      </h1>
      <p className="text-sm md:text-base font-semibold text-center">
        {topic.description}
      </p>
      <Link to={`/topics/${topic.slug}`} className="z-10">
        <button className="w-24 outline outline-2 text-white rounded-lg bg-redPrimary outline-textLight hover:outline-zinc-200 hover:bg-redHover transition-all duration-200 ease-linear py-1 px-3">
          Go
        </button>
      </Link>
    </li>
  );
};

export default TopicCard;
