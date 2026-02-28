import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx';
import FallingSpheres from './pages/FallingSpheres.tsx';
import MyProficiencies from './pages/MyProficiencies.tsx';
import NatureSlideshow from './pages/NatureSlideshow.tsx';
import ImageSliders from './pages/ImageSliders.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/falling-spheres',
        Component: FallingSpheres,
      },
      {
        path: '/my-proficiencies',
        Component: MyProficiencies,
      },
      {
        path: '/nature-slideshow',
        Component: NatureSlideshow,
      },
      {
        path: '/image-sliders',
        Component: ImageSliders,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
