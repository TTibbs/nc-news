import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { fetchArticles } from "../utils/articlesApi";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ setArticleList }) => {
  const [isArticlesLoading, setIsArticlesLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const limitQuery = searchParams.get("limit");

  const setSortValue = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", direction);
    setSearchParams(newParams);
  };

  const setOrderValue = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setLimitValue = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", direction);
    setSearchParams(newParams);
  };

  useEffect(() => {
    fetchArticles(sortByQuery, orderQuery, limitQuery)
      .then((data) => {
        setIsArticlesLoading(true);
        setArticleList(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsArticlesLoading(false);
      });
  }, [sortByQuery, orderQuery, limitQuery]);

  if (isArticlesLoading) {
    return <Loading isArticlesLoading={isArticlesLoading} />;
  }

  const isSortByNumeric =
    sortByQuery === "created_at" ||
    sortByQuery === "comment_count" ||
    sortByQuery === "votes";

  const orderOptions = isSortByNumeric
    ? [
        { value: "desc", label: "High-Low" },
        { value: "asc", label: "Low-High" },
      ]
    : [
        { value: "asc", label: "A-Z" },
        { value: "desc", label: "Z-A" },
      ];

  const SelectInput = ({ label, value, onChange, options, width = "w-24" }) => (
    <label className="flex items-center justify-center gap-2">
      <span className="min-w-8">{label}:</span>
      <select
        aria-label={`${label} filter`}
        value={value}
        onChange={onChange}
        className={`${width} outline outline-2 outline-textSecondary shadow-inner shadow-textSecondary py-1 px-2 rounded-md text-center text-textSecondary text-sm md:text-base bg-white`}
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
        aria-expanded={isOpen}
        className="md:hidden flex items-center gap-2 mx-auto border-b-2 text-textPrimary border-black px-1 mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Filters</span>
        <FaChevronDown
          className={`transform transition-transform duration-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-end gap-4 ${
          isOpen ? "block" : "hidden"
        } md:flex p-4 md:p-0 rounded-lg`}
      >
        <SelectInput
          label="Sort"
          value={sortByQuery || "created_at"}
          onChange={({ target: { value } }) => setSortValue(value)}
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
          value={orderQuery || "asc"}
          onChange={({ target: { value } }) => setOrderValue(value)}
          width="w-[100px] md:w-32"
          options={orderOptions}
        />
        <SelectInput
          label="Limit"
          value={limitQuery || "10"}
          onChange={({ target: { value } }) => setLimitValue(value)}
          width="w-[100px] md:w-24"
          options={[
            { value: "10", label: "10" },
            { value: "8", label: "8" },
            { value: "4", label: "4" },
          ]}
        />
      </div>
    </div>
  );
};

export default Filter;
