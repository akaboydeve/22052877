import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, IconButton, CssBaseline, Avatar, Badge, useTheme, alpha } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ParticlesBackground from './ParticlesBackground';

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
    const theme = useTheme();

    return (
        <IconButton
            component={Link}
            to={to}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: { xs: 1, sm: 2 },
                color: active ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                    color: theme.palette.primary.light,
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out'
                },
                position: 'relative',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            {icon}
            <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                {label}
            </Typography>
            {active && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                    }}
                />
            )}
        </IconButton>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
            backgroundAttachment: 'fixed',
            position: 'relative',
        }}>
            <ParticlesBackground />
            <CssBaseline />
            <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: 'blur(10px)' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="div"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '12px',
                                backgroundColor: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: 'black',
                                    fontSize: '1.5rem'
                                }}
                            >
                                S
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 700,
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Social<Box component="span" sx={{ color: theme.palette.primary.main }}>Pulse</Box>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                            <Brightness4Icon />
                        </IconButton>
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                ml: 1,
                                border: `2px solid ${theme.palette.primary.main}`,
                                display: { xs: 'none', sm: 'flex' }
                            }}
                            src="https://i.pravatar.cc/150?img=68"
                        />
                    </Box>
                </Toolbar>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        py: 0.5,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                >
                    <NavItem
                        to="/"
                        icon={<PersonIcon />}
                        label="Top Users"
                        active={path === '/'}
                    />
                    <NavItem
                        to="/trending"
                        icon={<TrendingUpIcon />}
                        label="Trending"
                        active={path === '/trending'}
                    />
                    <NavItem
                        to="/feed"
                        icon={<DynamicFeedIcon />}
                        label="Feed"
                        active={path === '/feed'}
                    />
                </Box>
            </AppBar>

            <Container component="main" sx={{
                flexGrow: 1,
                py: 5,
                px: { xs: 2, sm: 4 },
                position: 'relative',
                zIndex: 2,
            }}>
                {children}
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    textAlign: 'center',
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(10px)',
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} SocialPulse — Premium Analytics
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout; 