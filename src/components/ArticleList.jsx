import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ArticleCard from "./ArticleCard";
import Filter from "./Filter";
import Footer from "./Footer";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setIsArticlesLoading(false);
        setArticleList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  return (
    <>
      <Header />
      <section className="mx-5 mt-20 p-10">
        <div className="flex items-center justify-center">
          <Filter setArticleList={setArticleList} />
        </div>
        <p className="text-3xl font-bold text-center my-5">Articles</p>
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4">
            {articleList.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticleList;
