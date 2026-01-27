import { HoverTranslation } from "@/components/hover-translation";
import { ImageCycle } from "@/components/image-cycle";
import { TextBox } from "@/components/text-box";
import Image from "next/image";

const imagePairs = [
  { image: '/tui.jpg', text: 'Tui in the Catchment' },
  { image: '/arial_catchment.jpg', text: 'Aerial View of the Catchment' },
]
export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen bg-center bg-cover" style={{ backgroundImage: "url('/arial_catchment.avif')" }}>
      <main className="min-h-screen w-full  flex">
        <div className="w-1/3">
          <TextBox text="The Kia Mouriora te Kaiwharawhara dashboard is designed to display ecological data about Te Kaiwharawhara. Navigate through information using the navigation bar and learn about the history, health, and conservation efforts of the region." />
          <ImageCycle pairs={imagePairs} header="Birds in the Catchment" header_url="https://www.visitzealandia.com/learn/nature-and-wildlife/"></ImageCycle>
          <HoverTranslation text="Mouri"/>
        </div>
        <div className="w-2/3">

        </div>
      </main>
    </div>
  );
}
