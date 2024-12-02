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

export const fetchTopicBySlug = (slug) => {
  return api
    .get(`/api/topics/${slug}`)
    .then((response) => {
      return response.data.topic;
    })
    .catch((err) => console.log(err));
};

export const postTopic = (newTopic) => {
  return api
    .post(`/api/topics`, newTopic)
    .then((response) => response.data.topic)
    .catch((err) => console.log(err));
};
