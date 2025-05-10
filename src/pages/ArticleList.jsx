import React, { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../api/articlesApi";
import { UserContext } from "../contexts/UserContext";
import ArticleCard from "../components/articles/ArticleCard";
import Filter from "../components/articles/Filter";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isError, setIsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(UserContext);
  const username = user ? user.username : null;
  const navigate = useNavigate();

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

  const handlePostArticleClick = (e) => {
    if (!username) {
      e.preventDefault();
      toast.error("Please log in to post an article.", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      navigate("/post-article");
    }
  };

  const handleDelete = (article_id) => {
    setArticleList((prevArticles) =>
      prevArticles.filter((article) => article.article_id !== article_id)
    );
  };

  if (isArticlesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="articles-title"
      className="mx-5 mb-16 mt-20 p-3 md:p-6 lg:p-10 text-textPrimary"
    >
      {isError ? <ErrorPage err={isError} /> : null}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-3">
        <button
          onClick={handlePostArticleClick}
          className="py-1 px-4 md:px-6 text-sm md:text-base outline outline-2 outline-redPrimary bg-zinc-900 hover:bg-redHover hover:outline-textPrimary transition-all duration-300 ease-in-out text-textPrimary rounded"
        >
          Post Article
        </button>
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
