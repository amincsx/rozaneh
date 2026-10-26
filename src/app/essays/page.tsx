import EssayList from "./EssayList";
import { getPublishedEssays } from "@/lib/essays";

export const dynamic = "force-dynamic";

export default async function EssaysPage() {
    const essays = await getPublishedEssays();

    return <EssayList essays={essays} />;
}
