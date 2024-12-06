import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchArticles } from "../utils/articlesApi";
import { fetchTopics } from "../utils/topicsApi";

const Home = () => {
  const { user } = useContext(UserContext);
  const username = user?.username;
  const [topics, setTopics] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsData = await fetchTopics();
        const articlesResponse = await fetchArticles();
        const articlesData = articlesResponse.data.articles;
        setTopics(topicsData.slice(0, 5));
        setFeaturedArticles(articlesData.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch home page data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
      {isLoading ? (
        <p className="text-center">Loading content...</p>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5">Featured Topics</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <li
                  key={topic.slug}
                  className="p-4 bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold capitalize">
                    {topic.slug}
                  </h3>
                  <p className="text-sm mt-2 mb-4 line-clamp-3">
                    {topic.description}
                  </p>
                  <Link
                    to={`/topics/${topic.slug}`}
                    className="text-textPrimary outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
                  >
                    View Articles
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-5">Featured Articles</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => {
                const createdAt = new Date(article.created_at);
                const formattedDate = `${createdAt
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(createdAt.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${createdAt.getFullYear()}`;
                return (
                  <li
                    key={article.article_id}
                    className="p-4 bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm mt-2">Author: {article.author}</p>
                    <p className="text-sm mt-2">Date: {formattedDate}</p>
                    <img
                      src={article.article_img_url}
                      alt={`Image for ${article.title}`}
                      className="rounded-lg mt-3 mb-4"
                    />
                    <Link
                      to={`/articles/${article.article_id}`}
                      className="text-textPrimary outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
                    >
                      Read More
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          {!username && (
            <div className="text-center mb-10">
              <p className="text-lg">
                Want to contribute?{" "}
                <Link to="/auth" className="text-redPrimary hover:underline">
                  Log in or Sign up
                </Link>{" "}
                to start posting and commenting.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
