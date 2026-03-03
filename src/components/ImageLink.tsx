import { Link } from "react-router"

type ImageLinkType = {
    path: string; 
    text: string;
    imagePath: string;
}

export default function ImageLink({ path, text, imagePath }: ImageLinkType) {
  return (
    <Link
      to={path}
      className={`group relative flex items-center w-full max-w-100 aspect-square border rounded-lg hover:scale-105 transition-transform duration-100 overflow-hidden`}
    >
      <div
        className="absolute w-full h-full bg-cover bg-center rounded-lg brightness-75 group-hover:brightness-90 transition-all duration-300 blur-[1px] scale-105 group-hover:blur-[0px]"
        style={{ backgroundImage: `url(${imagePath})`}}
      ></div>

      <p className="w-full h-[4em] p-4 m-2 font-mono text-white text-2xl text-shadow-lg/100 bg-black/75 rounded-xl drop-shadow-lg/50 group-hover:drop-shadow-lg/75 transition-all duration-300">
        {text}
      </p>
    </Link>
  )
}