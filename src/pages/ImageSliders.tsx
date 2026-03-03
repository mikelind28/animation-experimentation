import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ImageSliderType = {
    filterType: string;
    h1: string;
}

function ImageSlider({ filterType, h1 }: ImageSliderType) {
    const imgRef = useRef<HTMLImageElement>(null);
    const sliderX = useMotionValue(0);
    const [imageWidth, setImageWidth] = useState(0);

    useEffect(() => {
        const img = imgRef.current;

        if (!img) return;
        
        const observer = new ResizeObserver(() => {
            const w = img.clientWidth;
            setImageWidth(w);
            sliderX.set(Math.min(Math.max(sliderX.get(), 0,), w));
        });
        
        observer.observe(img);

        sliderX.set(img.clientWidth / 2);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-serif mb-1">{h1}</h1>

            <div className="relative flex justify-center items-center w-full max-w-200">
                <img
                    ref={imgRef}
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
                    dragConstraints={{ left: 0, right: imageWidth }}
                    dragElastic={0}
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
            <ImageSlider
                filterType="hue-rotate(90deg)" 
                h1={"Hue-Rotate"}            
            />

            <ImageSlider
                filterType="invert()" 
                h1={"Invert"}            
            />

            <ImageSlider
                filterType="blur(10px)" 
                h1={"Blur"}            
            />

            <ImageSlider
                filterType="saturate(300%)" 
                h1={"Saturate"}            
            />

            <ImageSlider
                filterType="grayscale()" 
                h1={"Grayscale"}            
            />

            <ImageSlider
                filterType="sepia(100%)" 
                h1={"Sepia"}            
            />

            <ImageSlider
                filterType="contrast(50%)" 
                h1={"Contrast"}            
            />

            <ImageSlider
                filterType="brightness(33%)" 
                h1={"Brightness"}            
            />
        </main>
    )
}