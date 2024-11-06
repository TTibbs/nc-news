import React from "react";
import { DownVoteButton, UpVoteButton } from "./VoteButtons";

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
            <UpVoteButton />
            <p>{articleComment.votes}</p>
            <DownVoteButton />
          </div>
        </div>
      </li>
    </div>
  );
};

export default SingleComment;
