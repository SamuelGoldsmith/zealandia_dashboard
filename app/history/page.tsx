'use client';

import {TimelineColor, TimelineLayout, TimelineSize, TimelineStatus} from "@/components/custom/timeline-layout";
import {historicalData} from "@/lib/historicalData";
import {ReactNode, useState, useEffect} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Layer from "@arcgis/core/layers/Layer";
import dynamic from "next/dynamic";

const ArcGISMap = dynamic(() => import("../../components/map"), { ssr: false });

interface TimelineElement {
    id: string;
    date: string;
    title: string;
    description: string;
    icon?: ReactNode | (() => ReactNode);
    status?: TimelineStatus;
    color?: TimelineColor;
    size?: TimelineSize;
    loading?: boolean;
    error?: string;
    images: string[];
}

export default function KMTK() {

    const [api, setApi] = useState<CarouselApi>()

    // For showing current image number
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const [layers, setLayers] = useState<Layer[]>([]);

    const timelineItems: TimelineElement[] = [];
    let id = 0;

    historicalData.timeline.forEach((item) => {
        timelineItems.push({
            id: String(id++),
            date: String(item.date),
            title: item.title,
            description: item.description,
            images: item.images
        });
    });

    timelineItems.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    timelineItems.reverse()

    timelineItems.forEach((item, index) => {
        item.id = index.toString();
    })

    const [selectedID, setSelectedID] = useState((id-1).toString());

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(timelineItems[selectedID].images.length);
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

        api.scrollTo(parseInt(selectedID))

    }, [api, selectedID])

    /* scrolls to selected timeline element

    function ScrollToTimelineElement(): void {
        const container = document.getElementById('timelineScrollArea');
        if (!container) return;
        const target = container.querySelector(`[data-timeline-id="${selectedID}"]`) as HTMLElement | null;
        if (!target) return;
        target.scrollIntoView({block: 'center', behavior: 'smooth'});
    }
    */

    return (
        <div className="flex flex-row w-full h-screen justify-between">
            <ScrollArea className="w-[60%] h-[100vh]" id={'timelineScrollArea'}>
                <TimelineLayout
                    className={'shadow-black'}
                    connectorColor={'accent'}
                    iconColor={'accent'}
                    selectedID={selectedID}
                    setSelectedID={setSelectedID}
                    items={timelineItems}
                />
            </ScrollArea>
            <div className={"flex flex-col w-1/2"}>
                <div className="w-full h-[50vh] place-items-center">
                    <Carousel className="w-full h-[50vh] flex flex-row" setApi={setApi}
                              opts={{watchDrag: false}}
                    >
                        <CarouselPrevious
                            className="self-center my-2"
                        />
                        <CarouselContent className={'h-full w-[40vw] flex items-stretch'}>
                            {timelineItems[selectedID].images.map((img, index) => (
                                <CarouselItem key={index} className="h-full w-full flex items-stretch">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={img}
                                            alt={""}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext
                            className="self-center my-2"
                        />
                    </Carousel>
                </div>
                <div className="text-muted-foreground py-2 text-center text-sm">
                    Slide {current} of {count}
                </div>
                <div className={"w-full h-[50vh] bg-white place-items-center"}>
                    <ArcGISMap
                        id={"bda891e30a384c4f9108fd9fdb6b07e9"}
                        onLayersLoaded={setLayers}
                    />
                </div>
            </div>
        </div>

    );
}
