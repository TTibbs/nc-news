import React, { useState, useEffect } from "react";
import { fetchTopics } from "../utils/topicsApi";
import Header from "./Header";
import Loading from "./Loading";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";

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
  });

  if (isTopicsLoading) {
    return <Loading isTopicsLoading={isTopicsLoading} />;
  }

  if (error) {
    return <ErrorPage err={err} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-zinc-800 text-zinc-100 rounded-xl mb-5 mt-24 mx-5 p-10">
        <h1 className="text-3xl font-bold text-center my-5">Topics</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-7">
          {topicsList.map((topic) => {
            return <TopicCard topic={topic} key={topic.slug} />;
          })}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Topics;
