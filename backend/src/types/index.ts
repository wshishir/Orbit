import {
  User,
  Post,
  Comment,
  Like,
  Follow,
  Notification,
} from '@prisma/client';

//user types with relations
export interface UserWithCounts extends User {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}

export interface UserProfile extends User {
  followers: Follow[];
  following: Follow[];
  posts: Post[];
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}

//Post types with relations
export interface PostWithDetails extends Post {
  author: {
    id: string;
    username: string;
    displayName: string;
    profilePicture: string | null;
    isVerified: boolean;
  };
}

// Post types with relations
export interface PostWithDetails extends Post {
  author: {
    id: string;
    username: string;
    displayName: string;
    profilePicture: string | null;
    isVerified: boolean;
  };
  comments: CommentWithAuthor[];
  likes: Like[];
  _count: {
    comments: number;
    likes: number;
  };
  isLikedByUser?: boolean;
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    username: string;
    displayName: string;
    profilePicture: string | null;
  };
  replies?: CommentWithAuthor[];
}
// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    totalCount: number;
  };
}

//auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  identifier: string; //email or username
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

//request types
export interface CreatePostRequest {
  content: string;
  tags?: string[];
  codeSnippet?: {
    code: string;
    language: string;
  };
}

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
}

//jwt payload
export interface JWTPlayload {
  userId: string;
  type?: 'access' | 'refresh';
}

//express request with user
export interface AuthenticationRequest extends Request {
  user: {
    id: String;
    username: string;
    email: string;
  };
}
