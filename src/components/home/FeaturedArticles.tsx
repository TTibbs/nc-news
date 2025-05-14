import { fetchArticles } from "@/api/articlesApi";
import { Article } from "@/types/api.types";
import { formatDate } from "@/utils/utilFuncs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FeaturedArticles = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const articlesResponse = await fetchArticles();
        const articlesData = articlesResponse.data?.articles || [];
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
  );
};
