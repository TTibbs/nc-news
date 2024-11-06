import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import Header from "./Header";

const TopicSlug = () => {
  const { slug } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);

  useEffect(() => {
    fetchArticlesByTopic(slug)
      .then((articles) => {
        setArticlesByTopic(articles);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <>
      <Header />
      <div className="my-5">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-5">
          Articles related to {slug}
        </p>
        <ul className="px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4">
          {articlesByTopic.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopicSlug;
