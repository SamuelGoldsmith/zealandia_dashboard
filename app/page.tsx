import ImageSrcWrapper from "@/components/custom/imageSrcWrapper";
import { HoverTranslation } from "@/components/hover-translation";
import { ImageCycle } from "@/components/image-cycle";
import { TextBox } from "@/components/text-box";
import { getTextData } from "@/lib/getTextData";
import { createTranslatedNode } from "@/lib/utils";
import { link } from "fs";
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
    {
        image: '/kakariki.avif',
        text: 'Kākāriki',
        link: 'https://www.visitzealandia.com/learn/nature-and-wildlife/birds/kākāriki/',
        credit: "Photo by Lynn Freeman",
        audio: '/audio/kakariki.mp3'
    },
]
export default async function Home() {
    const [tb1, tb2] = await Promise.all([
        getTextData("home1"),
        getTextData("home2"),
    ]);

    const tb1Node = createTranslatedNode(tb1.text, tb1.translate)
    const tb2Node = createTranslatedNode(tb2.text, tb2.translate)
    return (
        <div className="overflow-hidden h-full">
            <main
                className="w-full bg-background flex-col h-full z-20"
            >
                <div className="flex flex-wrap lg:flex-nowrap w-full">
                    <TextBox type="browns" className="w-full bg-takahe-10 text-left m-0">
                        <div className="m-auto"><h1 className="text-4xl text-left whitespace-pre-line">{tb1.title}</h1>
                            {tb1Node}
                        </div>
                    </TextBox>
                    <ImageCycle pairs={imagePairs} header={tb2.title}
                        className="w-full lg:w-2/3 m-0 p-0 h-full"></ImageCycle>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap w-full">
                    <TextBox type="browns" secondaryText="What is a catchment?" className="w-full m-0 text-left">
                        <div className="m-auto">
                            {tb2Node}
                        </div>
                    </TextBox>
                    <ImageSrcWrapper overlayText="Photo by Rob Suisted" overlayClassName="m-0 p-0"
                        wrapperClassName="w-full lg:w-2/3">
                        <img src="/arial_catchment.avif" alt="Arial view of the catchment"
                            className="h-full w-full object-cover object-center block" />
                    </ImageSrcWrapper>
                </div>
            </main>
        </div>
    );
}
