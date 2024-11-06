import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import Loading from "../components/Loading";

const Filter = ({ setArticleList }) => {
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchArticles(sortBy, order, limit)
      .then((data) => {
        setIsArticlesLoading(false);
        setArticleList(data);
      })
      .catch((err) => console.log(err));
  }, [sortBy, order, limit]);

  const handleSortByChange = ({ target: { value } }) => {
    setSortBy(value);
  };

  const handleOrderChange = ({ target: { value } }) => {
    setOrder(value);
  };

  const handleLimitChange = ({ target: { value } }) => {
    setLimit(value);
  };

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  return (
    <div className="m-5 p-10 flex items-center justify-end gap-5">
      <label htmlFor="sortBy">
        Sort:
        <select
          name="sortBy"
          id="sortBy"
          onChange={handleSortByChange}
          className="outline outline-2 outline-zinc-900 ml-2 w-[100px] py-1 px-2 rounded-md text-center"
        >
          <option value="created_at">Created</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </label>
      <label htmlFor="order">
        Order:
        <select
          name="order"
          id="order"
          onChange={handleOrderChange}
          className="outline outline-2 outline-zinc-900 ml-2 w-[60px] py-1 px-2 rounded-md text-center"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </label>
      <label htmlFor="limit">
        Limit:
        <select
          name="limit"
          id="limit"
          onChange={handleLimitChange}
          className="outline outline-2 outline-zinc-900 ml-2 w-[60px] py-1 px-2 rounded-md text-center"
        >
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
