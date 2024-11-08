import React from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const UpVoteButton = ({ handleArticleVotes, disabled }) => {
  return (
    <BiSolidUpvote
      onClick={() => !disabled && handleArticleVotes(1)}
      className={`text-xl md:text-2xl lg:text-3xl ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer text-textRed hover:text-redHover"
      }`}
    />
  );
};

export const DownVoteButton = ({ handleArticleVotes, disabled }) => {
  return (
    <BiSolidDownvote
      onClick={() => !disabled && handleArticleVotes(-1)}
      className={`text-xl md:text-2xl lg:text-3xl ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer text-textRed hover:text-redHover"
      }`}
    />
  );
};

export const DeleteButton = () => {
  <MdDelete />;
};
