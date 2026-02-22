import ImageSrcWrapper from "@/components/custom/imageSrcWrapper";
import {HoverTranslation} from "@/components/hover-translation";
import {ImageCycle} from "@/components/image-cycle";
import {TextBox} from "@/components/text-box";
import {link} from "fs";
import Image from "next/image";

const imagePairs = [
    {
        image: '/tui.jpg',
        text: 'Tūī',
        link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/tūī/',
        credit: "Photo by Owen Hart",
        audio: '/audio/tui.mp3'
    },
    {
        image: '/kaka.avif',
        text: 'Kākā',
        link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/north-island-kākā/',
        credit: "Photo by Scott Langdale",
        audio: '/audio/kaka.mp3'
    },
    {
        image: '/karearea.avif',
        text: 'Kārearea',
        link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/new-zealand-falcon/',
        credit: "Photo by Ian Thomas",
        audio: '/audio/karearea.mp3'
    },
    // { image: '/takahe.avif', text: 'Takahē', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/takahē/', audio: '/audio/takahe.mp3' },
    // { image: '/kiwi.avif', text: 'Kiwi pukupuku', link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/little-spotted-kiwi/', audio: '/audio/kiwi.mp3' },
    {
        image: '/kakariki.avif',
        text: 'Kākāriki',
        link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/kākāriki/',
        credit: "Photo by Lynn Freeman",
        audio: '/audio/kakariki.mp3'
    },
]
export default function Home() {
    return (
        <div className="overflow-hidden h-full">
            <main
                className="w-full bg-takahe-10 flex-col h-full z-20"
                style={{backgroundImage: "url('/pattern_tile.png')", backgroundSize: '12% 24%'}}
            >
                <div className="flex flex-wrap lg:flex-nowrap w-full">
                    <TextBox type="browns" className="w-full bg-takahe-10 text-left m-0">
                        <div className="m-auto"><h1 className="text-4xl text-left">Explore Te Kaiwharawhara</h1>
                            <p className="text-left">This dashboard for Kia Mouriora Te Kaiwharawhara dashboard is designed
                                to display data and information about Te Kaiwharawhara. Navigate through information
                                using the navigation bar and learn about the history, health, and conservation
                                efforts of the <HoverTranslation text="whaitua"/>. This dashboard was created by a group of
                                university
                                students from Worcester Polytechnic Institute.</p></div>
                    </TextBox>
                    <ImageCycle pairs={imagePairs} header="Birds in the Catchment"
                                className="w-full lg:w-2/3 m-0 p-0 h-full"></ImageCycle>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap w-full">
                    <TextBox type="browns" secondaryText="What is a catchment?" className="w-full m-0 text-left">
                        <div className="m-auto"><p>A whaitua or catchment describes a geographical area
                            where water collects, bounded by mountains or positioned
                            in a valley. Whaitua provide biodiverse ecosystems for
                            species to thrive.
                            <br/><br/>
                            Te whaitua o Te Kaiwharawhara is the largest in Wellington City
                            and the only one with a semi-natural estuary connected to
                            Wellington Harbour. It's an important place for Taranaki Whānui
                            ki Te Upoko o Te Ika, who are <HoverTranslation text="mana whenua"/>. Taranaki Whānui has
                            a strong cultural and historical connection to Te Kaiwharawhara.
                        </p></div>
                    </TextBox>
                    <ImageSrcWrapper overlayText="Photo by Scott Langdale" overlayClassName="m-0 p-0"
                                     wrapperClassName="w-full lg:w-2/3">
                        <img src="/arial_catchment.avif" alt="Arial view of the catchment"
                             className="h-full w-full object-cover object-center block"/>
                    </ImageSrcWrapper>
                </div>
            </main>
        </div>
    );
}
