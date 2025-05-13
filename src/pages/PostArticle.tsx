import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { fetchTopics, postTopic } from "../api/topicsApi";
import { postArticle } from "../api/articlesApi";
import { Topic, User } from "../types/api.types";

const PostArticle = (): JSX.Element => {
  const userContext = useContext(UserContext);
  const user = userContext?.user as User;
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicDescription, setTopicDescription] = useState<string>("");
  const [articleImgUrl, setArticleImgUrl] = useState<string>("");
  const [isImageValid, setIsImageValid] = useState<boolean>(true);
  const [isCheckingImage, setIsCheckingImage] = useState<boolean>(false);
  const [isNewTopic, setIsNewTopic] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        showToast("Failed to load topics. Please try again.", "error");
      }
    };
    loadTopics();
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      type,
    });
  };

  const validateImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return true;
    setIsCheckingImage(true);

    try {
      const img = new window.Image();
      const imagePromise = new Promise<boolean>((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });

      img.src = url;
      await imagePromise;
      setIsImageValid(true);
      return true;
    } catch (error) {
      setIsImageValid(false);
      showToast(
        "Invalid image URL. Please check the URL or try another one.",
        "error"
      );
      return false;
    } finally {
      setIsCheckingImage(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (articleImgUrl) {
        validateImageUrl(articleImgUrl);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [articleImgUrl]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setIsImageValid(true);
    if (selectedValue === "new") {
      setIsNewTopic(true);
      setTopic("");
    } else {
      setIsNewTopic(false);
      setTopic(selectedValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || (!topic && !isNewTopic)) {
      showToast("All fields are required.", "error");
      return;
    }

    if (articleImgUrl) {
      const isValid = await validateImageUrl(articleImgUrl);
      if (!isValid) return;
    }
    setIsSubmitting(true);
    try {
      if (isNewTopic) {
        if (!topic || !topicDescription) {
          showToast("Please provide a topic name and description.", "error");
          setIsSubmitting(false);
          return;
        }
        await postTopic({
          slug: topic.trim().toLowerCase(),
          description: topicDescription,
        });
        showToast(`New topic "${topic}" created successfully.`);
      }
      const newArticle = {
        title,
        topic: topic.trim().toLowerCase(),
        author: user.username,
        body,
        article_img_url:
          articleImgUrl ||
          "https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_1280.jpg",
      };
      const postedArticle = await postArticle(newArticle);
      showToast(`Article "${postedArticle.title}" posted successfully!`);
      resetForm();
      navigate(`/articles/${postedArticle.article_id}`);
    } catch (err) {
      showToast("Failed to post the article. Please try again.", "error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setTopic("");
    setTopicDescription("");
    setArticleImgUrl("");
    setIsNewTopic(false);
  };

  return (
    <section className="text-zinc-100 rounded-xl mt-28 mb-5 mx-5 p-10 flex flex-col items-center">
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
          <select
            value={isNewTopic ? "new" : topic}
            onChange={handleTopicChange}
            className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
            required
          >
            <option value="" disabled>
              Select a topic
            </option>
            {topics.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.slug}
              </option>
            ))}
            <option value="new">Add a new topic</option>
          </select>
        </label>
        {isNewTopic && (
          <>
            <label className="flex flex-col text-sm md:text-base">
              New Topic Name
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-redPrimary"
                placeholder="Enter the new topic name"
                required
              />
            </label>
            <label className="flex flex-col text-sm md:text-base">
              New Topic Description
              <textarea
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                className="bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-redPrimary"
                placeholder="Provide a description for the new topic"
                required
              ></textarea>
            </label>
          </>
        )}
        <label className="flex flex-col text-sm md:text-base">
          Image URL (optional)
          <div className="relative">
            <input
              type="text"
              value={articleImgUrl}
              onChange={(e) => setArticleImgUrl(e.target.value)}
              className={`bg-zinc-700 text-zinc-100 rounded-lg p-2 mt-1 w-full focus:outline-none focus:ring-2 ${
                articleImgUrl && !isImageValid
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-redPrimary"
              }`}
              placeholder="Enter an image URL for the article"
            />
            {isCheckingImage && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                Checking...
              </span>
            )}
            {articleImgUrl && !isImageValid && (
              <p className="text-red-500 text-sm mt-1">Invalid image URL</p>
            )}
          </div>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-32 mx-auto text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Post Article"}
        </button>
      </form>
    </section>
  );
};

export default PostArticle;
