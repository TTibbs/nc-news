import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = ({ status }) => {
  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center mt-20"
        style={{ minHeight: "calc(100vh - 160px)" }}
      >
        <div
          className="bg-zinc-800 rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10"
          style={{ minHeight: "30vh" }}
        >
          <h1 className="text-base md:text-lg lg:text-xl font-bold">
            Error: {status}
          </h1>
          <img src="/404.jpg" alt="Article does not exist" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
