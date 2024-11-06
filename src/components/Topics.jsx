import React, { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api";
import Header from "./Header";
import Loading from "./Loading";
import TopicCard from "./TopicCard";

const Topics = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopicsList(data);
      })
      .catch((err) => console.log(err));
  });

  if (isTopicsLoading) {
    return <Loading isTopicsLoading={isTopicsLoading} />;
  }

  return (
    <>
      <Header />
      <section cn="bg-zinc-800 text-zinc-100 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl my-5 mx-5 p-10">
        <p className="text-3xl font-bold text-center my-5">Topics</p>
        <div>
          <ul className="grid grid-cols-2 md:grid-cols-3 place-items-center gap-4">
            {topicsList.map((topic) => {
              return <TopicCard topic={topic} key={topic.slug} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Topics;
