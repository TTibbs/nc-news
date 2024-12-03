import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import { fetchUser } from "../utils/userApi";

const Auth = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetchUser(username)
      .then(() => {
        setUser(username);
        navigate("/articles?p=1");
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.msg);
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center mt-24 mb-4"
        style={{ minHeight: "calc(90vh - 160px)" }}
      >
        <div className="w-[500px] lg:w-[800px] text-textPrimary flex flex-col items-center justify-center gap-2">
          <h1 className="p-3 text-lg md:text-xl lg:text-2xl text-center">
            Welcome to NC News
          </h1>
          <p className="p-3 text-base md:text-lg lg:text-xl">
            To log in, please enter one of the usernames provided below.
          </p>
          <ul className="flex items-center justify-center gap-2 p-3 text-sm md:text-base lg:text-lg">
            <li>tickle122,</li>
            <li>grumpy19,</li>
            <li>happyamy2016,</li>
            <li>cooljmessy,</li>
            <li>weegembump,</li>
            <li>jessjelly,</li>
          </ul>
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center gap-1 text-base md:text-lg lg:text-xl"
          >
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              placeholder="Enter a valid username"
              type="text"
              className="py-1 px-3 rounded-lg outline outline-2 focus:outline-redPrimary text-textSecondary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 py-1 px-3 rounded-lg bg-redPrimary text-white"
            >
              Log In
            </button>
            {error && <p>{errorMsg}</p>}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Auth;
