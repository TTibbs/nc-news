import axios from "axios";
import { Topic, NewTopic } from "@/types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTopics = async (): Promise<Topic[]> => {
  try {
    const response = await api.get("/api/topics");
    return response.data.topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchTopicBySlug = async (slug: string): Promise<Topic> => {
  try {
    const response = await api.get(`/api/topics/${slug}`);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postTopic = async (newTopic: NewTopic): Promise<Topic> => {
  try {
    const response = await api.post(`/api/topics`, newTopic);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTopic = async (slug: string): Promise<Topic> => {
  try {
    const response = await api.delete(`/api/topics/${slug}`);
    return response.data.topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
