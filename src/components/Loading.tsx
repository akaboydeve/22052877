import React from 'react';
import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                py: 6,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glowing particles */}
            {[...Array(6)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        width: ((i % 3) + 1) * 12,
                        height: ((i % 3) + 1) * 12,
                        borderRadius: '50%',
                        background: i % 2 === 0
                            ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`
                            : `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
                        filter: 'blur(4px)',
                        animation: `floatingParticle${i + 1} ${3 + i * 0.5}s infinite ease-in-out`,
                        [`@keyframes floatingParticle${i + 1}`]: {
                            '0%': {
                                transform: `translate(${-100 + i * 50}px, ${-50 + i * 20}px) scale(1)`,
                                opacity: 0.2 + (i % 5) * 0.1,
                            },
                            '50%': {
                                transform: `translate(${-50 + i * 40}px, ${50 - i * 15}px) scale(${1.2 + (i % 3) * 0.2})`,
                                opacity: 0.5 + (i % 5) * 0.1,
                            },
                            '100%': {
                                transform: `translate(${-100 + i * 50}px, ${-50 + i * 20}px) scale(1)`,
                                opacity: 0.2 + (i % 5) * 0.1,
                            },
                        },
                    }}
                />
            ))}

            {/* Premium pulse animation - outer ring */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    animation: 'pulseRing 2s infinite',
                    '@keyframes pulseRing': {
                        '0%': {
                            transform: 'scale(0.7)',
                            opacity: 0.3,
                        },
                        '50%': {
                            transform: 'scale(1)',
                            opacity: 0.5,
                        },
                        '100%': {
                            transform: 'scale(0.7)',
                            opacity: 0.3,
                        },
                    },
                }}
            />

            {/* Premium pulse animation - middle ring */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    border: `3px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    animation: 'pulseRing2 3s infinite',
                    '@keyframes pulseRing2': {
                        '0%': {
                            transform: 'scale(0.8) rotate(0deg)',
                            opacity: 0.3,
                        },
                        '50%': {
                            transform: 'scale(1.1) rotate(180deg)',
                            opacity: 0.6,
                        },
                        '100%': {
                            transform: 'scale(0.8) rotate(360deg)',
                            opacity: 0.3,
                        },
                    },
                }}
            />

            {/* Glow effect */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': {
                            transform: 'scale(0.95)',
                            opacity: 0.5,
                        },
                        '50%': {
                            transform: 'scale(1.05)',
                            opacity: 0.8,
                        },
                        '100%': {
                            transform: 'scale(0.95)',
                            opacity: 0.5,
                        },
                    },
                }}
            />

            {/* Premium spinning progress */}
            <CircularProgress
                size={80}
                thickness={4}
                sx={{
                    color: theme.palette.primary.main,
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    },
                    filter: `drop-shadow(0 0 10px ${alpha(theme.palette.primary.main, 0.5)})`,
                    animation: 'glowPulse 2s infinite ease-in-out',
                    '@keyframes glowPulse': {
                        '0%': { filter: `drop-shadow(0 0 5px ${alpha(theme.palette.primary.main, 0.3)})` },
                        '50%': { filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.main, 0.7)})` },
                        '100%': { filter: `drop-shadow(0 0 5px ${alpha(theme.palette.primary.main, 0.3)})` },
                    },
                }}
            />

            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    mt: 4,
                    fontWeight: 500,
                    letterSpacing: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientText 3s linear infinite, fadeInOut 1.5s infinite',
                    '@keyframes gradientText': {
                        '0%': { backgroundPosition: '0% center' },
                        '100%': { backgroundPosition: '200% center' },
                    },
                    '@keyframes fadeInOut': {
                        '0%': { opacity: 0.7 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.7 },
                    },
                }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default Loading; 