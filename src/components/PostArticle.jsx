import React, { useState } from "react";
import { postArticle } from "../utils/articlesApi";
import { fetchTopicBySlug } from "../utils/topicsApi";
import { postTopic } from "../utils/topicsApi";

const PostArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [isNewTopic, setIsNewTopic] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !topic || !author) {
      setError("All fields are required.");
      return;
    }

    try {
      const existingTopic = await fetchTopicBySlug(topic);
      if (!existingTopic) {
        if (!topicDescription) {
          setError("Topic does not exist. Please provide a description.");
          setIsNewTopic(true);
          return;
        }

        await postTopic({ slug: topic, description: topicDescription });
      }

      const newArticle = {
        title,
        topic,
        author,
        body,
        article_img_url:
          articleImgUrl ||
          "https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_1280.jpg",
      };

      const postedArticle = await postArticle(newArticle);

      setSuccessMessage(
        `Article "${postedArticle.title}" posted successfully!`
      );
      setError(null);
      setTitle("");
      setBody("");
      setTopic("");
      setTopicDescription("");
      setAuthor("");
      setArticleImgUrl("");
      setIsNewTopic(false);
    } catch (err) {
      setError("Failed to post the article. Please try again.");
    }
  };

  return (
    <section className="text-zinc-100 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl mt-28 mb-5 mx-5 p-10 flex flex-col items-center">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-6">
        Post a New Article
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-4"
      >
        <label className="flex flex-col text-sm md:text-base">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
            placeholder="Enter the article title"
            required
          />
        </label>
        <label className="flex flex-col text-sm md:text-base">
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-redPrimary"
            placeholder="Write your article content here"
            required
          ></textarea>
        </label>
        <label className="flex flex-col text-sm md:text-base">
          Topic
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
            placeholder="Enter the article topic"
            required
          />
        </label>
        {isNewTopic && (
          <label className="flex flex-col text-sm md:text-base">
            New Topic Description
            <textarea
              value={topicDescription}
              onChange={(e) => setTopicDescription(e.target.value)}
              className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-redPrimary"
              placeholder="Provide a description for the new topic"
            ></textarea>
          </label>
        )}
        <label className="flex flex-col text-sm md:text-base">
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
            placeholder="Enter your name or username"
            required
          />
        </label>
        <label className="flex flex-col text-sm md:text-base">
          Image URL (optional)
          <input
            type="text"
            value={articleImgUrl}
            onChange={(e) => setArticleImgUrl(e.target.value)}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
            placeholder="Enter an image URL for the article"
          />
        </label>
        <button
          type="submit"
          className="w-32 mx-auto text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
        >
          Post Article
        </button>
        {error && (
          <p className="text-redPrimary text-sm md:text-base text-center mt-2">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm md:text-base text-center mt-2">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
};

export default PostArticle;
