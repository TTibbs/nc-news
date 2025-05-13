import axios, { AxiosError, AxiosResponse } from "axios";
import { Comment, NewComment } from "@/types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticleComments = async (
  article_id: number
): Promise<Comment[]> => {
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

export const addNewComment = async (
  article_id: number,
  username: string,
  newComment: string
): Promise<Comment> => {
  try {
    const response = await api.post(`/api/articles/${article_id}/comments`, {
      username,
      body: newComment,
    } as NewComment);
    return response.data.newComment;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data?.msg) {
      throw new Error(err.response.data.msg);
    }
    console.error(err);
    throw err;
  }
};

export const updateCommentVotes = async (
  comment_id: number,
  increment: number
): Promise<Comment> => {
  try {
    const response = await api.patch(`/api/comments/${comment_id}`, {
      inc_votes: increment,
    });
    return response.data.comment;
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
    console.error(err);
    throw err;
  }
};
