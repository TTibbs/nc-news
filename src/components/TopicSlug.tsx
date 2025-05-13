import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchArticlesByTopic } from "../api/articlesApi";
import ArticleCard from "./articles/ArticleCard";
import NotFound from "../pages/NotFound";
import { Article } from "../types/api.types";
import { toast } from "react-toastify";

const TopicSlug = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [articlesByTopic, setArticlesByTopic] = useState<Article[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

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

  const handlePostArticleClick = (e: React.MouseEvent): void => {
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
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
