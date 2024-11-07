import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addNewComment, fetchArticleComments } from "../utils/api";

const CommentAdder = ({ setArticleComments }) => {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("grumpy19");
  const [isError, setIsError] = useState(null);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitNewComment = (e) => {
    e.preventDefault();
    addNewComment(article_id, username, newComment)
      .then(() => {
        setIsError(null);
        setNewComment("");
      })
      .then(() => {
        return fetchArticleComments(article_id);
      })
      .then((commentsData) => {
        setArticleComments(commentsData);
      })
      .catch((err) => {
        console.log("Error adding comment", err);
        setIsError(err);
      })
      .catch((err) => {
        console.log("Error fetching updated comments", err);
        setIsError(err);
      });
  };

  return (
    <div className="flex flex-col gap-2 border-zinc-200">
      <div className="flex items-center">
        {isError ? <ErrorPage err={err} /> : null}
        <form onSubmit={submitNewComment}>
          <label htmlFor="newComment">Add Comment:</label>
          <textarea
            className="bg-zinc-800 mt-2 py-2 px-3 text-sm md:text-base lg:text-lg rounded-lg outline outline-4 outline-textRed text-zinc-200 w-full focus:shadow-lg focus:shadow-redHover"
            name="newComment"
            id="newComment"
            cols="200"
            rows="5"
            required
            value={newComment}
            onChange={handleNewComment}
          ></textarea>
          <div className="flex items-center justify-end mt-5">
            <button
              type="submit"
              className="mb-5 outline outline-2 outline-textRed hover:bg-redHover hover:outline-zinc-200 transition-all duration-300 ease-linear py-1 px-3 rounded-lg text-sm md:text-base lg:text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentAdder;
