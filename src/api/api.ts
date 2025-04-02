import axios from 'axios';
import { UsersResponse, PostsResponse, CommentsResponse } from '../types';

// Use a proxy to avoid CORS issues
const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://20.244.56.144/evaluation-service';

// Create axios instance with default headers
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 10000
});

export const api = {
    // Get all users
    getUsers: async () => {
        try {
            const response = await apiClient.get<UsersResponse>(`${BASE_URL}/users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            // Return mock data for development if API fails
            return {
                users: {
                    "1": "John Doe",
                    "2": "Jane Smith",
                    "3": "Alex Johnson",
                    "4": "Emily Davis",
                    "5": "Michael Wilson",
                    "6": "Sarah Brown",
                    "7": "David Miller"
                }
            };
        }
    },

    // Get posts for a specific user
    getUserPosts: async (userId: string | number) => {
        try {
            const response = await apiClient.get<PostsResponse>(`${BASE_URL}/users/${userId}/posts`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching posts for user ${userId}:`, error);
            // Return mock data
            return {
                posts: Array.from({ length: (Number(userId) % 5) + 2 }, (_, i) => ({
                    id: i + 100 + Number(userId) * 10,
                    userid: Number(userId),
                    content: `Sample post ${i + 1} from user ${userId}`
                }))
            };
        }
    },

    // Get comments for a specific post
    getPostComments: async (postId: number) => {
        try {
            const response = await apiClient.get<CommentsResponse>(`${BASE_URL}/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments for post ${postId}:`, error);
            // Return mock data
            return {
                comments: Array.from({ length: (postId % 8) + 1 }, (_, i) => ({
                    id: i + 200 + postId * 3,
                    postid: postId,
                    content: `Sample comment ${i + 1} on post ${postId}`
                }))
            };
        }
    }
}; 