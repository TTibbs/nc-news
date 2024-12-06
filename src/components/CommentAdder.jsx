import React, { useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { fetchArticleComments, addNewComment } from "../utils/commentsApi";

const CommentAdder = ({ setArticleComments }) => {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);
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

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const submitNewComment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user) {
      setError("You must be logged in to comment.");
      setIsSubmitting(false);
      return;
    }

    const username = user.username;

    addNewComment(article_id, username, newComment)
      .then(() => {
        setNewComment("");
        return fetchArticleComments(article_id);
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

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p className="text-textPrimary text-lg">
          Please{" "}
          <a
            href="/auth"
            className="text-redHover hover:underline decoration-redHover decoration-4"
          >
            log in
          </a>{" "}
          to add a comment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 border-zinc-200 mt-5">
      <div className="flex items-center">
        <form onSubmit={submitNewComment}>
          <label htmlFor="newComment">Add Comment:</label>
          <textarea
            ref={textareaRef}
            className="bg-zinc-800 py-2 px-3 text-sm md:text-base lg:text-lg rounded-lg outline outline-4 outline-redPrimary text-zinc-200 w-full focus:shadow-lg focus:shadow-redHover"
            name="newComment"
            id="newComment"
            cols="100"
            rows="5"
            required
            value={newComment}
            onChange={handleNewComment}
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-end mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mb-5 outline outline-2 outline-redPrimary hover:bg-redHover hover:outline-zinc-200 transition-all duration-300 ease-linear py-1 px-3 rounded-lg text-sm md:text-base lg:text-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentAdder;
