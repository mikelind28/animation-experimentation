import { createTheme, Slider, Stack, ThemeProvider } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";

type SphereType = {
    index?: number;
    radius: number;
    xCoor: number;
    opacity: number;
    delay: number;
    duration: number;
    hue: number;
}

function Sphere({ radius, xCoor, opacity, delay, duration, hue }: SphereType) {
    let blur = 2;
    // if the sphere gets a small radius with too large of blur, the blur appears clipped on the edges.
    // this ensures that only large spheres get larger blurs.
    // if radius < 40, blur = 1...3
    // else if radius < 60, blur = 1...4
    // else if radius < 80, blur = 2...7
    // else blur = 3...12
    switch (true) {
        case radius < 40: {
            blur = Math.floor((Math.random() * 2) + 1);
            break;
        }
        case radius < 60: {
            blur = Math.floor((Math.random() * 3) + 1);
            break;
        }
        case radius < 80: {
            blur = Math.floor((Math.random() * 5) + 2);
            break;
        }
        case radius < 100: {
            blur = Math.floor((Math.random() * 9) + 3);
            break;
        }
        default: {
            blur = Math.floor((Math.random() * 2) + 1);
        }
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={'100%'}
            height={'100%'}
        >
            <filter id='blur'>
                <feGaussianBlur stdDeviation={blur} />
            </filter>

            <motion.circle
                r={`${radius}`}
                cx={`${xCoor}%`}
                className={``}
                filter={'url(#blur)'}
                fill={`hsl(${hue} 100% 60%)`}
                fillOpacity={`${opacity}%`}
                initial={{ cy: '-20%' }}
                animate={{ cy: '120%' }}
                transition={{ delay: delay, type: 'tween', duration: duration, ease: [0.5, 0, 1, 1], repeat: Infinity }}
                // style={{ fill: `oklch(80.9% 0.105 251.813)` }}
            />
        </svg>
    )
}

const theme = createTheme({
  components: {
    // Name of the component
    MuiSlider: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: 'linear-gradient(90deg in hsl longer hue, red, red)'
        },
      },
    },
  },
});

export default function FallingSpheres() {
    const [numberOfSpheres, setNumberOfSpheres] = useState(20);
    const [hue, setHue] = useState(200);
    
    function getRandomRadius() {
        const minRadius = 20;
        const maxRadius = 100;
        const randomRadius = Math.floor(Math.random() * (maxRadius - minRadius) + minRadius);
        return randomRadius;
    }

    function getRandomXCoor() {
        return Math.random() * 100;
    }

    function getRandomOpacity() {
        return Math.floor((Math.random() * 95) + 10);
    }

    function getRandomDelay() {
        return Math.random() * 10;
    }

    function getRandomDuration() {
        const minDuration = 5;
        const maxDuration = 7;
        const randomDuration = (Math.random() * (maxDuration - minDuration) + minDuration);
        return randomDuration;
    }
    
    return (
        <main
            className="h-dvh w-dvw"
        >
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                <p>Fewer Spheres</p>
                <Slider 
                    aria-label="sphere count" 
                    step={1}
                    min={5}
                    max={35}
                    value={numberOfSpheres} 
                    onChange={(_, value) => setNumberOfSpheres(value)} 
                />
                <p>More Spheres</p>
            </Stack>

            <ThemeProvider theme={theme}>
                <Slider 
                    aria-label="sphere hue" 
                    step={1}
                    min={0}
                    max={360}
                    value={hue} 
                    onChange={(_, value) => setHue(value)} 
                />
            </ThemeProvider>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'100%'}
            >
                {Array.from({ length: numberOfSpheres }).map((_, i) => {
                    return (
                        <Sphere 
                            key={i}
                            index={i}
                            radius={getRandomRadius()}
                            xCoor={getRandomXCoor()} 
                            opacity={getRandomOpacity()}
                            delay={getRandomDelay()}
                            duration={getRandomDuration()}
                            hue={hue}
                        />
                    )
                })}
            </svg>
        </main>
    )
}