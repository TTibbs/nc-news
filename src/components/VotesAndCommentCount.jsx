import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { FaComments } from "react-icons/fa";

const VotesAndCommentCount = ({ votes, commentCount }) => {
  return (
    <div className="flex gap-5 w-full">
      <p className="flex items-center gap-2">
        <BiSolidUpvote className="text-2xl text-textRed" />
        {votes}
      </p>
      <p className="flex items-center gap-2">
        <FaComments className="text-2xl text-textRed" />
        {commentCount}
      </p>
    </div>
  );
};

export default VotesAndCommentCount;
