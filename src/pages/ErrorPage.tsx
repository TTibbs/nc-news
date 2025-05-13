interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <section
      className="min-h-[100vh - 80px] flex items-center justify-center mt-20"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div
        className="bg-zinc-800 rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10"
        style={{ minHeight: "30vh" }}
      >
        <h1 className="text-base md:text-lg lg:text-xl font-bold">
          Error: {error}
        </h1>
      </div>
    </section>
  );
};

export default ErrorPage;
