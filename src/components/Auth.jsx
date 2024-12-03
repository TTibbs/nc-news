import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { fetchUser, createUser } from "../utils/userApi";
import { UserContext } from "../contexts/UserContext";

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [signInUsername, setSignInUsername] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setError(null);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!signInUsername) {
      setError("Username is required.");
      return;
    }

    try {
      const user = await fetchUser(signInUsername);
      if (user) {
        setUser(user);
        navigate("/articles?p=1");
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("An error occurred during sign-in. Please try again.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!signUpUsername || !name || !imageUrl) {
      setError("All fields are required.");
      return;
    }

    try {
      const existingUser = await fetchUser(signUpUsername);
      if (existingUser) {
        setError("Username already taken.");
      } else {
        const newUser = { username: signUpUsername, name, imageUrl };
        const createdUser = await createUser(newUser);
        setUser(createdUser);
        navigate("/articles?p=1");
      }
    } catch (err) {
      setError("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-96 h-[420px] perspective">
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute w-full h-full backface-hidden auth-form">
              <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form className="space-y-4" onSubmit={handleSignInSubmit}>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="signInUsername"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="signInUsername"
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="auth-button">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex flex-col items-center justify-center gap-2 pt-6">
                <p>Don't have an account?</p>
                <button
                  onClick={handleFlip}
                  className="auth-button hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div
              className="absolute w-full h-full backface-hidden auth-form transform rotate-y-180"
              style={{ transform: "rotateY(180deg)" }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="signUpUsername"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="signUpUsername"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="imageUrl"
                  >
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="auth-button">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="flex flex-col items-center justify-center gap-2 mt-2">
                <p>Already have an account?</p>
                <button
                  onClick={handleFlip}
                  className="auth-button hover:underline"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
