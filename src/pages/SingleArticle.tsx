import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "@/api/articlesApi";
import { fetchArticleComments } from "@/api/commentsApi";
import CommentsList from "@/components/articles/CommentsList";
import CommentAdder from "@/components/articles/CommentAdder";
import Voting from "@/components/articles/Voting";
import ErrorPage from "@/pages/ErrorPage";
import { calculateReadingTime } from "@/utils/utilFuncs";
import { Article, Comment } from "@/types/api.types";
import NotFound from "@/pages/NotFound";

const SingleArticle = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [singleArticle, setSingleArticle] = useState<Article | null>(null);
  const [articleComments, setArticleComments] = useState<Comment[]>([]);
  const [isArticleLoading, setIsArticleLoading] = useState<boolean>(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    if (!article_id) return;

    setIsArticleLoading(true);
    fetchArticleById(parseInt(article_id))
      .then((data) => {
        setSingleArticle(data);
        setError(null);
        const readingTime = calculateReadingTime(data.body || "");
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
    if (!article_id) return;

    setIsCommentsLoading(true);
    fetchArticleComments(parseInt(article_id))
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!singleArticle) {
    return <NotFound />;
  }

  return (
    <section className="text-zinc-100 mt-24 mb-5 mx-5">
      <div className="flex flex-col">
        <div className="text-sm flex flex-col gap-1 md:text-base lg:text-lg mt-3">
          <h1 className="text-base md:text-lg lg:text-xl font-bold">
            {singleArticle.title}
          </h1>
          <p>Author: {singleArticle.author}</p>
          <p>Topic: {singleArticle.topic}</p>
          <p>
            Est. Read Time: {readingTime} minute
            {readingTime > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-col items-center gap-10 mt-3 mb-5 w-full">
          <img
            src={singleArticle.article_img_url}
            alt={`Image related to article titled: ${singleArticle.title}`}
            className="w-[500px] rounded-lg shadow-lg shadow-zinc-600"
          />
          <div className="flex flex-col items-center justify-between">
            <p
              className="text-sm md:text-base lg:text-lg break-words"
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {singleArticle.body}
            </p>
            <div className="flex items-center gap-5 mt-5">
              <Voting
                votes={singleArticle.votes}
                article_id={parseInt(article_id!)}
              />
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
  );
};

export default SingleArticle;
