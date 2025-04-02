import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Box, Chip, IconButton, useTheme, alpha } from '@mui/material';
import { PostWithComments } from '../types';
import { getRandomPostImage } from '../utils/imageUtils';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface PostCardProps {
    post: PostWithComments;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    // Generate a random image for the post if it doesn't have one
    const imageUrl = post.imageUrl || getRandomPostImage(post.id);
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    // Generate random like count based on post ID
    const likeCount = liked ? (10 + (post.id % 90) + 1) : (10 + (post.id % 90));

    return (
        <Card
            sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: hovered
                    ? `0 15px 30px ${alpha('#000', 0.25)}, 0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`
                    : `0 10px 20px ${alpha('#000', 0.15)}`,
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                overflow: 'hidden',
                transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                backdropFilter: 'blur(10px)',
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha('#121212', 0.85)})`,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="perspective-container"
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={imageUrl}
                    alt={`Post ${post.id}`}
                    sx={{
                        objectFit: 'cover',
                        filter: hovered ? 'brightness(1)' : 'brightness(0.9)',
                        transition: 'filter 0.5s ease, transform 0.5s ease',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                        opacity: hovered ? 0.7 : 1,
                        transition: 'opacity 0.5s ease',
                    }}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: alpha(theme.palette.background.default, 0.6),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.background.default, 0.8),
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        opacity: hovered ? 1 : 0.8,
                    }}
                >
                    <MoreHorizIcon fontSize="small" />
                </IconButton>
            </Box>

            <CardContent sx={{
                position: 'relative',
                pb: 1,
                transition: 'all 0.3s ease',
            }}>
                {post.user && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        mt: -5,
                        position: 'relative',
                        zIndex: 2,
                    }}>
                        <Avatar
                            src={`https://i.pravatar.cc/40?u=${post.userid}`}
                            alt={post.user.name}
                            sx={{
                                width: 56,
                                height: 56,
                                border: `3px solid ${theme.palette.background.paper}`,
                                boxShadow: hovered
                                    ? `0 6px 12px ${alpha('#000', 0.3)}`
                                    : `0 4px 10px ${alpha('#000', 0.25)}`,
                                transition: 'all 0.3s ease',
                                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                        />
                        <Box sx={{ ml: 2 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{
                                    color: hovered ? theme.palette.primary.main : theme.palette.primary.light,
                                    transition: 'color 0.3s ease',
                                    textShadow: hovered ? `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
                                }}
                            >
                                {post.user.name}
                            </Typography>

                            {post.timestamp && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        transition: 'opacity 0.3s ease',
                                        opacity: hovered ? 1 : 0.8,
                                    }}
                                >
                                    {new Date(post.timestamp).toLocaleString()}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}

                <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        lineHeight: 1.6,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        opacity: hovered ? 1 : 0.9,
                        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                >
                    {post.content}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    pt: 2,
                    transition: 'transform 0.3s ease',
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: liked ? theme.palette.error.main : 'rgba(255, 255, 255, 0.5)',
                                mr: 1,
                                transition: 'all 0.3s ease',
                                transform: hovered ? 'scale(1.1)' : 'scale(1)',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                },
                            }}
                            onClick={() => setLiked(!liked)}
                        >
                            <FavoriteIcon
                                fontSize="small"
                                sx={{
                                    transition: 'transform 0.3s ease',
                                    transform: liked ? 'scale(1.1)' : 'scale(1)',
                                    animation: liked ? 'heartBeat 0.6s ease' : 'none',
                                    '@keyframes heartBeat': {
                                        '0%': { transform: 'scale(1)' },
                                        '25%': { transform: 'scale(1.3)' },
                                        '50%': { transform: 'scale(1)' },
                                        '75%': { transform: 'scale(1.2)' },
                                        '100%': { transform: 'scale(1.1)' },
                                    },
                                }}
                            />
                        </IconButton>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mr: 2,
                                color: liked ? theme.palette.error.main : 'text.secondary',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            {likeCount}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                        }}>
                            <CommentIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="body2" color="text.secondary">
                                {post.commentCount}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <IconButton
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                mr: 1,
                                transition: 'all 0.3s ease',
                                opacity: hovered ? 0.9 : 0.6,
                                '&:hover': {
                                    transform: 'scale(1.1) rotate(5deg)',
                                    color: theme.palette.primary.light,
                                },
                            }}
                        >
                            <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{
                                color: bookmarked ? theme.palette.primary.main : 'text.secondary',
                                transition: 'all 0.3s ease',
                                opacity: hovered || bookmarked ? 0.9 : 0.6,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    color: theme.palette.primary.main,
                                },
                            }}
                            onClick={() => setBookmarked(!bookmarked)}
                        >
                            <BookmarkBorderIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard; 