import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { useTheme, alpha } from '@mui/material';

const ParticlesBackground: React.FC = () => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        onHover: {
                            enable: true,
                            mode: 'repulse',
                            parallax: {
                                enable: true,
                                force: 20,
                                smooth: 10,
                            },
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 150,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: [primaryColor, secondaryColor, '#885aad', '#4acad9'],
                    },
                    links: {
                        color: {
                            value: alpha(primaryColor, 0.2),
                        },
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: true,
                        speed: 1,
                        straight: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 60,
                    },
                    opacity: {
                        animation: {
                            enable: true,
                            speed: 0.5,
                            minimumValue: 0.1,
                        },
                        value: { min: 0.1, max: 0.4 },
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 4 },
                        animation: {
                            enable: true,
                            speed: 2,
                            minimumValue: 0.1,
                        },
                    },
                    shadow: {
                        blur: 5,
                        color: {
                            value: alpha(primaryColor, 0.2),
                        },
                        enable: true,
                    },
                    twinkle: {
                        lines: {
                            enable: true,
                            frequency: 0.005,
                            opacity: 0.5,
                            color: {
                                value: secondaryColor,
                            },
                        },
                        particles: {
                            enable: true,
                            frequency: 0.05,
                            opacity: 0.5,
                            color: {
                                value: primaryColor,
                            },
                        },
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ParticlesBackground; 