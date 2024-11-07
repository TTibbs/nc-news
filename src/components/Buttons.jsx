import React from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const UpVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidUpvote
      onClick={() => handleArticleVotes(1)}
      className="cursor-pointer text-2xl md:text-3xl lg:text-4xl text-red-500"
    />
  );
};

export const DownVoteButton = ({ handleArticleVotes }) => {
  return (
    <BiSolidDownvote
      onClick={() => handleArticleVotes(-1)}
      className="cursor-pointer text-2xl md:text-3xl lg:text-4xl text-red-500"
    />
  );
};

export const DeleteButton = ({ handleCommentDelete }) => {
  <MdDelete className="cursor-pointer text-lg md:text-xl lg:text-2xl text-red-500" />;
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
