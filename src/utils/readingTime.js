export const calculateReadingTime = (text) => {
  if (!text || typeof text !== "string") {
    return 0;
  }
  const wordsPerMinute = 200;
  const wordsArray = text.trim().split(/\s+/);
  const wordCount = wordsArray.length;
  const time = Math.ceil(wordCount / wordsPerMinute);
  return time;
};
