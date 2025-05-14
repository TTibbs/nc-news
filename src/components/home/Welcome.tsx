import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export const Welcome = () => {
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username;

  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold">Welcome to NC News!</h1>
      <p className="text-lg md:text-xl mt-4">
        {username
          ? `Hi ${username}, explore the latest topics and articles.`
          : "Sign in or sign up to post articles and comments."}
      </p>
    </div>
  );
};
