export interface Article {
  article_id: number;
  title: string;
  topic: string;
  author: string;
  body?: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  comment_count: number;
}

export interface Comment {
  comment_id: number;
  author: string;
  article_id: number;
  votes: number;
  created_at: string;
  body: string;
}

export interface Topic {
  slug: string;
  description: string;
}

export interface User {
  username: string;
  name: string;
  avatar_url: string;
}

export interface ApiResponse<T> {
  articles?: Article[];
  article?: Article;
  articleComments?: Comment[];
  topics?: Topic[];
  topic?: Topic;
  user?: User;
  newUser?: User;
  updatedUser?: User;
  deletedUser?: User;
  newArticle?: Article;
  updatedArticle?: Article;
  newComment?: Comment;
  comment?: Comment;
  total_votes?: number;
  total_count?: number;
  msg?: string;
}

export interface ArticleQueryParams {
  sort_by?: string;
  order?: "asc" | "desc";
  limit?: number;
  p?: number;
  topic?: string;
}

export interface NewArticle {
  title: string;
  topic: string;
  author: string;
  body: string;
  article_img_url?: string;
}

export interface NewComment {
  username: string;
  body: string;
}

export interface NewTopic {
  slug: string;
  description: string;
}

export interface UpdatedUser {
  name?: string;
  avatar_url?: string;
}

export interface VoteUpdate {
  inc_votes: number;
}
