import ImageLink from "../components/ImageLink";

export default function Home() {
  return (
    <main className="p-4">
      <div className="grid grid-cols-1 gap-6 min-[35rem]:grid-cols-2 min-[35rem]:gap-4 min-[52rem]:grid-cols-3 min-[68rem]:grid-cols-4 min-[86rem]:grid-cols-5">
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
          path="/color-wheels"
          text="Color Wheels"
          imagePath="color-wheels.gif"
        />

        <ImageLink
          path="/bouncing-ball"
          text="Bouncing Ball"
          imagePath="bouncing-ball.gif"
        />
      </div>
    </main>
  );
}
