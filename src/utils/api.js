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
      return response.data.articles;
    })
    .catch((err) => console.log(err));
};

export const fetchArticleById = (article_id) => {
  return api
    .get(`/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => console.log(err));
};

export const fetchArticleComments = (article_id) => {
  return api
    .get(`/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.articleComments;
    })
    .catch((err) => console.log(err));
};
