import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
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
    .catch((err) => console.log(err));
};

export const deleteArticleComment = (comment_id) => {
  return api
    .delete(`/api/comments/${comment_id}`)
    .catch((err) => console.log(err));
};
