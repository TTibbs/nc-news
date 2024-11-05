import React from "react";
import { Link } from "react-router-dom";
import VotesAndCommentCount from "./VotesAndCommentCount";

const ArticleCard = ({ article }) => {
  return (
    <>
      <li className="flex flex-col items-center justify-center gap-3 border-2 border-black p-10">
        <img
          src={article.article_img_url}
          alt="article image"
          className="w-[300px]"
        />
        <p>{article.title}</p>
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
            <button className="w-20 outline outline-2 rounded-lg outline-blue-600 hover:outline-zinc-900 hover:bg-blue-500 hover:text-zinc-200 transition-colors duration-250 ease-linear py-1 px-3">
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
