import React, { useEffect, useState } from 'react';
import { Typography, Box, Alert } from '@mui/material';
import { api } from '../api/api';
import { User, UserWithPostCount } from '../types';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const TopUsers: React.FC = () => {
    const [topUsers, setTopUsers] = useState<UserWithPostCount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                // Step 1: Fetch all users
                const usersResponse = await api.getUsers();
                const users: User[] = Object.entries(usersResponse.users).map(([id, name]) => ({
                    id,
                    name
                }));

                // Step 2: Fetch posts for each user to count them
                const usersWithPosts: UserWithPostCount[] = [];

                for (const user of users) {
                    try {
                        const postsResponse = await api.getUserPosts(user.id);
                        usersWithPosts.push({
                            ...user,
                            postCount: postsResponse.posts.length
                        });
                    } catch (err) {
                        console.error(`Error fetching posts for user ${user.id}:`, err);
                        // Continue with other users even if one fails
                        usersWithPosts.push({
                            ...user,
                            postCount: 0
                        });
                    }
                }

                // Step 3: Sort users by post count (descending) and take top 5
                const sortedUsers = usersWithPosts
                    .sort((a, b) => b.postCount - a.postCount)
                    .slice(0, 5);

                setTopUsers(sortedUsers);
            } catch (err) {
                console.error('Error fetching top users:', err);
                setError('Failed to load top users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []);

    if (loading) {
        return <Loading message="Loading top users..." />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Top 5 Users
            </Typography>

            {topUsers.length === 0 ? (
                <Alert severity="info">No users found.</Alert>
            ) : (
                topUsers.map((user, index) => (
                    <UserCard key={user.id} user={user} rank={index + 1} />
                ))
            )}
        </Box>
    );
};

export default TopUsers; 