import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import VotesAndCommentCount from "./VotesAndCommentCount";
import { capitaliseFirstLetter } from "../../utils/utilFuncs";
import { MdDelete } from "react-icons/md";
import { deleteArticle } from "../../api/articlesApi";
import { formatDate } from "../../utils/utilFuncs";

const ArticleCard = ({ article, onDelete }) => {
  const { user } = useContext(UserContext);
  const username = user ? user.username : null;
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(null);

  const showToast = (message, type = "success") => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      type,
    });
  };

  const handleArticleDelete = (article_id) => {
    setIsDeleting(true);
    deleteArticle(article_id)
      .then(() => {
        onDelete(article_id);
        setShowModal(false);
        showToast("Article deleted successfully.", "success");
      })
      .catch((err) => {
        setIsError(err);
        showToast("Failed to delete the article. Please try again.", "error");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <>
      <li
        role="listitem"
        className="h-[440px] lg:h-[600px] xl:h-[640px] flex flex-col items-center justify-around rounded-lg bg-zinc-800 shadow-lg shadow-redHover transition-all duration-200 ease-in-out text-zinc-200 p-3 md:p-5 lg:p-7"
      >
        <h1 className="overflow-hidden text-sm md:text-lg line-clamp-1">
          {article.title}
        </h1>
        <Link
          to={`/articles/${article.article_id}`}
          className="mx-auto my-1"
          aria-label={`Read article titled: ${article.title}`}
        >
          <img
            src={article.article_img_url}
            alt={`Image related to article titled: ${article.title}`}
            className="w-[300px] rounded-lg shadow-lg shadow-zinc-600"
          />
        </Link>
        <div className="w-full flex items-center gap-3 p-1 md:p-2 lg:p-3">
          <div className="w-3/4 flex flex-col text-xs md:text-sm">
            <p>Author: {article.author}</p>
            <p>Date: {formatDate(article.created_at)}</p>
            <p>Topic: {capitaliseFirstLetter(article.topic)}</p>
          </div>
          <div className="w-1/4">
            <VotesAndCommentCount
              votes={article.votes}
              commentCount={article.comment_count}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 text-center">
          <Link
            to={`/articles/${article.article_id}`}
            className="mx-auto mb-1"
            aria-label={`Read article titled: ${article.title}`}
          >
            <button className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Read
            </button>
          </Link>
          <button
            hidden={username !== article.author}
            onClick={() => setShowModal(true)}
          >
            <div className="w-20 md:w-24 mx-auto flex items-center font-bold gap-2 py-2 px-3 text-xs md:text-base rounded-xl text-white bg-redPrimary hover:bg-redHover transition-colors duration-200 ease-linear">
              <p>Delete</p>
              <MdDelete />
              {isError && (
                <p>
                  {isError.msg} | {isError.status}
                </p>
              )}
            </div>
          </button>
        </div>
      </li>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-800 shadow-xl shadow-redPrimary rounded-lg p-5 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this article?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
              >
                Cancel
              </button>
              <button
                onClick={() => handleArticleDelete(article.article_id)}
                className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleCard;
