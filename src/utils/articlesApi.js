import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-92aj.onrender.com",
});

export const fetchArticles = (
  sort_by = "created_at",
  order = "asc",
  limit,
  p = 1
) => {
  return api
    .get("/api/articles", {
      params: {
        sort_by: sort_by,
        order: order,
        limit: limit,
        p: p,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const fetchArticleById = (article_id) => {
  return api
    .get(`/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

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

export const fetchArticlesByTopic = (slug) => {
  return api
    .get(`/api/articles?topic=${slug}`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const updateArticleVotes = (article_id, inc_votes) => {
  const body = { inc_votes };

  return api
    .patch(`/api/articles/${article_id}`, body)
    .then((response) => {
      return response.data.updatedArticle;
    })
    .catch((err) => console.log(err));
};

export const deleteArticleComment = (comment_id) => {
  return api
    .delete(`/api/comments/${comment_id}`)
    .catch((err) => console.log(err));
};
