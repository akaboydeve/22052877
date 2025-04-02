export interface User {
    id: string;
    name: string;
}

export interface Post {
    id: number;
    userid: number;
    content: string;
    imageUrl?: string; // Random image URL for posts
    timestamp?: number; // For real-time feed ordering
}

export interface Comment {
    id: number;
    postid: number;
    content: string;
}

export interface UserWithPostCount extends User {
    postCount: number;
}

export interface PostWithComments extends Post {
    comments: Comment[];
    commentCount: number;
    user?: User;
}

export interface UsersResponse {
    users: Record<string, string>;
}

export interface PostsResponse {
    posts: Post[];
}

export interface CommentsResponse {
    comments: Comment[];
} 