import { createTheme, Slider, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaMoon } from 'react-icons/fa';
import { FiSun } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";


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

const CustomSlider = styled(Slider)({
    color: 'rgba(120, 120, 120, 0.5)',
    height: 12,
    width: '95%',
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'white',
        border: '1px solid black',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
})

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
            background: 'linear-gradient(90deg in hsl longer hue, red, red)',
            padding: '2px',
            width: '94%',
        },
      },
    },
  },
});

const RainbowSlider = styled(Slider)({
    color: 'rgba(0, 0, 0, 0.0)',
    height: 6,
    '& .MuiSlider-rail': {
        opacity: 0
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'white',
        border: '1px solid black',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
})

export default function FallingSpheres() {
    const [numberOfSpheres, setNumberOfSpheres] = useState(20);
    const [hue, setHue] = useState(200);
    const [darkModeOn, setDarkModeOn] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);
    
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
            style={{ backgroundColor: darkModeOn ? 'black' : 'white' }}
        >
            <motion.div 
                initial={{ width: '72px', height: '72px', borderRadius: '100% 100% 100% 100%' }}
                animate={
                    optionsOpen 
                    ? { width: '320px', height: '300px', borderRadius: '8px 8px 8px 8px'} 
                    : { width: '72px', height: '72px', borderRadius: '100% 100% 100% 100%' }
                }
                transition={{ duration: 0.4 }}
                className={`
                    fixed bottom-4 right-4 bg-white drop-shadow-md/25
                    ${optionsOpen ? 'p-4' : 'flex items-center justify-center'} 
                `}
            >
                <AnimatePresence >
                    { optionsOpen
                        ?
                            <motion.div
                                key="options"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                                exit={{ opacity: 0, transition: { duration: 0 }}}
                            >
                                <p>Number of spheres</p>
                                <CustomSlider 
                                    aria-label="sphere count" 
                                    step={1}
                                    min={5}
                                    max={35}
                                    value={numberOfSpheres} 
                                    onChange={(_, value) => setNumberOfSpheres(value as number)} 
                                />

                                <p>Color</p>
                                <ThemeProvider theme={theme}>
                                    <RainbowSlider 
                                        aria-label="sphere hue" 
                                        step={1}
                                        min={0}
                                        max={360}
                                        value={hue} 
                                        onChange={(_, value) => setHue(value as number)} 
                                    />
                                </ThemeProvider>

                                <div className="flex flex-col gap-2 mt-4">
                                    <p>Dark / Light background</p>
                                    <ToggleButtonGroup size="large" className="">
                                        <ToggleButton 
                                            value={'darkMode'}
                                            onClick={() => setDarkModeOn(false)}
                                            selected={!darkModeOn}
                                            aria-label="light-mode"
                                        >
                                            <FiSun className={'text-black'} />
                                        </ToggleButton>

                                        <ToggleButton 
                                            value={'lightMode'}
                                            onClick={() => setDarkModeOn(true)}
                                            selected={darkModeOn}
                                            aria-label="dark-mode"
                                        >
                                            <FaMoon className={'text-black'} />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>

                                <button onClick={() => setOptionsOpen(false)}>
                                    <IoCloseOutline
                                        className="absolute right-2 bottom-1 size-12 text-neutral-700"
                                    />
                                </button>
                            </motion.div>
                        :
                            <motion.button
                                key="info"
                                onClick={() => setOptionsOpen(true)}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CiCircleInfo 
                                    className="size-12 text-neutral-600" 
                                />
                            </motion.button>
                    }
                </AnimatePresence>
            </motion.div>

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