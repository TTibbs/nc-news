import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addNewComment, fetchArticleComments } from "../utils/api";

const CommentAdder = ({ setArticleComments }) => {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("grumpy19");
  const [body, setBody] = useState("");

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitNewComment = (e) => {
    e.preventDefault();
    addNewComment(article_id, username, newComment)
      .then(() => {
        setNewComment("");
      })
      .catch((err) => console.log(err))
      .then(() => {
        fetchArticleComments(article_id)
          .then((commentsData) => {
            setArticleComments(commentsData);
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="flex flex-col gap-2 border-zinc-200">
      <div className="flex items-center">
        <form onSubmit={submitNewComment}>
          <label htmlFor="newComment">Add Comment:</label>
          <textarea
            className="bg-zinc-800 py-2 px-3 text-lg md:text-xl lg:text-2xl rounded-lg outline outline-4 outline-zinc-200 text-zinc-200 w-full focus:outline-red-500 focus:shadow-lg focus:shadow-red-500"
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
              className="mb-5 outline outline-2 outline-zinc-200 hover:bg-red-500 hover:text-zinc-200 transition-colors duration-250 ease-linear py-1 px-3 rounded-lg text-lg md:text-xl lg:text-2xl"
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
