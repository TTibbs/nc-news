import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/articlesApi";
import Loading from "../components/Loading";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isError, setIsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsArticlesLoading(true);
    fetchArticles()
      .then(({ data }) => {
        setArticleList(data.articles);
        setTotalArticles(data.total_count);
        setIsError(null);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsArticlesLoading(false);
      });
  }, []);

  const handleDelete = (article_id) => {
    setArticleList((prevArticles) =>
      prevArticles.filter((article) => article.article_id !== article_id)
    );
  };

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  return (
    <section
      aria-labelledby="articles-title"
      className="mx-5 mb-16 mt-20 p-3 md:p-6 lg:p-10 text-textPrimary"
    >
      {isError ? <ErrorPage err={isError} /> : null}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-3">
        <Link to="/post-article">
          <button className="py-1 px-4 md:px-6 text-sm md:text-base outline outline-2 outline-redPrimary bg-zinc-900 hover:bg-redHover hover:outline-textPrimary transition-all duration-300 ease-in-out text-textPrimary rounded">
            Post Article
          </button>
        </Link>
        <div className="flex-grow">
          <Filter
            setArticleList={setArticleList}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalArticles={totalArticles}
          />
        </div>
      </div>
      <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7">
        {articleList.map((article) => (
          <ArticleCard
            key={article.article_id}
            article={article}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default ArticleList;
