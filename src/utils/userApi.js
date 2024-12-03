import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
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
