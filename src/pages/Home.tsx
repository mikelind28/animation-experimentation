import ImageLink from "../components/ImageLink";

export default function Home() {
    return (
        <main className="p-4">
            <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 xs:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ImageLink
                    path="/falling-spheres"
                    text="Falling Spheres" 
                    imagePath="falling-spheres.gif"           
                />

                <ImageLink
                    path="/my-proficiencies"
                    text="My Proficiencies" 
                    imagePath="my-proficiencies.gif"           
                />

                <ImageLink
                    path="/nature-slideshow"
                    text="Nature Slideshow" 
                    imagePath="nature-slideshow.gif"           
                />

                <ImageLink
                    path="/image-sliders"
                    text="Image Sliders" 
                    imagePath="image-sliders.gif"           
                />

                <ImageLink
                    path="/bouncing-ball"
                    text="Bouncing Ball" 
                    imagePath="bouncing-ball.gif"           
                />
            </div>
        </main>
    )
}