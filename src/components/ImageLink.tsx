import { Link } from "react-router";

type ImageLinkType = {
  path: string;
  text: string;
  imagePath: string;
};

export default function ImageLink({ path, text, imagePath }: ImageLinkType) {
  return (
    <Link
      to={path}
      className={`group relative flex aspect-square w-full max-w-100 items-center overflow-hidden rounded-lg border transition-transform duration-100 hover:scale-105`}
    >
      <div
        className="absolute h-full w-full scale-105 rounded-lg bg-cover bg-center blur-[1px] brightness-75 transition-all duration-300 group-hover:blur-[0px] group-hover:brightness-90"
        style={{ backgroundImage: `url(${imagePath})` }}
      ></div>

      <p className="m-2 h-[4em] w-full rounded-xl bg-black/75 p-4 font-mono text-2xl tracking-wider text-white drop-shadow-lg/50 transition-all duration-300 text-shadow-lg/100 group-hover:drop-shadow-lg/75">
        {text}
      </p>
    </Link>
  );
}
