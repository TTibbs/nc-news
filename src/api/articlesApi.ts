import axios, { AxiosResponse } from "axios";
import {
  Article,
  ArticleQueryParams,
  NewArticle,
  ApiResponse,
} from "../types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticles = (
  sort_by: string = "created_at",
  order: "asc" | "desc" = "asc",
  limit?: number,
  p: number = 1
): Promise<AxiosResponse<ApiResponse<Article>>> => {
  return api
    .get("/api/articles", {
      params: {
        sort_by,
        order,
        limit,
        p,
      } as ArticleQueryParams,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const fetchArticleById = (article_id: number): Promise<Article> => {
  return api
    .get(`/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const fetchArticleComments = (
  article_id: number
): Promise<ApiResponse<Article>> => {
  return api
    .get(`/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.articleComments;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const fetchArticlesByTopic = (slug: string): Promise<Article[]> => {
  return api
    .get(`/api/articles?topic=${slug}`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      return Promise.reject(
        err.response?.data || { status: 500, msg: "Server error" }
      );
    });
};

export const updateArticleVotes = (
  article_id: number,
  inc_votes: number
): Promise<Article> => {
  const body = { inc_votes };

  return api
    .patch(`/api/articles/${article_id}`, body)
    .then((response) => {
      return response.data.updatedArticle;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const deleteArticleComment = (
  comment_id: number
): Promise<AxiosResponse> => {
  return api.delete(`/api/comments/${comment_id}`).catch((err) => {
    console.log(err);
    throw err;
  });
};

export const postArticle = (newArticle: NewArticle): Promise<Article> => {
  return api
    .post(`/api/articles`, newArticle)
    .then((response) => {
      return response.data.newArticle;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const deleteArticle = (article_id: number): Promise<AxiosResponse> => {
  return api.delete(`/api/articles/${article_id}`).catch((err) => {
    console.log(err);
    throw err;
  });
};
