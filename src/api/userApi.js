import axios from "axios";

const API_BASE_URL = process.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchUser = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}`);
    return response.data.user;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null;
    } else {
      console.error(err);
      throw err;
    }
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await api.post(`/api/users`, newUser);
    return response.data.newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUser = async (username, updatedUser) => {
  try {
    const response = await api.patch(`/api/users/${username}`, updatedUser);
    return response.data.updatedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await api.delete(`/api/users/${username}`);
    return response.data.deletedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserCommentVotes = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}/commentvotes`);
    return response.data.total_votes;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserArticleVotes = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}/articlevotes`);
    return response.data.total_votes;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
