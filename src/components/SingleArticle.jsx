import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../utils/api";
import Header from "./Header";
import Loading from "../components/Loading";
import CommentsList from "./CommentsList";
import VotesAndCommentCount from "./VotesAndCommentCount";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((data) => {
        setIsArticleLoading(false);
        setSingleArticle(data);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  useEffect(() => {
    fetchArticleComments(article_id)
      .then((commentsData) => {
        setIsArticleLoading(false);
        setArticleComments(commentsData);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  if (isArticleLoading) {
    return <Loading isArticleLoading={isArticleLoading} />;
  }

  return (
    <>
      <Header />
      <section className="bg-zinc-800 text-zinc-100 rounded-tl-xl rounded-tr-xl mt-5 mx-5 p-10">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold">
              {singleArticle.title}
            </p>
            <div>
              <p className="text-2xl">Author: {singleArticle.author}</p>
              <p className="text-2xl">Topic: {singleArticle.topic}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 mb-3 lg:flex-row">
            <img src={singleArticle.article_img_url} alt="" />
            <div className="">
              <p className="text-lg md:text-xl lg:text-2xl">
                {singleArticle.body}
              </p>
            </div>
          </div>
          <VotesAndCommentCount
            votes={singleArticle.votes}
            commentCount={singleArticle.comment_count}
          />
        </div>
      </section>
      <CommentsList articleComments={articleComments} />
    </>
  );
};

export default SingleArticle;
