import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

const proficiencies: string[] = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'PostgreSQL', 'Node.js', 'Express.js', 'Git']

const proficiencyRowsShifted = Array.from({ length: 15 }, (_, i) => {
    const offset = i % proficiencies.length;
    return [...proficiencies.slice(offset), ...proficiencies.slice(0, offset)];
});

function Row({ row, invert }: { row: string[], invert: boolean }) {
    const { scrollY } = useScroll();
    const invertScroll = useTransform(() => scrollY.get() * -1);
    
    return (
        <motion.p 
            className={`
                font-bold italic h-fit py-4 px-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-nowrap overflow-x-hidden
                ${invert ? 'self-start bg-black text-white -translate-x-8' : 'self-end bg-white text-black'}
            `}
            style={{ translateX: invert ? invertScroll : scrollY, translateY: scrollY }}
        >
            {row.concat(row).concat(row).join(` / `)}
        </motion.p>
    )
}

export default function MyProficiencies() {
    const { scrollY } = useScroll();
    const [scrollStarted, setScrollStarted] = useState(false);

    useMotionValueEvent(scrollY, "change", () => {
        setScrollStarted(true);
    });

    return (
        <main className="w-dvw h-[350dvh] flex flex-col items-center overflow-y-hidden">
            {proficiencyRowsShifted.map((row, i) => {
                return (
                    <Row 
                        key={i}
                        row={row}
                        invert={i % 2 === 0} 
                    />
                )
            })}

            <AnimatePresence>
                {!scrollStarted && 
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }} 
                        className="px-5 py-2 md:px-6 md:py-3 lg:px-7 lg:py-4 rounded-3xl fixed bottom-8 flex gap-2 text-xl md:text-3xl lg:text-4xl items-center justify-center bg-white drop-shadow-md/25 animate-bounce"
                    >
                        Scroll! <FaArrowDownLong />
                    </motion.div>
                }
            </AnimatePresence>
        </main>
    );
}