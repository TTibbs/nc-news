import { useState, useEffect } from "react";
import { DownVoteButton, UpVoteButton } from "../Buttons";
import { updateArticleVotes } from "../../api/articlesApi";
import { updateCommentVotes } from "../../api/commentsApi";

const Voting = ({ votes, article_id, comment_id }) => {
  const [clientVotes, setClientVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const contentType = article_id ? "article" : "comment";
  const contentId = article_id || comment_id;

  useEffect(() => {
    const savedVote = localStorage.getItem(`${contentType}-${contentId}-vote`);
    if (savedVote) {
      setHasVoted(true);
    }
  }, [contentType, contentId]);

  const handleVotes = (num) => {
    if (hasVoted) return;

    setClientVotes((currVotes) => currVotes + num);
    setHasVoted(true);

    const updateVotes = article_id ? updateArticleVotes : updateCommentVotes;
    const id = article_id || comment_id;

    updateVotes(id, num)
      .then(() => {
        setIsError(false);
        localStorage.setItem(
          `${contentType}-${contentId}-vote`,
          num.toString()
        );
      })
      .catch(() => {
        setClientVotes((currVotes) => currVotes - num);
        setHasVoted(false);
        localStorage.removeItem(`${contentType}-${contentId}-vote`);
        setIsError(true);
      });
  };

  return (
    <>
      {isError ? <p>Oops, an error</p> : null}
      <UpVoteButton handleArticleVotes={handleVotes} disabled={hasVoted} />
      <p className="text-base">{votes + clientVotes}</p>
      <DownVoteButton handleArticleVotes={handleVotes} disabled={hasVoted} />
    </>
  );
};

export default Voting;
