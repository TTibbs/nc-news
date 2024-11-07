import { useState } from "react";
import { DownVoteButton, UpVoteButton } from "./Buttons";
import { updateArticleVotes } from "../utils/articlesApi";

export default function Voting({ votes, article_id }) {
  const [clientVotes, setClientVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const handleArticleVotes = (num) => {
    setClientVotes((currVotes) => {
      return currVotes + num;
    });
    updateArticleVotes(article_id, num)
      .then(() => {
        setIsError(false);
      })
      .catch((err) => {
        setClientVotes((currVotes) => {
          return currVotes - num;
        });
        setIsError(true);
      });
  };

  return (
    <>
      <p className="text-base md:text-lg lg:text-xl">
        Votes: {votes + clientVotes}
      </p>
      {isError ? <p>Oops, an error</p> : null}
      <UpVoteButton handleArticleVotes={handleArticleVotes} />
      <DownVoteButton handleArticleVotes={handleArticleVotes} />
    </>
  );
}
