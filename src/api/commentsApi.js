import axios from "axios";

const API_BASE_URL = process.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticleComments = (article_id) => {
  return api
    .get(`/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.articleComments;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const addNewComment = (article_id, username, newComment) => {
  return api
    .post(`/api/articles/${article_id}/comments`, {
      username: username,
      body: newComment,
    })
    .then((response) => {
      return response.data.newComment;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const updateCommentVotes = (comment_id, increment) => {
  return api
    .patch(`/api/comments/${comment_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data.comment;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const deleteArticleComment = (comment_id) => {
  return api
    .delete(`/api/comments/${comment_id}`)
    .catch((err) => console.log(err));
};
