import React from "react";
import { Link } from "react-router-dom";
import VotesAndCommentCount from "./VotesAndCommentCount";
import { capitaliseFirstLetter } from "../utils/utilFuncs";

const ArticleCard = ({ article }) => {
  const createdAt = new Date(article.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  return (
    <li
      role="listitem"
      className="h-[440px] lg:h-[600px] xl:h-[640px] flex flex-col items-center justify-around rounded-lg bg-zinc-800 shadow-lg shadow-redHover transition-all duration-200 ease-in-out text-zinc-200 p-3 md:p-5 lg:p-7"
    >
      <h1 className="overflow-hidden text-sm md:text-lg line-clamp-1">
        {article.title}
      </h1>
      <Link
        to={`/articles/${article.article_id}`}
        article={article}
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
          <p>Date: {formattedDate}</p>
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
          article={article}
          className="mx-auto mb-1"
          aria-label={`Read article titled: ${article.title}`}
        >
          <button className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
            Read
          </button>
        </Link>
      </div>
    </li>
  );
};

export default ArticleCard;
