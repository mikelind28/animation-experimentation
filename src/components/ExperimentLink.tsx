import { Link } from "react-router"

type ExperimentLinkType = {
    path: string; 
    text: string;
    imagePath: string;
}

export default function ExperimentLink({ path, text, imagePath }: ExperimentLinkType) {
  return (
    <Link
      to={path}
      className=""
    >
        {text}
    </Link>
  )
}