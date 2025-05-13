import { useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchArticleComments, addNewComment } from "@/api/commentsApi";
import { Comment } from "@/types/api.types";

interface CommentAdderProps {
  setArticleComments: (comments: Comment[]) => void;
}

const CommentAdder = ({ setArticleComments }: CommentAdderProps) => {
  const userContext = useContext(UserContext);
  const { article_id } = useParams<{ article_id: string }>();
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const notify = () => {
    toast("Comment Added", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleNewComment = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const submitNewComment = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!userContext?.user) {
      setError("You must be logged in to comment.");
      setIsSubmitting(false);
      return;
    }

    const username = userContext.user.username;
    const articleIdNum = article_id ? parseInt(article_id) : undefined;

    if (!articleIdNum) {
      setError("Invalid article ID.");
      setIsSubmitting(false);
      return;
    }

    addNewComment(articleIdNum, username, newComment)
      .then(() => {
        setNewComment("");
        return fetchArticleComments(articleIdNum);
      })
      .then((commentsData) => {
        setArticleComments(commentsData);
        notify();
      })
      .catch((errorMessage) => {
        setError(errorMessage);
        console.error("Error adding comment:", errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!userContext?.user) {
    return (
      <div className="text-center mb-10">
        <p className="text-lg">
          Want to contribute?{" "}
          <Link to="/auth" className="text-redPrimary hover:underline">
            Log in or Sign up
          </Link>{" "}
          to start posting and commenting.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submitNewComment} className="w-full max-w-xl mx-auto my-4">
      <textarea
        ref={textareaRef}
        value={newComment}
        onChange={handleNewComment}
        className="w-full p-2 rounded border border-zinc-700 bg-zinc-900 text-zinc-100"
        placeholder="Add a comment..."
        rows={3}
        required
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-redPrimary text-white rounded hover:bg-redHover transition-colors duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentAdder;
