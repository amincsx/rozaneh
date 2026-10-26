import { getPublishedEssays } from "@/lib/essays";
import FeaturedEssaySliderClient from "./FeaturedEssaySliderClient";

export default async function FeaturedEssaySlider() {
    const essays = await getPublishedEssays();

    return <FeaturedEssaySliderClient essays={essays} />;
}
