import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchUser } from "../api/userApi";
import { Link } from "react-router-dom";
import { User } from "../types/api.types";

const Profile = (): JSX.Element => {
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username;
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = (): void => {
    if (userContext?.setUser) {
      userContext.setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      fetchUser(username)
        .then((data) => {
          setUserInfo(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch user info");
          console.log("Failed to fetch user info", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!userInfo) {
    return <div>No user data available.</div>;
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4 text-zinc-200">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col items-center gap-4 bg-zinc-800 p-6 rounded-lg shadow-lg">
        <img
          src={userInfo.avatar_url}
          alt={`${userInfo.username}'s avatar`}
          className="w-32 h-32 rounded-full border-2 border-zinc-700"
        />
        <p className="text-lg">
          Username: <span className="font-semibold">{userInfo.username}</span>
        </p>
        <p className="text-lg">
          Name: <span className="font-semibold">{userInfo.name}</span>
        </p>
      </div>
      {username && (
        <div>
          <Link to="/auth" onClick={handleLogout}>
            <button className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3">
              Log Out
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Profile;
