import React from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

export const UpVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidUpvote
      onClick={() => handleArticleVotes(1)}
      className="cursor-pointer text-lg md:text-xl lg:text-2xl text-blue-600"
    />
  );
};

export const DownVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidDownvote
      onClick={() => handleArticleVotes(-1)}
      className="cursor-pointer text-lg md:text-xl lg:text-2xl text-blue-600"
    />
  );
};
