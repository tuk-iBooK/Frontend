import FlipBook from "../components/FlipBook";
import { useLocation } from "react-router-dom";

interface ResultPageProps {
    story_id: number;
}

export default function ResultPage() {
    const location = useLocation();
    let story = null;

    if(location.state !== undefined) {
        story = location.state as ResultPageProps;
    }

    return (
        <div className="w-screen h-screen">
            <FlipBook story_id={story?.story_id} />
        </div>
    )
}