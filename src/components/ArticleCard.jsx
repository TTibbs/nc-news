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
      </li>
    </>
  );
};

export default ArticleCard;
