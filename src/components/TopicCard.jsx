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
      className="flex flex-col items-center justify-center gap-3 border-2 
                 bg-zinc-800/90 text-zinc-200 border-black p-10 w-64 h-48 
                 rounded-lg transition-transform hover:scale-105 relative 
                 overflow-hidden group"
      style={cardStyle}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
      <p className="relative z-10 text-xl font-bold capitalize">{topic.slug}</p>
      <p className="relative z-10 text-lg font-bold">{topic.description}</p>
      <Link to={`/topics/${topic.slug}`} className="z-10">
        <button className="w-20 outline outline-2 rounded-lg outline-zinc-200 hover:outline-zinc-200 hover:bg-blue-500 hover:text-zinc-200 transition-colors duration-250 ease-linear py-1 px-3">
          Go
        </button>
      </Link>
    </li>
  );
};

export default TopicCard;
