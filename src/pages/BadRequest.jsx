const BadRequest = ({ error }) => {
  return (
    <section
      className="flex flex-col items-center justify-center mt-20"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      <div
        className="bg-zinc-800 rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10"
        style={{ minHeight: "30vh" }}
      >
        <h1 className="text-base md:text-lg lg:text-xl font-bold">
          Error: {error} made to server. Please make sure your query was
          correct, or contact support if error persists.
        </h1>
        <img src="/400.jpg" alt="Bad request made to server" />
      </div>
    </section>
  );
};

export default BadRequest;
