import React, { useState, useEffect } from "react";
import { fetchTopics } from "../utils/topicsApi";
import Loading from "./Loading";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";

const Topics = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setIsTopicsLoading(true);
        setTopicsList(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsTopicsLoading(false);
      });
  }, []);

  if (isTopicsLoading) {
    return <Loading isTopicsLoading={isTopicsLoading} />;
  }

  if (error) {
    return <ErrorPage err={error} />;
  }

  return (
    <section className="flex flex-col">
      <main className="flex-grow text-textPrimary rounded-xl mb-5 my-24 mx-5">
        <h1 className="text-3xl font-bold text-center my-5">Topics</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-12 md:px-20 sm:gap-6 md:gap-8">
          {topicsList.map((topic) => {
            return <TopicCard topic={topic} key={topic.slug} />;
          })}
        </ul>
      </main>
    </section>
  );
};

export default Topics;
