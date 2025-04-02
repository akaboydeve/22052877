import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip, useTheme, alpha, IconButton } from '@mui/material';
import { UserWithPostCount } from '../types';
import { getRandomUserAvatar } from '../utils/imageUtils';
import ArticleIcon from '@mui/icons-material/Article';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

interface UserCardProps {
    user: UserWithPostCount;
    rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);

    // Generate a random engagement rate based on user ID
    const engagementRate = ((parseInt(user.id) % 30) + 70) / 10;

    // Determine if user is "verified" based on rank
    const isVerified = rank <= 2;

    // Define rank badge colors and styles
    const getRankStyles = () => {
        switch (rank) {
            case 1:
                return {
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFC107 90%)',
                    color: '#000',
                    boxShadow: '0 3px 10px rgba(255, 215, 0, 0.5)'
                };
            case 2:
                return {
                    background: 'linear-gradient(45deg, #E0E0E0 30%, #BDBDBD 90%)',
                    color: '#000',
                    boxShadow: '0 3px 10px rgba(224, 224, 224, 0.3)'
                };
            case 3:
                return {
                    background: 'linear-gradient(45deg, #CD7F32 30%, #A55E1C 90%)',
                    color: '#fff',
                    boxShadow: '0 3px 10px rgba(205, 127, 50, 0.3)'
                };
            default:
                return {
                    background: alpha(theme.palette.background.paper, 0.8),
                    color: theme.palette.text.primary,
                    boxShadow: `0 3px 10px ${alpha('#000', 0.2)}`
                };
        }
    };

    const rankStyles = getRankStyles();

    return (
        <Card
            sx={{
                mb: 2,
                display: 'flex',
                borderRadius: 3,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha('#121212', 0.85)})`,
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                boxShadow: hovered
                    ? `0 15px 30px ${alpha('#000', 0.25)}, 0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`
                    : `0 10px 20px ${alpha('#000', 0.15)}`,
                backdropFilter: 'blur(10px)',
                border: rank === 1
                    ? `1px solid ${alpha('#FFD700', 0.3)}`
                    : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="perspective-container"
        >
            {/* Rank badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    left: -12,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    zIndex: 2,
                    ...rankStyles,
                    transition: 'transform 0.3s ease',
                    transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                }}
            >
                {rank}
            </Box>

            {/* User avatar */}
            <Box sx={{ position: 'relative', p: 2 }}>
                <Avatar
                    src={getRandomUserAvatar(user.id)}
                    alt={user.name}
                    sx={{
                        width: 90,
                        height: 90,
                        border: rank === 1
                            ? `3px solid ${theme.palette.primary.main}`
                            : `3px solid ${alpha(theme.palette.background.paper, 0.8)}`,
                        boxShadow: `0 8px 16px ${alpha('#000', 0.25)}`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />

                {/* Circular glow effect for top users */}
                {rank <= 3 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: rank === 1
                                ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 30%, transparent 70%)`
                                : rank === 2
                                    ? `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 30%, transparent 70%)`
                                    : `radial-gradient(circle, ${alpha(theme.palette.primary.dark, 0.1)} 30%, transparent 70%)`,
                            zIndex: 0,
                            pointerEvents: 'none',
                            opacity: hovered ? 1 : 0.7,
                            transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
                            animation: hovered ? 'pulse 2s infinite' : 'none',
                        }}
                    />
                )}
            </Box>

            {/* User info */}
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                pr: 6,
                transition: 'all 0.3s ease',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            mr: 1,
                            transition: 'color 0.3s ease',
                            color: hovered ? theme.palette.primary.light : 'inherit',
                            fontWeight: 600,
                        }}
                    >
                        {user.name}
                    </Typography>

                    {isVerified && (
                        <VerifiedIcon
                            fontSize="small"
                            sx={{
                                color: theme.palette.primary.main,
                                filter: `drop-shadow(0 0 3px ${alpha(theme.palette.primary.main, 0.5)})`,
                                transition: 'transform 0.3s ease',
                                transform: hovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0)',
                            }}
                        />
                    )}
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        transition: 'opacity 0.3s ease',
                        opacity: hovered ? 1 : 0.8,
                    }}
                >
                    Engagement Rate: {engagementRate.toFixed(1)}%
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        icon={<ArticleIcon />}
                        label={`${user.postCount} posts`}
                        color="primary"
                        size="small"
                        sx={{
                            fontWeight: 500,
                            boxShadow: hovered
                                ? `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                                : `0 2px 5px ${alpha(theme.palette.primary.main, 0.2)}`,
                            transition: 'all 0.3s ease',
                            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                        }}
                    />
                </Box>

                {/* Action buttons */}
                <Box sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                    <IconButton
                        size="small"
                        sx={{
                            mb: 1,
                            bgcolor: theme.palette.primary.main,
                            color: '#000',
                            '&:hover': {
                                bgcolor: theme.palette.primary.light,
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                            transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{
                        display: 'block',
                        color: 'text.secondary',
                        transition: 'all 0.3s ease',
                        opacity: hovered ? 0.9 : 0.6,
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}>
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard; 