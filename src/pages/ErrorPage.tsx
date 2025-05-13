interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center mt-20">
      <div className="bg-zinc-800 min-h-[30vh] rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10">
        <h1 className="text-base md:text-lg lg:text-xl font-bold">
          Error: {error}
        </h1>
        <img src="/400.jpg" alt="Bad request made to server" />
      </div>
    </section>
  );
};

export default ErrorPage;
