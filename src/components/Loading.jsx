import React, { useState, useEffect } from "react";

const LoadingBar = ({ isArticlesLoading }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!isArticlesLoading) {
      setLoadingProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [isArticlesLoading]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-800 z-50">
      <div className="w-4/5 max-w-xs h-2 bg-zinc-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-in-out"
          style={{ width: `${loadingProgress}` }}
        ></div>
      </div>
      <p className="mt-2 text-zinc-200 text-sm">{loadingProgress} %</p>
    </div>
  );
};

export default LoadingBar;
