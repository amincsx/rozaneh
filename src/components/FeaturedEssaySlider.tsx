import { getLatestPublishedEssays } from "@/lib/essays";
import FeaturedEssaySliderClient from "./FeaturedEssaySliderClient";

export default async function FeaturedEssaySlider() {
    const essays = await getLatestPublishedEssays(5);

    return <FeaturedEssaySliderClient essays={essays} />;
}
