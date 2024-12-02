import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils/articlesApi";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import Footer from "./Footer";
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

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  return (
    <>
      <Header />
      <section
        aria-labelledby="articles-title"
        className="mx-5 mb-10 mt-20 p-3 md:p-6 lg:p-10 text-textPrimary"
      >
        {isError ? <ErrorPage err={err} /> : null}
        <div className="flex items-center justify-center">
          <Filter
            setArticleList={setArticleList}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalArticles={totalArticles}
          />
        </div>
        <h2
          id="articles-title"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5"
        >
          Articles
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7">
          {articleList.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-5">
            Got an article you want to post?
          </h1>
          <Link to="/postArticle">
            <button className="w-32 mx-auto text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Post Article
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticleList;
