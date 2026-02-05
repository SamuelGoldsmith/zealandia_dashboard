import { ImageCycle } from "@/components/image-cycle";
import { TextBox } from "@/components/text-box";
import { link } from "fs";
import Image from "next/image";

const imagePairs = [
  { image: '/tui.jpg', text: 'Tūī', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/tūī/', audio: '/audio/tui.mp3' },
  { image: '/kaka.avif', text: 'Kākā', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/north-island-kākā/', audio: '/audio/kaka.mp3' },
  { image: '/karearea.avif', text: 'Kārearea', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/new-zealand-falcon/', audio: '/audio/karearea.mp3' },
  // { image: '/takahe.avif', text: 'Takahē', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/takahē/', audio: '/audio/takahe.mp3' },
  // { image: '/kiwi.avif', text: 'Kiwi pukupuku', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/little-spotted-kiwi/', audio: '/audio/kiwi.mp3' },
  { image: '/kakariki.avif', text: 'Kākāriki', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/kākāriki/', audio: '/audio/kakariki.mp3' },
]
export default function Home() {
  return (
    <div className="overflow-hidden h-full">
      <main className="w-full lg:flex md:flex h-full bg-center bg-cover" style={{ backgroundImage: "url('/stream.avif')", backgroundSize: '100% 100%' }}>
        <div className="lg:w-1/3 md:w-1/3 sm:w-full">
          <TextBox text="The Kia Mouriora Te Kaiwharawhara dashboard is designed to display ecological data about Te Kaiwharawhara. Navigate through information using the navigation bar and learn about the history, health, and conservation efforts of the region."/>
          <ImageCycle pairs={imagePairs} header="Birds in the Catchment"></ImageCycle>
        </div>
        <div className="w-2/3">

        </div>
      </main>
    </div>
  );
}
