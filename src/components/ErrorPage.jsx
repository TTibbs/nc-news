import React from "react";
import Header from "./Header";

const ErrorPage = () => {
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
          <p>Oh no! An error happened.</p>
          <p>Please try again, or come back later</p>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
