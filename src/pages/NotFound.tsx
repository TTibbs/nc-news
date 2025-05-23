interface NotFoundProps {
  error?: { status?: string | number; msg?: string };
}

const NotFound = ({ error }: NotFoundProps) => {
  const status = error?.status || "404";
  const message = error?.msg || "Page Not Found";

  return (
    <section className="flex items-center justify-center mt-20 min-h-[calc(100vh-160px)]">
      <div className="bg-zinc-800 min-h-[30vh] rounded-xl w-[500px] text-zinc-200 flex flex-col items-center justify-center gap-3 p-10">
        <h1 className="text-base md:text-lg lg:text-xl font-bold">
          {`Error ${status}: ${message}`}
        </h1>
        <img
          src="/404.jpg"
          alt="Not found error image, http status dogs 404 image"
        />
      </div>
    </section>
  );
};

export default NotFound;
