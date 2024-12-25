import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchUser } from "../utils/userApi";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const username = user?.username;
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (user) {
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
    return <Loading isLoading={isLoading} />;
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
      {user && (
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
