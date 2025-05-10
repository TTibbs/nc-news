import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
});

export const fetchTopics = async () => {
  try {
    const response = await api.get("/api/topics");
    return response.data.topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchTopicBySlug = async (slug) => {
  try {
    const response = await api.get(`/api/topics/${slug}`);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postTopic = async (newTopic) => {
  try {
    const response = await api.post(`/api/topics`, newTopic);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTopic = async (slug) => {
  try {
    const response = await api.delete(`/api/topics/${slug}`);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
