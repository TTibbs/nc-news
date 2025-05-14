import { fetchTopics } from "@/api/topicsApi";
import { Topic } from "@/types/api.types";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const FeaturedTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData?.slice(0, 6) || []);
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
  );
};
