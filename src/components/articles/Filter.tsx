import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "@/api/articlesApi";
import { FaChevronDown } from "react-icons/fa";
import { Article } from "@/types/api.types";

export interface FilterProps {
  setArticleList: React.Dispatch<React.SetStateAction<Article[]>>;
  totalArticles: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Filter = (props: FilterProps): JSX.Element => {
  const { setArticleList, totalArticles } = props;
  const [isArticlesLoading, setIsArticlesLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const limitQuery = searchParams.get("limit");
  const pageQuery = searchParams.get("p");

  const setSortValue = (direction: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", direction);
    setSearchParams(newParams);
  };

  const setOrderValue = (direction: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setLimitValue = (direction: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", direction);
    setSearchParams(newParams);
  };

  const setPageValue = (direction: number) => {
    const newParams = new URLSearchParams(searchParams);
    const currentPage = parseInt(pageQuery || "1");
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= maxPage) {
      newParams.set("p", newPage.toString());
      setSearchParams(newParams);
    }
  };

  useEffect(() => {
    const validOrder =
      orderQuery === "asc" || orderQuery === "desc" ? orderQuery : undefined;
    const validLimit = limitQuery ? parseInt(limitQuery) : undefined;
    const validPage = pageQuery ? parseInt(pageQuery) : undefined;
    fetchArticles(sortByQuery ?? undefined, validOrder, validLimit, validPage)
      .then(({ data }) => {
        setIsArticlesLoading(true);
        setArticleList(data.articles || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsArticlesLoading(false);
      });
  }, [sortByQuery, orderQuery, limitQuery, pageQuery, setArticleList]);

  if (isArticlesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  const limit = parseInt(limitQuery || "12");
  const maxPage = Math.ceil(totalArticles / limit);

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

  interface SelectInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    width?: string;
  }

  const SelectInput = ({
    label,
    value,
    onChange,
    options,
    width = "w-24",
  }: SelectInputProps) => (
    <label className="flex items-center justify-center mt-2 gap-2 text-textPrimary">
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
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <button
          value={pageQuery || "1"}
          onClick={() => setPageValue(-1)}
          disabled={parseInt(pageQuery || "1") <= 1}
          className="py-1 px-2 md:px-3 text-xs md:text-sm lg:text-base outline outline-2 outline-redPrimary bg-zinc-900 hover:bg-redHover hover:outline-textPrimary transition-all duration-300 ease-in-out text-textPrimary rounded disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:outline-redPrimary disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          value={pageQuery || "1"}
          onClick={() => setPageValue(+1)}
          disabled={parseInt(pageQuery || "1") >= maxPage}
          className="py-1 px-2 md:px-3 text-xs md:text-sm lg:text-base outline outline-2 outline-redPrimary bg-zinc-900 hover:bg-redHover hover:outline-textPrimary transition-all duration-300 ease-in-out text-textPrimary rounded disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:outline-redPrimary disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="w-full rounded-lg">
        <button
          aria-expanded={isOpen}
          className="md:hidden flex items-center mx-auto border-b-2 text-textPrimary border-textPrimary px-1 mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-textPrimary">Filters</span>
          <FaChevronDown
            className={`ml-2 transform transition-transform duration-400 text-textPrimary ${
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
            width="w-[80px] md:w-32"
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
            width="w-[80px] md:w-32"
            options={orderOptions}
          />
          <SelectInput
            label="Limit"
            value={limitQuery || "12"}
            onChange={({ target: { value } }) => setLimitValue(value)}
            width="w-[80px] md:w-24"
            options={[
              { value: "12", label: "12" },
              { value: "8", label: "8" },
              { value: "4", label: "4" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
