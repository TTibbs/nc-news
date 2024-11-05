import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
});

export const fetchArticles = () => {
  return api
    .get("/api/articles")
    .then((response) => {
      console.log(response.data.articles);
      return response.data.articles;
    })
    .catch((err) => {
      console.log(err);
    });
};
