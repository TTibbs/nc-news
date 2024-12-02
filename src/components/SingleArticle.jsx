import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/articlesApi";
import { fetchArticleComments } from "../utils/commentsApi";
import Header from "./Header";
import Loading from "../components/Loading";
import CommentsList from "./CommentsList";
import CommentAdder from "./CommentAdder";
import Voting from "./Voting";
import NotFound from "./NotFound";
import { calculateReadingTime } from "../utils/readingTime";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    setIsArticleLoading(true);
    fetchArticleById(article_id)
      .then((data) => {
        setSingleArticle(data);
        setError(null);
        const readingTime = calculateReadingTime(data.body);
        setReadingTime(readingTime);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsArticleLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setIsCommentsLoading(true);
    fetchArticleComments(article_id)
      .then((commentsData) => {
        setArticleComments(commentsData);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [article_id]);

  if (isArticleLoading || isCommentsLoading) {
    return <Loading isArticleLoading={isArticleLoading} />;
  }

  if (error) {
    return <NotFound status={error} />;
  }

  return (
    <>
      <Header />
      <section className="text-zinc-100 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl mt-28 mb-5 mx-5 p-10">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-base md:text-lg lg:text-xl font-bold">
              {singleArticle.title}
            </h1>
            <div className="text-sm flex flex-col gap-1 md:text-base lg:text-lg mt-3">
              <p>Author: {singleArticle.author}</p>
              <p>Topic: {singleArticle.topic}</p>
              <p>
                Estimated Reading Time: {readingTime} minute
                {readingTime > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 mt-3 mb-5 w-full">
            <img
              src={singleArticle.article_img_url}
              alt={`Image related to article titled: ${singleArticle.title}`}
              className="w-[500px] rounded-lg shadow-lg shadow-zinc-600"
            />
            <div className="flex items-center justify-between px-8">
              <p className="w-[80%] text-sm md:text-base lg:text-lg">
                {singleArticle.body}
              </p>
              <div className="flex items-center gap-5 mb-4">
                <Voting article_id={article_id} votes={singleArticle.votes} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <CommentAdder setArticleComments={setArticleComments} />
        </div>
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
