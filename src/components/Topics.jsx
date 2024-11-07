import React, { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api";
import Header from "./Header";
import Loading from "./Loading";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";

const Topics = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setIsError(null);
        setIsLoading(false);
        setTopicsList(data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(err);
      });
  });

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-zinc-800 text-zinc-100 rounded-xl mb-5 mt-24 mx-5 p-10">
        {isError ? <ErrorPage err={err} /> : null}
        <p className="text-3xl font-bold text-center my-5">Topics</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
