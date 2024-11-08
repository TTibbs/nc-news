import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <section
        className="min-h-[100vh - 80px] flex items-center justify-center mt-20"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div
          className="bg-zinc-800 rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3"
          style={{ minHeight: "30vh" }}
        >
          <h1 className="p-3 text-2xl">Ello, it's Tibbs. Talk to me.</h1>
          <img src="/TTibbs.png" alt="Talk to me" />
        </div>
      </section>
    </>
  );
};

export default Home;
