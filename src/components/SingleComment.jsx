import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { DownVoteButton, UpVoteButton } from "./Buttons";
import Loading from "./Loading";
import { deleteArticleComment, fetchArticleComments } from "../utils/api";

const SingleComment = ({ articleComment, setArticleComments }) => {
  const [isArticleLoading, setIsArticleLoading] = useState(false);
  const [username, setUsername] = useState("grumpy19");
  const { article_id } = useParams();
  const comment_id = articleComment.comment_id;
  const createdAt = new Date(articleComment.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;

  const handleCommentDelete = (comment_id) => {
    deleteArticleComment(comment_id)
      .then(() => {
        setIsArticleLoading(true);
        fetchArticleComments(article_id).then((data) => {
          setIsArticleLoading(false);
          setArticleComments(data);
        });
      })
      .catch((err) => console.log(err));
  };

  if (isArticleLoading) {
    return <Loading isArticleLoading={isArticleLoading} />;
  }

  return (
    <div className="border-2 border-zinc-200 rounded-lg mb-2">
      <li className="flex items-center justify-between">
        <div className="w-full bg-zinc-800 text-zinc-200 flex items-center justify-between p-5 rounded-xl">
          <div className="flex flex-col gap-1 w-full">
            <p className="font-medium mb-2">
              {formattedDate} by {articleComment.author}
            </p>
            <p className="w-[90%] rounded-lg py-2 px-4">
              {articleComment.body}
            </p>
            <div className="flex items-center justify-start gap-2 mt-3">
              <button
                hidden={username !== articleComment.author}
                onClick={() => handleCommentDelete(articleComment.comment_id)}
              >
                <div className="flex items-center font-bold gap-2 py-2 px-4 bg-red-500">
                  <MdDelete />
                </div>
              </button>
            </div>
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
