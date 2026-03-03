import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function BouncingBall() {
    const mainRef = useRef<HTMLElement>(null);

    const [mainWidth, setMainWidth] = useState(0);

    useEffect(() => {
        const main = mainRef.current;
        if (!main) return;
        
        const observer = new ResizeObserver(() => {
            const w = main.clientWidth;
            setMainWidth(w);
        });
        
        observer.observe(main);

        return () => observer.disconnect();
    }, []);

    return (
        <main ref={mainRef} className="h-150">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={'100%'}
                height={'600px'}
            >
                <filter id='blur'>
                    <motion.feGaussianBlur 
                        initial={{ stdDeviation: 1.2 }}
                        animate={{ stdDeviation: [1.2, 3, 1.2] }}
                    />
                </filter>

                <motion.ellipse
                    rx={'50'}
                    ry={'5'}
                    cx={'50%'}
                    cy='580px'
                    className=''
                    filter={'url(#blur)'}
                    animate={{ 
                        transition: { 
                            times: [0, 0.4, 0.6, 1], 
                            duration: 1.5, 
                            ease: [0.5, 0, 0.5, 1], 
                            repeat: Infinity 
                        }, 
                        scaleX: [1.5, 0.75, 1, 0.75, 1.5],
                        scaleY: [2, 1, 0.5, 1, 2],
                        opacity: [0.1, 0.2, 0.5, 0.2, 0.1],
                    }}
                />

                <motion.circle
                    r={`${50}`}
                    cx={`${50}%`}
                    className=''
                    fill={`red`}
                    stroke={'black'}
                    initial={{ cy: '50px' }}
                    animate={{ 
                        transition: { 
                            times: [0, 0.4, 0.6, 1], 
                            duration: 1.5, 
                            ease: [0.5, 0, 0.5, 1], 
                            repeat: Infinity 
                        }, 
                        cy: ['50px', '530px', '530px', '50px'],
                        scaleY: [0.8, 1, 0.5, 1, 0.8],
                        scaleX: [1, 0.9, 1, 0.8, 1],
                        transformOrigin: 'bottom'
                    }}
                />
            </svg>

            <div className="h-20 w-full">
                <motion.p
                    key={mainWidth}
                    initial={{ x: '100%',  }}
                    animate={{ x: '-33%',  }}
                    transition={{ 
                        duration: mainWidth / 100, 
                        repeat: Infinity, 
                        ease: 'linear'
                    }}
                    className="p-2 w-full mt-10 text-lg font-stretch-120%"
                >
                    Thanks for visiting ☺︎
                </motion.p>
            </div>
        </main>
    )
}