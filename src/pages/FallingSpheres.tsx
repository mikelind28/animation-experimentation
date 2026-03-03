import { createTheme, Slider, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";
import { FaMoon } from 'react-icons/fa';
import { FiSun } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";


type SphereConfig = {
    radius: number;
    xCoor: number;
    opacity: number;
    delay: number;
    duration: number;
    blur: number;
}

type SphereProps = SphereConfig & { hue: number };

// helper functions:

function getRandomRadius() {
    return Math.floor(Math.random() * 80 + 20);
}

function getRandomXCoor() {
    return Math.random() * 100;
}

function getRandomOpacity() {
    return Math.floor(Math.random() * 95 + 10);
}

function getRandomDelay() {
    return Math.random() * 10;
}

function getRandomDuration() {
    return Math.random() * 2 + 5;
}

// if the blur is too big on a sphere with a small radius, its edges get clipped.
// use smaller blurs for smaller spheres.
function getRandomBlur(radius: number): number {
    if (radius < 40) return Math.floor(Math.random() * 2 + 1);
    if (radius < 60)  return Math.floor(Math.random() * 3 + 1);
    if (radius < 80)  return Math.floor(Math.random() * 5 + 2);
    if (radius < 100) return Math.floor(Math.random() * 9 + 3);
    return Math.floor(Math.random() * 2 + 1);
}

function createSphereConfig(): SphereConfig {
    const radius = getRandomRadius();
    return {
        radius,
        xCoor: getRandomXCoor(),
        opacity: getRandomOpacity(),
        delay: getRandomDelay(),
        duration: getRandomDuration(),
        blur: getRandomBlur(radius),
    };
}

const Sphere = memo(function Sphere({ radius, xCoor, opacity, delay, duration, blur, hue }: SphereProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width='100%'
            height='100%'
        >
            <filter id={`blur-${radius}-${xCoor}`}>
                <feGaussianBlur stdDeviation={blur} />
            </filter>

            <motion.circle
                r={`${radius}`}
                cx={`${xCoor}%`}
                filter={`url(#blur-${radius}-${xCoor})`}
                fill={`hsl(${hue} 100% 60%)`}
                fillOpacity={`${opacity}%`}
                initial={{ cy: '-20%' }}
                animate={{ cy: '120%' }}
                transition={{ delay: delay, type: 'tween', duration: duration, ease: [0.5, 0, 1, 1], repeat: Infinity }}
            />
        </svg>
    );
});

// slider styles

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
});

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
    const [hue, setHue] = useState(50);
    const [darkModeOn, setDarkModeOn] = useState(true);
    const [optionsOpen, setOptionsOpen] = useState(false);

    const configsRef = useRef<SphereConfig[]>([]);

    if (configsRef.current.length === 0) {
        // create an array of <Sphere />s using the createSphereConfig function
        configsRef.current = Array.from({ length: numberOfSpheres }, createSphereConfig);
    }

    useEffect(() => {
        const configs = configsRef.current;
        if (numberOfSpheres > configs.length) {
            // add new entries
            for (let i = configs.length; i < numberOfSpheres; i++) {
                configs.push(createSphereConfig());
            }
        } else if (numberOfSpheres < configs.length) {
            // drop entries
            configs.splice(numberOfSpheres);
        }
    }, [numberOfSpheres]);
    
    return (
        <main
            className="h-dvh w-dvw"
            style={{ backgroundColor: darkModeOn ? 'black' : 'white' }}
        >
            <motion.div 
                initial={{ width: '72px', height: '72px', borderRadius: '100%' }}
                animate={
                    optionsOpen 
                        ? { width: '320px', height: '300px', borderRadius: '8px'} 
                        : { width: '72px', height: '72px', borderRadius: '100%' }
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
                                            value='darkMode'
                                            onClick={() => setDarkModeOn(false)}
                                            selected={!darkModeOn}
                                            aria-label="light-mode"
                                        >
                                            <FiSun className={'text-black'} />
                                        </ToggleButton>

                                        <ToggleButton 
                                            value='lightMode'
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
                {configsRef.current.map((config, index) => (
                    <Sphere key={index} {...config} hue={hue} />
                ))}
            </svg>
        </main>
    )
}