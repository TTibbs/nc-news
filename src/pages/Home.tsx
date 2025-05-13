import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { fetchArticles } from "@/api/articlesApi";
import { fetchTopics } from "@/api/topicsApi";
import { formatDate } from "@/utils/utilFuncs";
import { Article, Topic } from "@/types/api.types";

const Home = () => {
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username;
  const [topics, setTopics] = useState<Topic[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const topicsData = await fetchTopics();
        const articlesResponse = await fetchArticles();
        const articlesData = articlesResponse.data?.articles || [];
        setTopics(topicsData?.slice(0, 6) || []);
        setFeaturedArticles(articlesData?.slice(0, 6) || []);
      } catch (err) {
        console.error("Failed to fetch home page data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="mt-28 mx-5 md:mx-14 text-zinc-200">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to N(c)ews!</h1>
        <p className="text-lg md:text-xl mt-4">
          {username
            ? `Hi ${username}, explore the latest topics and articles.`
            : "Sign in or sign up to post articles and comments."}
        </p>
      </header>
      <section className="mb-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {topics.slice(0, 5).map((topic) => (
            <Link key={topic.slug} to={`/topics/${topic.slug}`}>
              <li className="p-3 max-w-xs bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800 rounded-xl shadow-lg border-2 border-redPrimary hover:border-textPrimary hover:scale-105 hover:shadow-redHover transition-all duration-300 ease-in-out cursor-pointer text-center">
                <h3 className="text-lg font-extrabold capitalize mb-2 tracking-wide text-zinc-100">
                  {topic.slug}
                </h3>
              </li>
            </Link>
          ))}
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Featured Articles</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
              >
                <li className="p-4 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800 rounded-xl shadow-lg border-2 border-redPrimary hover:border-textPrimary hover:scale-105 hover:shadow-redHover transition-all duration-300 ease-in-out cursor-pointer">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {article.title}
                  </h3>
                  <img
                    src={article.article_img_url}
                    alt={`Image for ${article.title}`}
                    className="rounded-lg w-full h-40 object-cover mt-3"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-lg">Author: {article.author}</p>
                    <p className="text-lg">{formatDate(article.created_at)}</p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Home;
