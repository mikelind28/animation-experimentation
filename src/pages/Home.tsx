import ExperimentLink from "../components/ExperimentLink";

export default function Home() {
    return (
        <main>
            <div className="flex flex-col">
                <ExperimentLink
                    path="/falling-spheres"
                    text="Falling Spheres" 
                    imagePath=""           
                />

                <ExperimentLink
                    path="/my-proficiencies"
                    text="My Proficiencies" 
                    imagePath=""           
                />

                <ExperimentLink
                    path="/nature-slideshow"
                    text="Nature Slideshow" 
                    imagePath=""           
                />

                <ExperimentLink
                    path="/image-slider"
                    text="Image Slider" 
                    imagePath=""           
                />
            </div>
        </main>
    )
}