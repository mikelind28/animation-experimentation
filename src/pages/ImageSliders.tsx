import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

type ImageType = {
    filterType: string;
    h1: string;
}

function Image({ filterType, h1 }: ImageType) {
    const constraintsRef = useRef<HTMLImageElement>(null);

    const sliderX = useMotionValue(0);

    useEffect(() => {
        if (constraintsRef.current) {
            sliderX.set(constraintsRef.current.width / 2)
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1
                className="text-xl font-serif mb-1"
            >
                {h1}
            </h1>

            <div className="relative flex flex-col items-center w-full max-w-200">
                <img
                    ref={constraintsRef}
                    src="village.webp"
                    className="w-full"
                />

                <motion.div
                    className="absolute top-0 left-0 h-full pointer-events-none"
                    style={{ backdropFilter: filterType, width: sliderX }}
                >
                </motion.div>

                <motion.div 
                    drag='x'
                    dragMomentum={false} 
                    dragConstraints={constraintsRef}
                    dragElastic={0.1}
                    style={{ x: sliderX }}
                    className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-10 w-3 text-neutral-400 font-extralight flex items-center justify-center bg-white rounded-md border border-neutral-500 drop-shadow-xs/50 cursor-grab active:cursor-grabbing"
                >||</motion.div>
            </div>
        </div>
    );
}

export default function ImageSliders() {
    return (
        <main className="flex flex-col gap-4 items-center p-4 mb-8">
            <Image
                filterType="grayscale()" 
                h1={"Grayscale"}            
            />

            <Image
                filterType="sepia(100%)" 
                h1={"Sepia"}            
            />

            <Image
                filterType="hue-rotate(90deg)" 
                h1={"Hue-Rotate"}            
            />

            <Image
                filterType="invert()" 
                h1={"Invert"}            
            />

            <Image
                filterType="blur(10px)" 
                h1={"Blur"}            
            />

            <Image
                filterType="saturate(300%)" 
                h1={"Saturate"}            
            />

            <Image
                filterType="contrast(50%)" 
                h1={"Contrast"}            
            />

            <Image
                filterType="brightness(33%)" 
                h1={"Brightness"}            
            />
        </main>
    )
}