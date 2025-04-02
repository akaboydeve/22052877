import React, { useEffect, useState } from 'react';
import { Typography, Box, Alert } from '@mui/material';
import { api } from '../api/api';
import { Post, PostWithComments, User } from '../types';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const TrendingPosts: React.FC = () => {
    const [trendingPosts, setTrendingPosts] = useState<PostWithComments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Step 1: Fetch all users
                const usersResponse = await api.getUsers();
                const users: Record<string, string> = usersResponse.users;

                // Step 2: Fetch posts for each user
                let allPosts: Post[] = [];

                for (const userId in users) {
                    try {
                        const postsResponse = await api.getUserPosts(userId);
                        allPosts = [...allPosts, ...postsResponse.posts];
                    } catch (err) {
                        console.error(`Error fetching posts for user ${userId}:`, err);
                        // Continue with other users even if one fails
                    }
                }

                // Step 3: Fetch comments for each post
                const postsWithComments: PostWithComments[] = [];

                for (const post of allPosts) {
                    try {
                        const commentsResponse = await api.getPostComments(post.id);

                        // Add user name to the post
                        const userName = users[post.userid.toString()];

                        postsWithComments.push({
                            ...post,
                            comments: commentsResponse.comments,
                            commentCount: commentsResponse.comments.length,
                            user: {
                                id: post.userid.toString(),
                                name: userName || 'Unknown User'
                            }
                        });
                    } catch (err) {
                        console.error(`Error fetching comments for post ${post.id}:`, err);

                        // Continue with other posts even if one fails
                        postsWithComments.push({
                            ...post,
                            comments: [],
                            commentCount: 0,
                            user: {
                                id: post.userid.toString(),
                                name: users[post.userid.toString()] || 'Unknown User'
                            }
                        });
                    }
                }

                // Step 4: Find the maximum comment count
                const maxCommentCount = Math.max(...postsWithComments.map(post => post.commentCount));

                // Step 5: Filter posts with the maximum comment count
                const trending = postsWithComments.filter(post => post.commentCount === maxCommentCount);

                setTrendingPosts(trending);
            } catch (err) {
                console.error('Error fetching trending posts:', err);
                setError('Failed to load trending posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingPosts();
    }, []);

    if (loading) {
        return <Loading message="Loading trending posts..." />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Trending Posts
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Posts with the most comments ({trendingPosts.length > 0 ? `${trendingPosts[0].commentCount} comments` : '0 comments'})
            </Typography>

            {trendingPosts.length === 0 ? (
                <Alert severity="info">No trending posts found.</Alert>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {trendingPosts.map(post => (
                        <Box key={post.id} sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
                            <PostCard post={post} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TrendingPosts; 