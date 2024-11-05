import React from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const SingleComment = ({ articleComment }) => {
  return (
    <div className="border-b-2 border-zinc-300 px-5">
      <li className="py-2 px-4 mb-2 flex items-center justify-between">
        <div className="w-full bg-zinc-800 text-zinc-200 flex items-center justify-between p-5 rounded-xl">
          <div className="flex flex-col">
            <p className="mb-2">{articleComment.author}</p>
            <p className="w-[90%] mb-2">{articleComment.body}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-lg md:text-xl lg:text-2xl">
              <BiSolidUpvote className="text-red-600" />
            </p>
            <p>{articleComment.votes}</p>
            <p className="text-lg md:text-xl lg:text-2xl">
              <BiSolidDownvote className="text-red-600" />
            </p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default SingleComment;
