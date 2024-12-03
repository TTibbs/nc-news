import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/articlesApi";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import NotFound from "./NotFound";

const TopicSlug = () => {
  const { slug } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsTopicsLoading(true);
    fetchArticlesByTopic(slug)
      .then((articles) => {
        setArticlesByTopic(articles);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsTopicsLoading(false);
      });
  }, [slug]);

  if (isTopicsLoading) {
    return <Loading isTopicsLoading={isTopicsLoading} />;
  }

  if (error) {
    return <NotFound status={error} />;
  }

  return (
    <section className="mt-20 p-10">
      <h2 className="text-textPrimary text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8">
        Articles related to {slug}
      </h2>
      <ul className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {articlesByTopic.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </section>
  );
};

export default TopicSlug;
