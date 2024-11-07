import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsArticlesLoading(true);
    fetchArticles()
      .then((articles) => {
        setArticleList(articles);
        setIsError(null);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsArticlesLoading(false);
      });
  }, []);

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  return (
    <>
      <Header />
      <section aria-labelledby="articles-title" className="mx-5 mt-20 p-10">
        {isError ? <ErrorPage err={err} /> : null}
        <div className="flex items-center justify-center">
          <Filter setArticleList={setArticleList} />
        </div>
        <p
          id="articles-title"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5"
        >
          Articles
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {articleList.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default ArticleList;
