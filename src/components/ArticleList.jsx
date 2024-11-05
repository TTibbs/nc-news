import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ArticleCard from "./ArticleCard";

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
      <section className="border-2 border-zinc-800 m-5 p-10">
        <p>Articles</p>
        <div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4">
            {articleList.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ArticleList;
