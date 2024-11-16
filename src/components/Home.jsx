import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center mt-28 mb-10"
        style={{ minHeight: "calc(90vh - 160px)" }}
      >
        <div
          className="w-[500px] text-textPrimary flex flex-col items-center justify-center gap-2"
          style={{ minHeight: "40vh" }}
        >
          <h1 className="p-3 text-lg md:text-xl lg:text-2xl text-center">
            Welcome to NC News. <br></br>To log in, please enter one of the
            provided usernames below.
          </h1>
          <ul className="flex items-center justify-center gap-2 mb-2 text-base md:text-lg lg:text-xl">
            <li>tickle122,</li>
            <li>grumpy19,</li>
            <li>happyamy2016,</li>
            <li>cooljmessy,</li>
            <li>weegembump,</li>
            <li>jessjelly,</li>
          </ul>
          <form
            action="#"
            className="flex flex-col justify-center gap-1 text-base md:text-lg lg:text-xl"
          >
            <label htmlFor="username" className="text-center">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder="Enter a valid username"
              type="text"
              className="py-1 px-3 rounded-lg outline outline-2 focus:outline-redPrimary text-textSecondary"
            />
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
