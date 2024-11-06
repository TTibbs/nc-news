import React from "react";
import SingleComment from "./SingleComment";

const CommentsList = ({ articleComments }) => {
  return (
    <section className="border-t-2 border-zinc-300 bg-zinc-800 text-zinc-100 rounded-bl-xl rounded-br-xl mx-5">
      <p className="text-lg md:text-2xl lg:text-3xl font-bold text-center my-4">
        Comments
      </p>
      <ul>
        {articleComments.map((articleComment) => {
          return (
            <SingleComment
              articleComment={articleComment}
              key={articleComment.comment_id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default CommentsList;
