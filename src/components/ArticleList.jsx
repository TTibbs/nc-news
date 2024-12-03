import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/articlesApi";
import Loading from "../components/Loading";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import ErrorPage from "./ErrorPage";

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
      <div className="flex items-center justify-center">
        <Filter
          setArticleList={setArticleList}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalArticles={totalArticles}
        />
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
