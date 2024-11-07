import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  fetchArticleComments,
  deleteArticleComment,
} from "../utils/commentsApi";
import { DownVoteButton, UpVoteButton } from "./Buttons";

const SingleComment = ({ articleComment, setArticleComments }) => {
  const [username, setUsername] = useState("grumpy19");
  const { article_id } = useParams();
  const createdAt = new Date(articleComment.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;

  const handleCommentDelete = (comment_id) => {
    deleteArticleComment(comment_id)
      .then(() => {
        fetchArticleComments(article_id).then((data) => {
          setArticleComments(data);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-2 border-red-600 shadow-md shadow-red-700 rounded-lg mb-2">
      <li className="flex items-center justify-between">
        <div className="w-full bg-zinc-800 text-zinc-200 flex items-center justify-between p-5 rounded-xl">
          <div className="flex flex-col gap-1 w-full">
            <p className="font-medium text-sm md:text-base lg:text-lg mb-2">
              {formattedDate} by {articleComment.author}
            </p>
            <p className="w-[90%] text-sm md:text-base lg:text-lg rounded-lg py-2">
              {articleComment.body}
            </p>
            <div className="flex items-center justify-start gap-2 mt-3">
              <button
                hidden={username !== articleComment.author}
                onClick={() => handleCommentDelete(articleComment.comment_id)}
              >
                <div className="flex items-center font-bold gap-2 py-2 px-3 text-xs md:text-base rounded-xl bg-textRed hover:bg-redHover transition-colors duration-200 ease-linear">
                  <p>Delete</p>
                  <MdDelete />
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <UpVoteButton className="text-textRed hover:text-redHover" />
            <p>{articleComment.votes}</p>
            <DownVoteButton />
          </div>
        </div>
      </li>
    </div>
  );
};

export default SingleComment;
