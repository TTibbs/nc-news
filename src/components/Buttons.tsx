import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface ButtonProps {
  handleArticleVotes: (num: number) => void;
  disabled: boolean;
}

export const UpVoteButton = ({ handleArticleVotes, disabled }: ButtonProps) => {
  return (
    <BiSolidUpvote
      onClick={() => !disabled && handleArticleVotes(1)}
      className={`text-xl md:text-2xl lg:text-3xl ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer text-redPrimary hover:text-redHover"
      }`}
    />
  );
};

export const DownVoteButton = ({
  handleArticleVotes,
  disabled,
}: ButtonProps) => {
  return (
    <BiSolidDownvote
      onClick={() => !disabled && handleArticleVotes(-1)}
      className={`text-xl md:text-2xl lg:text-3xl ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer text-redPrimary hover:text-redHover"
      }`}
    />
  );
};

export const DeleteButton = () => {
  return <MdDelete />;
};
