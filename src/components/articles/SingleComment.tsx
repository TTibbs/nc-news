import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { MdDelete } from "react-icons/md";
import {
  fetchArticleComments,
  deleteArticleComment,
} from "../../api/commentsApi";
import Voting from "./Voting";
import { formatDate } from "../../utils/utilFuncs";
import { Comment, Article } from "../../types/api.types";

interface SingleCommentProps {
  articleComment: Comment;
  setArticleComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setSingleArticle: React.Dispatch<React.SetStateAction<Article | null>>;
}

const SingleComment = ({
  articleComment,
  setArticleComments,
}: SingleCommentProps): JSX.Element => {
  const userContext = useContext(UserContext);
  const { article_id } = useParams<{ article_id: string }>();
  const username = userContext?.user?.username || null;

  const handleCommentDelete = (comment_id: number): void => {
    deleteArticleComment(comment_id)
      .then(() => {
        if (article_id) {
          fetchArticleComments(parseInt(article_id)).then((data) => {
            setArticleComments(data);
            // deleteCommentToast(); // If you have a toast, you can add it here
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-2 border-red-600 shadow-md shadow-red-700 rounded-lg mb-2">
      <li className="flex items-center justify-between">
        <div className="w-full bg-zinc-800 text-zinc-200 flex items-center justify-between p-5 rounded-xl">
          <div className="flex flex-col gap-1 w-full">
            <p className="font-medium text-sm md:text-base lg:text-lg mb-2">
              {formatDate(articleComment.created_at)} by {articleComment.author}
            </p>
            <p className="w-[90%] text-sm md:text-base lg:text-lg rounded-lg py-2">
              {articleComment.body}
            </p>
            <div className="flex items-center justify-start gap-2 mt-3">
              <button
                hidden={username !== articleComment.author}
                onClick={() => handleCommentDelete(articleComment.comment_id)}
              >
                <div className="flex items-center font-bold gap-2 py-2 px-3 text-xs md:text-base rounded-xl text-white bg-redPrimary hover:bg-redHover transition-colors duration-200 ease-linear">
                  <p>Delete</p>
                  <MdDelete />
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Voting
              votes={articleComment.votes}
              comment_id={articleComment.comment_id}
            />
          </div>
        </div>
      </li>
    </div>
  );
};

export default SingleComment;
