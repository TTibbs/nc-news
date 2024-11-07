import React from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const UpVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidUpvote
      onClick={() => handleArticleVotes(1)}
      className="cursor-pointer text-xl md:text-2xl lg:text-3xl text-textRed hover:text-redHover"
    />
  );
};

export const DownVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidDownvote
      onClick={() => handleArticleVotes(-1)}
      className="cursor-pointer text-xl md:text-2xl lg:text-3xl text-textRed hover:text-redHover"
    />
  );
};

export const DeleteButton = () => {
  <MdDelete />;
};

export const CommentUpVoteButton = ({ handleCommentVotes }) => {
  return (
    <BiSolidDownvote
      onClick={() => handleCommentVotes(-1)}
      className="cursor-pointer text-lg md:text-xl lg:text-2xl text-blue-600"
    />
  );
};

export const CommentDownVoteButton = ({ handleCommentVotes }) => {
  return (
    <BiSolidDownvote
      onClick={() => handleCommentVotes(-1)}
      className="cursor-pointer text-lg md:text-xl lg:text-2xl text-blue-600"
    />
  );
};
