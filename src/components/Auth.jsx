import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, createUser } from "../utils/userApi";
import { UserContext } from "../contexts/UserContext";

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formValues, setFormValues] = useState({
    signInUsername: "",
    signUpUsername: "",
    name: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const validateFields = (fields) => {
    const fieldErrors = {};
    fields.forEach((field) => {
      if (!formValues[field]) {
        fieldErrors[field] = "This field is required.";
      }
    });
    return fieldErrors;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const fieldErrors = validateFields(["signInUsername"]);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const user = await fetchUser(formValues.signInUsername);
      if (user) {
        setUser(user);
        navigate("/articles?p=1");
      } else {
        setErrors({ signInUsername: "User not found." });
      }
    } catch {
      setErrors({ signInUsername: "An error occurred during sign-in." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const fieldErrors = validateFields(["signUpUsername", "name", "imageUrl"]);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const existingUser = await fetchUser(formValues.signUpUsername);
      if (existingUser) {
        setErrors({ signUpUsername: "Username already taken." });
      } else {
        const newUser = {
          username: formValues.signUpUsername,
          name: formValues.name,
          imageUrl: formValues.imageUrl,
        };
        const createdUser = await createUser(newUser);
        setUser(createdUser);
        navigate("/articles?p=1");
      }
    } catch {
      setErrors({ signUpUsername: "An error occurred during sign-up." });
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (field) => {
    return (
      errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>
    );
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="relative w-96 h-[420px] perspective">
        <div
          className={`absolute w-full h-full transition-transform duration-700 transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute w-full h-full backface-hidden auth-form">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
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
                  value={formValues.signInUsername}
                  onChange={handleInputChange}
                  className="auth-input"
                  required
                />
                {renderError("signInUsername")}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
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
            <form className="space-y-4" onSubmit={handleSignUpSubmit}>
              {["signUpUsername", "name", "imageUrl"].map((field) => (
                <div key={field}>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor={field}
                  >
                    {field === "signUpUsername"
                      ? "Username"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "imageUrl" ? "url" : "text"}
                    id={field}
                    value={formValues[field]}
                    onChange={handleInputChange}
                    className="auth-input"
                    required
                  />
                  {renderError(field)}
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
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
    </section>
  );
};

export default Auth;
