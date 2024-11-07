import React from "react";
import { Link } from "react-router-dom";
import VotesAndCommentCount from "./VotesAndCommentCount";

const ArticleCard = ({ article }) => {
  const createdAt = new Date(article.created_at);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  return (
    <>
      <li className="flex flex-col items-center justify-evenly gap-3 rounded-lg bg-zinc-800 shadow-lg shadow-redHover text-zinc-200 p-10">
        <p className="text-sm md:text-lg lg:text-xl p-2">
          {article.title}
        </p>
        <img
          src={article.article_img_url}
          alt="article image"
          className="w-[300px] rounded-lg"
        />
        <div className="flex flex-col gap-1 py-4">
          <p className="text-sm md:text-lg lg:text-xl">
            Author: {article.author}
          </p>
          <p className="text-sm md:text-lg lg:text-xl">Date: {formattedDate}</p>
          <p className="text-sm md:text-lg lg:text-xl">
            Topic: {article.topic}
          </p>
        </div>
        <VotesAndCommentCount
          votes={article.votes}
          commentCount={article.comment_count}
        />
        <div className="w-full flex flex-col gap-1">
          <Link
            to={`/articles/${article.article_id}`}
            article={article}
            className="w-20"
          >
            <button className="w-20 outline outline-2 rounded-lg outline-textRed hover:outline-textLight hover:bg-redHover hover:text-zinc-100 transition-all duration-200 ease-linear py-1 px-3">
              Read
            </button>
          </Link>
          <p className="text-sm">4min read time</p>
        </div>
      </li>
    </>
  );
};

export default ArticleCard;
