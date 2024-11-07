import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
});

export const fetchTopics = () => {
  return api
    .get("/api/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((err) => console.log(err));
};
