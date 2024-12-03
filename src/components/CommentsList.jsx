import React from "react";
import SingleComment from "./SingleComment";

const CommentsList = ({
  articleComments,
  setSingleArticle,
  setArticleComments,
}) => {
  return (
    <section className="text-zinc-100 rounded-bl-xl rounded-br-xl mx-5">
      <h2 className="text-base md:text-lg lg:text-xl font-bold my-4">
        Comments
      </h2>
      <ul>
        {articleComments.map((articleComment) => {
          return (
            <SingleComment
              setArticleComments={setArticleComments}
              setSingleArticle={setSingleArticle}
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
