import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../utils/api";
import Header from "./Header";
import Loading from "../components/Loading";
import CommentsList from "./CommentsList";
import CommentAdder from "./CommentAdder";
import Voting from "./Voting";
import ErrorPage from "./ErrorPage";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((data) => {
        setIsError(null);
        setIsArticleLoading(false);
        setSingleArticle(data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(err);
      });
  }, [article_id]);

  useEffect(() => {
    fetchArticleComments(article_id)
      .then((commentsData) => {
        setIsError(null);
        setIsArticleLoading(false);
        setArticleComments(commentsData);
      })
      .catch((err) => {
        console.log(err);
        setIsError(err);
      });
  }, [article_id]);

  if (isArticleLoading) {
    return <Loading isArticleLoading={isArticleLoading} />;
  }

  return (
    <>
      <Header />
      <section className="bg-zinc-800 text-zinc-100 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl mt-28 mb-5 mx-5 p-10">
        <div className="flex flex-col">
          {isError ? <ErrorPage err={err} /> : null}
          <p className="text-sm md:text-base lg:text-lg font-bold">
            {singleArticle.title}
          </p>
          <div className="text-sm flex flex-col gap-1 md:text-base lg:text-lg mt-3">
            <p>Author: {singleArticle.author}</p>
            <p>Topic: {singleArticle.topic}</p>
          </div>
          <div className="flex flex-col items-center gap-10 mt-3 mb-5 w-full">
            <img
              src={singleArticle.article_img_url}
              alt={singleArticle.description}
            />
            <p className="text-sm md:text-base lg:text-lg">
              {singleArticle.body}
            </p>
          </div>
          <div className="flex items-center gap-5 mb-4">
            <Voting article_id={article_id} votes={singleArticle.votes} />
          </div>
        </div>
        <CommentAdder setArticleComments={setArticleComments} />
        <CommentsList
          articleComments={articleComments}
          setArticleComments={setArticleComments}
          setSingleArticle={setSingleArticle}
        />
      </section>
    </>
  );
};

export default SingleArticle;
