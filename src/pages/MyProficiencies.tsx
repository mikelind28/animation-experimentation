import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

const proficiencies: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "PostgreSQL",
  "Node.js",
  "Express.js",
  "Git",
];

const proficiencyRowsShifted = Array.from({ length: 15 }, (_, i) => {
  const offset = i % proficiencies.length;
  return [...proficiencies.slice(offset), ...proficiencies.slice(0, offset)];
});

function Row({ row, invert }: { row: string[]; invert: boolean }) {
  const { scrollY } = useScroll();
  const invertScroll = useTransform(() => scrollY.get() * -1);

  return (
    <motion.p
      className={`h-fit overflow-x-hidden px-8 py-4 text-4xl font-bold text-nowrap italic sm:text-5xl md:text-6xl lg:text-7xl ${invert ? "-translate-x-8 self-start bg-black text-white" : "self-end bg-white text-black"} `}
      style={{
        translateX: invert ? invertScroll : scrollY,
        translateY: scrollY,
      }}
    >
      {row.concat(row).concat(row).join(` / `)}
    </motion.p>
  );
}

export default function MyProficiencies() {
  const { scrollY } = useScroll();
  const [scrollStarted, setScrollStarted] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    setScrollStarted(true);
  });

  return (
    <main className="flex h-[350dvh] w-dvw flex-col items-center overflow-x-hidden">
      {proficiencyRowsShifted.map((row, i) => {
        return <Row key={i} row={row} invert={i % 2 === 0} />;
      })}

      <AnimatePresence>
        {!scrollStarted && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed bottom-8 flex animate-bounce items-center justify-center gap-2 rounded-3xl bg-white px-5 py-2 text-xl drop-shadow-md/25 md:px-6 md:py-3 md:text-3xl lg:px-7 lg:py-4 lg:text-4xl"
          >
            Scroll! <FaArrowDownLong />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
