import { Link } from "react-router-dom";
import { Topic } from "@/types/api.types";

interface TopicCardProps {
  topic: Topic;
  onDelete: () => void;
  isDeletable: boolean;
}

const TopicCard = ({ topic, onDelete, isDeletable }: TopicCardProps) => {
  return (
    <li className="flex flex-col items-center justify-center gap-3 text-zinc-200 p-6 sm:p-8 md:p-10 rounded-lg transition-transform duration-300 hover:scale-105 relative overflow-hidden shadow-lg shadow-redHover group w-64 max-w-xs">
      <h1 className="text-base md:text-lg font-bold capitalize text-center">
        {topic.slug}
      </h1>
      <p className="text-sm md:text-base font-semibold text-center line-clamp-3">
        {topic.description}
      </p>
      <Link to={`/topics/${topic.slug}`} className="z-10">
        <button className="w-16 text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
          Go
        </button>
      </Link>
      {isDeletable && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default TopicCard;
