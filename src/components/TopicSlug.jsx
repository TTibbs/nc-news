import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchArticlesByTopic } from "../utils/articlesApi";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import NotFound from "./NotFound";

const TopicSlug = () => {
  const { slug } = useParams();
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const username = user ? user.username : null;
  const navigate = useNavigate();

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

  if (isTopicsLoading) {
    return <Loading isTopicsLoading={isTopicsLoading} />;
  }

  if (error) {
    return <NotFound error={error} />;
  }

  return (
    <section className="mt-20 p-10">
      <button
        onClick={handlePostArticleClick}
        className="py-1 px-4 md:px-6 text-sm md:text-base outline outline-2 outline-redPrimary bg-zinc-900 hover:bg-redHover hover:outline-textPrimary transition-all duration-300 ease-in-out text-textPrimary rounded"
      >
        Post Article
      </button>
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
