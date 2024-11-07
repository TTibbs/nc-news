import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { fetchArticles } from "../utils/api";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ setArticleList }) => {
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchArticles(sortBy, order, limit)
      .then((data) => {
        setIsArticlesLoading(false);
        setArticleList(data);
      })
      .catch((err) => console.log(err));
  }, [sortBy, order, limit]);

  const handleSortByChange = ({ target: { value } }) => setSortBy(value);
  const handleOrderChange = ({ target: { value } }) => setOrder(value);
  const handleLimitChange = ({ target: { value } }) => setLimit(value);

  if (isArticlesLoading)
    return <Loading isArticlesLoading={isArticlesLoading} />;

  const SelectInput = ({ label, value, onChange, options, width = "w-24" }) => (
    <label className="flex items-center justify-center gap-2">
      <span className="min-w-16">{label}:</span>
      <select
        value={value}
        onChange={onChange}
        className={`${width} outline outline-2 outline-zinc-900 py-1 px-2 rounded-md text-center bg-white`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="w-full rounded-lg">
      <button
        className="md:hidden flex items-center outline outline-2 outline-zinc-900 p-3 rounded-lg mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Filters</span>
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`
        flex flex-col md:flex-row md:items-center md:justify-end gap-4
        ${isOpen ? "block" : "hidden"} md:flex
        p-4 md:p-0 rounded-lg
      `}
      >
        <SelectInput
          label="Sort"
          value={sortBy}
          onChange={handleSortByChange}
          width="w-[100px] md:w-32"
          options={[
            { value: "created_at", label: "Created" },
            { value: "title", label: "Title" },
            { value: "topic", label: "Topic" },
            { value: "author", label: "Author" },
            { value: "votes", label: "Votes" },
            { value: "comment_count", label: "Comment Count" },
          ]}
        />
        <SelectInput
          label="Order"
          value={order}
          onChange={handleOrderChange}
          width="w-[100px] md:w-24"
          options={[
            { value: "asc", label: "A-Z" },
            { value: "desc", label: "Z-A" },
          ]}
        />
        <SelectInput
          label="Limit"
          value={limit}
          onChange={handleLimitChange}
          width="w-[100px] md:w-24"
          options={[
            { value: "10", label: "10" },
            { value: "5", label: "5" },
          ]}
        />
      </div>
    </div>
  );
};

export default Filter;
