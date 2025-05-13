import { BiSolidUpvote } from "react-icons/bi";
import { FaComments } from "react-icons/fa";

interface VotesAndCommentCountProps {
  votes: number;
  commentCount: number;
}

const VotesAndCommentCount = ({
  votes,
  commentCount,
}: VotesAndCommentCountProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="flex items-center gap-2">
        <BiSolidUpvote className="text-base md:text-lg lg:text-2xl text-redPrimary" />
        {votes}
      </p>
      <p className="flex items-center gap-2">
        <FaComments className="text-base md:text-lg lg:text-2xl text-bluePrimary" />
        {commentCount}
      </p>
    </div>
  );
};

export default VotesAndCommentCount;
