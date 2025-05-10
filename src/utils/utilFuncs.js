export const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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

export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};
