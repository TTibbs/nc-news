import React from "react";
import Header from "./Header";

const ErrorPage = ({ status }) => {
  return (
    <>
      <Header />
      <section
        className="min-h-[100vh - 80px] flex items-center justify-center mt-20"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div
          className="bg-zinc-800 rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10"
          style={{ minHeight: "30vh" }}
        >
          <h1 className="text-base md:text-lg lg:text-xl font-bold">
            Error: {status}
          </h1>
          <img src="/400.jpg" alt="Article does not exist" />
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
