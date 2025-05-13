import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import {
  fetchUser,
  updateUser,
  getUserCommentVotes,
  getUserArticleVotes,
} from "@/api/userApi";
import { Link } from "react-router-dom";
import { User } from "@/types/api.types";
import ErrorPage from "@/pages/ErrorPage";

const Profile = (): JSX.Element => {
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username;
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [commentVotes, setCommentVotes] = useState<number | null>(null);
  const [articleVotes, setArticleVotes] = useState<number | null>(null);

  const handleLogout = (): void => {
    if (userContext?.setUser) {
      userContext.setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      Promise.all([
        fetchUser(username),
        getUserCommentVotes(username),
        getUserArticleVotes(username),
      ])
        .then(([data, commentVotes, articleVotes]) => {
          setUserInfo(data);
          setEditName(data?.name || "");
          setEditAvatar(data?.avatar_url || "");
          setCommentVotes(commentVotes);
          setArticleVotes(articleVotes);
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

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditName(userInfo?.name || "");
    setEditAvatar(userInfo?.avatar_url || "");
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (userInfo) {
        const updated = await updateUser(userInfo.username, {
          name: editName,
          avatar_url: editAvatar,
        });
        setUserInfo(updated);
        setIsEditing(false);
        if (userContext?.setUser) userContext.setUser(updated);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-r-transparent border-l-redPrimary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !userInfo) {
    return <ErrorPage error={error || "No user data available."} />;
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4 text-zinc-200">
      <div className="flex flex-col items-center gap-4 bg-zinc-800 p-8 rounded-xl shadow-lg border-2 border-redPrimary max-w-md w-full">
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="flex flex-col items-center gap-4 w-full"
          >
            <img
              src={userInfo.avatar_url}
              alt="Avatar preview"
              className="w-32 h-32 rounded-full border-2 border-zinc-700 object-cover"
            />
            <label className="w-full">
              <span className="block mb-1">Name</span>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 rounded bg-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-redPrimary"
                required
              />
            </label>
            <label className="w-full">
              <span className="block mb-1">Avatar URL</span>
              <input
                type="url"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                className="w-full p-2 rounded bg-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-redPrimary"
                required
              />
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-4"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="outline outline-2 rounded-lg outline-zinc-500 hover:outline-redPrimary hover:bg-zinc-700 hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <img
              src={userInfo.avatar_url}
              alt={`${userInfo.username}'s avatar`}
              className="w-32 h-32 rounded-full border-2 border-zinc-700 object-cover"
            />
            <p className="text-lg">
              Username:{" "}
              <span className="font-semibold">{userInfo.username}</span>
            </p>
            <p className="text-lg">
              Name: <span className="font-semibold">{userInfo.name}</span>
            </p>
            <button
              onClick={handleEdit}
              className="outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-4 mt-2"
            >
              Edit Profile
            </button>
          </>
        )}
        <div className="flex flex-col items-center gap-2 mt-4 w-full">
          <div className="flex justify-between w-full">
            <span className="text-base text-zinc-400">
              Total Comment Votes:
            </span>
            <span className="font-bold text-lg">{commentVotes ?? "-"}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-base text-zinc-400">
              Total Article Votes:
            </span>
            <span className="font-bold text-lg">{articleVotes ?? "-"}</span>
          </div>
        </div>
      </div>
      {username && (
        <div>
          <Link to="/auth" onClick={handleLogout}>
            <button className="text-xl outline outline-2 rounded-lg outline-redPrimary hover:outline-textPrimary hover:bg-redHover hover:text-zinc-100 transition-all duration-300 ease-linear py-1 px-3 mt-4">
              Log Out
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Profile;
