import React from "react";
import { Link } from "react-router-dom";
import VotesAndCommentCount from "./VotesAndCommentCount";

const ArticleCard = ({ article }) => {
  const createdAt = new Date(article.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  return (
    <li
      role="listitem"
      className="flex flex-col items-center justify-evenly gap-3 rounded-lg bg-zinc-800 shadow-lg shadow-redHover transition-all duration-200 ease-in-out text-zinc-200 p-10"
    >
      <h1 className="text-sm md:text-lg">{article.title}</h1>
      <img
        src={article.article_img_url}
        alt={`Image related to article titled: ${article.title}`}
        className="w-[300px] rounded-lg"
      />
      <div className="w-full flex flex-col gap-1 py-4 text-sm md:text-base">
        <p>Author: {article.author}</p>
        <p>Published on: {formattedDate}</p>
        <p>Topic: {article.topic}</p>
      </div>
      <div className="mx-auto">
        <VotesAndCommentCount
          votes={article.votes}
          commentCount={article.comment_count}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <Link
          to={`/articles/${article.article_id}`}
          article={article}
          className="mx-auto my-1"
          aria-label={`Read article titled: ${article.title}`}
        >
          <button className="outline outline-2 rounded-lg outline-redPrimary hover:outline-textLight hover:bg-redHover hover:text-zinc-100 transition-all duration-200 ease-linear py-1 px-3">
            Read
          </button>
        </Link>
        <p className="text-sm mt-1" aria-live="polite">
          Estimated read time: 4 minutes
        </p>
      </div>
    </li>
  );
};

export default ArticleCard;
