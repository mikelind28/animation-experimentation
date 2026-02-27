import { Link, useLocation } from "react-router";
import { IoHomeOutline } from "react-icons/io5";

export default function Header() {
    const location = useLocation();
    console.log('location', location);

    let currentPage = '';

    switch (location.pathname) {
        case '/falling-spheres':
            currentPage = 'Falling Spheres';
            break;
        case '/my-proficiencies':
            currentPage = 'My Proficiencies';
            break;
        case '/nature-slideshow':
            currentPage = 'Nature Slideshow';
            break;
        default:
            break;
    }
    
    return (
        <header className="sticky top-0 bg-white w-full flex items-center gap-4 p-2">
            <Link to='/' className="ml-2 p-2 text-2xl border border-black rounded-md">
                <IoHomeOutline />
            </Link>

            <div>
                <h1 className="text-xl text-center">
                    Animation Experimentation
                </h1>

                { currentPage && 
                    <h2>{currentPage}</h2>
                }
            </div>
        </header>
    )
}