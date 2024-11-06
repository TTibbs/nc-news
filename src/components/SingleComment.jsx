import React from "react";
import { DownVoteButton, UpVoteButton } from "./VoteButtons";

const SingleComment = ({ articleComment }) => {
  const createdAt = new Date(articleComment.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()} at ${createdAt.getHours()}:${createdAt.getMinutes()}`;

  return (
    <div className="border-b-2 border-zinc-300">
      <li className="flex items-center justify-between">
        <div className="w-full bg-zinc-800 text-zinc-200 flex items-center justify-between p-5 rounded-xl">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">
                {articleComment.author} - {formattedDate}
              </p>
            </div>
            <p className="w-[90%]">{articleComment.body}</p>
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
