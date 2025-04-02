import React, { useEffect, useState } from 'react';
import { Typography, Box, Alert, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { api } from '../api/api';
import { Post, PostWithComments, User } from '../types';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const REFRESH_INTERVAL = 30000; // 30 seconds

const RealtimeFeed: React.FC = () => {
    const [feedPosts, setFeedPosts] = useState<PostWithComments[]>([]);
    const [users, setUsers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefresh, setLastRefresh] = useState<number>(Date.now());

    // Function to fetch all posts and their comments
    const fetchAllPosts = async () => {
        try {
            setError(null);
            const currentTime = Date.now();

            // Fetch users if we don't have them yet
            if (Object.keys(users).length === 0) {
                const usersResponse = await api.getUsers();
                setUsers(usersResponse.users);
            }

            // Fetch posts for each user
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

            // Add timestamp to each post for ordering
            const postsWithTime = allPosts.map(post => ({
                ...post,
                timestamp: currentTime - (post.id % 1000) * 60000 // Simulate different timestamps
            }));

            // Sort posts by timestamp (newest first)
            const sortedPosts = postsWithTime.sort((a, b) =>
                (b.timestamp || 0) - (a.timestamp || 0)
            );

            // Fetch comments for each post
            const postsWithComments: PostWithComments[] = [];

            for (const post of sortedPosts) {
                try {
                    const commentsResponse = await api.getPostComments(post.id);

                    postsWithComments.push({
                        ...post,
                        comments: commentsResponse.comments,
                        commentCount: commentsResponse.comments.length,
                        user: {
                            id: post.userid.toString(),
                            name: users[post.userid.toString()] || 'Unknown User'
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

            setFeedPosts(postsWithComments);
            setLastRefresh(currentTime);
        } catch (err) {
            console.error('Error fetching feed posts:', err);
            setError('Failed to load feed posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        setLoading(true);
        fetchAllPosts();

        // Set up interval for refreshing
        const intervalId = setInterval(() => {
            fetchAllPosts();
        }, REFRESH_INTERVAL);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Function to manually refresh the feed
    const handleRefresh = () => {
        setLoading(true);
        fetchAllPosts();
    };

    if (loading && feedPosts.length === 0) {
        return <Loading message="Loading feed..." />;
    }

    if (error && feedPosts.length === 0) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Real-time Feed
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    disabled={loading}
                >
                    Refresh
                </Button>
            </Box>

            {loading && <Alert severity="info" sx={{ mb: 2 }}>Refreshing feed...</Alert>}

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Last updated: {new Date(lastRefresh).toLocaleTimeString()}
            </Typography>

            {feedPosts.length === 0 ? (
                <Alert severity="info">No posts found.</Alert>
            ) : (
                feedPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </Box>
    );
};

export default RealtimeFeed; 