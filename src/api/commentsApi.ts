import axios, { AxiosResponse } from "axios";
import { Comment, NewComment } from "@/types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticleComments = (
  article_id: number
): Promise<Comment[]> => {
  return api
    .get(`/api/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.articleComments;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const addNewComment = (
  article_id: number,
  username: string,
  newComment: string
): Promise<Comment> => {
  return api
    .post(`/api/articles/${article_id}/comments`, {
      username,
      body: newComment,
    } as NewComment)
    .then((response) => {
      return response.data.newComment;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
    });
};

export const updateCommentVotes = (
  comment_id: number,
  increment: number
): Promise<Comment> => {
  return api
    .patch(`/api/comments/${comment_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data.comment;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.msg);
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
