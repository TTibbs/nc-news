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
      className="flex flex-col items-center justify-center gap-3 text-zinc-200 border-black p-10 sm:w-44 md:w-52 h-56 rounded-lg transition-transform duration-300 hover:scale-105 relative overflow-hidden shadow-lg shadow-redHover group"
      style={cardStyle}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
      <p className="relative z-10 text-xl font-bold capitalize">Topic: {topic.slug}</p>
      <p className="relative z-10 text-lg font-bold">{topic.description}</p>
      <Link to={`/topics/${topic.slug}`} className="z-10">
        <button className="w-20 outline outline-2 rounded-lg bg-textRed outline-textLight hover:outline-zinc-200 hover:bg-redHover transition-all duration-200 ease-linear py-1 px-3">
          Go
        </button>
      </Link>
    </li>
  );
};

export default TopicCard;
