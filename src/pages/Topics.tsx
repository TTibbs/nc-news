import { useState, useEffect, useContext } from "react";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "@/contexts/UserContext";
import { fetchTopics, deleteTopic } from "@/api/topicsApi";
import TopicCard from "@/components/TopicCard";
import ErrorPage from "@/pages/ErrorPage";
import { Topic } from "@/types/api.types";

const Topics = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const [topicsList, setTopicsList] = useState<Topic[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

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

  const handleDeleteTopic = (slug: string): void => {
    setIsDeleting(true);
    deleteTopic(slug)
      .then(() => {
        setTopicsList((prevTopics) =>
          prevTopics.filter((topic) => topic.slug !== slug)
        );
        showToast(`Topic "${slug}" deleted successfully.`, "success");
        setTopicToDelete(null);
      })
      .catch((err) => {
        showToast("Failed to delete the topic. Please try again.", "error");
        console.error("Error deleting topic:", err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <section className="flex flex-col items-center">
      <main className="flex flex-col items-center justify-center text-textPrimary rounded-xl mb-5 my-24 mx-5 w-full max-w-6xl min-h-[calc(90vh-10rem)]">
        <h1 className="text-3xl font-bold text-center my-5">Topics</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-12 md:px-20 sm:gap-6 md:gap-8 justify-items-center">
          {topicsList.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              onDelete={() => setTopicToDelete(topic.slug)}
              isDeletable={user?.username === "TTibbs"}
            />
          ))}
        </ul>
      </main>

      {topicToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-800 text-zinc-200 shadow-xl shadow-redPrimary rounded-lg p-5 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the topic "
              <span className="font-bold">{topicToDelete}</span>"?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setTopicToDelete(null)}
                className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTopic(topicToDelete)}
                disabled={isDeleting}
                className="text-xs md:text-sm lg:text-base outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Topics;
