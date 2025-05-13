import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Article,
  ArticleQueryParams,
  NewArticle,
  ApiResponse,
} from "@/types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticles = async (
  sort_by: string = "created_at",
  order: "asc" | "desc" = "asc",
  limit?: number,
  p: number = 1
): Promise<AxiosResponse<ApiResponse<Article>>> => {
  try {
    const response = await api.get("/api/articles", {
      params: {
        sort_by,
        order,
        limit,
        p,
      } as ArticleQueryParams,
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const fetchArticleById = async (
  article_id: number
): Promise<Article> => {
  try {
    const response = await api.get(`/api/articles/${article_id}`);
    return response.data.article;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const fetchArticleComments = async (
  article_id: number
): Promise<ApiResponse<Article>> => {
  try {
    const response = await api.get(`/api/articles/${article_id}/comments`);
    return response.data.articleComments;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const fetchArticlesByTopic = async (
  slug: string
): Promise<Article[]> => {
  try {
    const response = await api.get(`/api/articles?topic=${slug}`);
    return response.data.articles;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const updateArticleVotes = async (
  article_id: number,
  inc_votes: number
): Promise<Article> => {
  const body = { inc_votes };

  try {
    const response = await api.patch(`/api/articles/${article_id}`, body);
    return response.data.updatedArticle;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const deleteArticleComment = async (
  comment_id: number
): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(`/api/comments/${comment_id}`);
    return response.data.comment;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.log(err);
    throw err;
  }
};

export const postArticle = async (newArticle: NewArticle): Promise<Article> => {
  try {
    const response = await api.post(`/api/articles`, newArticle);
    return response.data.newArticle;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.log(err);
    throw err;
  }
};

export const deleteArticle = async (
  article_id: number
): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(`/api/articles/${article_id}`);
    return response.data.article;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};
