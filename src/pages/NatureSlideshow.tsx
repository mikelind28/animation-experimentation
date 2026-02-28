import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type NatureImageType = {
    src: string;
    label: string;
}

function NatureImage({ src, label }: NatureImageType) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["center end", "center start"]
    });

    const { transform, filter } = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        {
            transform: ["scale(1.1)", "scale(1)", "scale(1.1)"],
            filter: [ "blur(10px) brightness(0.2)", "blur(0px) brightness(1)", "blur(10px) brightness(0.2)"]
        }
    )

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0, 1, 1, 0]
    )

    const scale = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        [2, 1, 1]
    )

    const stretch = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        ['0.7rem', '0rem', '0rem']
    )

    return (
        <div className="relative flex justify-center items-center overflow-clip">
            <motion.img
                ref={ref}
                src={src}
                alt={label}
                style={{ transform, filter }}
                className="min-h-150 min-w-dvw object-cover object-left"
            />

            <motion.p 
                className="zalando-sans-expanded absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white"
                style={{ opacity: opacity, scale: scale, letterSpacing: stretch }}
            >
                {label}
            </motion.p>
        </div>
    )
}

export default function NatureSlideshow() {
    return (
        <main className="pb-40 flex flex-col items-center">
            <NatureImage src="clouds.webp" label="CLOUDS" />
            <NatureImage src="desert.webp" label="DESERT" />
            <NatureImage src="earth.webp" label="EARTH" />
            <NatureImage src="mountain.webp" label="MOUNTAIN" />
            <NatureImage src="prairie.webp" label="PRAIRIE" />
            <NatureImage src="guy.webp" label="THIS GUY" />
            <NatureImage src="rainforest.webp" label="RAINFOREST" />
            <NatureImage src="storm.webp" label="STORM" />
            <NatureImage src="village.webp" label="VILLAGE" />
            <NatureImage src="waterfall.webp" label="WATERFALL" />

            <button 
                onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-8 px-5 py-2 rounded-3xl text-lg bg-white drop-shadow-md/25 cursor-pointer"
            >
                Back to top
            </button>
        </main>
    )
}