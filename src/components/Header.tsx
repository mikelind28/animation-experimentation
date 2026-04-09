import { Link, useLocation } from "react-router";
import { IoHomeOutline } from "react-icons/io5";

export default function Header() {
  const location = useLocation();

  let currentPage = "";

  switch (location.pathname) {
    case "/falling-spheres":
      currentPage = "Falling Spheres";
      break;
    case "/my-proficiencies":
      currentPage = "My Proficiencies";
      break;
    case "/nature-slideshow":
      currentPage = "Nature Slideshow";
      break;
    case "/image-sliders":
      currentPage = "Image Sliders";
      break;
    case "/bouncing-ball":
      currentPage = "Bouncing Ball";
      break;
    case "/":
      currentPage = "Home";
      break;
    default:
      break;
  }

  return (
    <header className="sticky top-0 z-100 flex w-full items-center bg-white p-2 font-mono">
      {currentPage !== "Home" && (
        <Link
          to="/"
          className="ml-2 rounded-md border border-black bg-white text-2xl"
        >
          <IoHomeOutline className="m-2" />
        </Link>
      )}

      <div className="pl-4">
        <h1 className="text-center text-xl">Animation Experimentation</h1>

        {currentPage && <h2>{currentPage}</h2>}
      </div>
    </header>
  );
}
