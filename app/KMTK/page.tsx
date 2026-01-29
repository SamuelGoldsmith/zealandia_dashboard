'use client';

import {TimelineColor, TimelineLayout, TimelineSize, TimelineStatus} from "@/components/custom/timeline-layout";
import {historicaldata} from "@/lib/historicaldata";
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
    image: string;
}

export default function KMTK() {

    const [api, setApi] = useState<CarouselApi>()

    const timelineItems: TimelineElement[] = [];
    let id = 0;

    historicaldata.locations.forEach((location) => {
        location.timeline.forEach((item) => {
            timelineItems.push({
                id: String(id++),
                date: String(item.year),
                title: 'placeholder',
                description: item.event,
                image: item.img[0].src
            });
        });
    });

    timelineItems.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    timelineItems.reverse()

    timelineItems.forEach((item, index) => {
        item.id = index.toString();
    })

    const [selectedID, setSelectedID] = useState(id.toString());

    useEffect(() => {
        if (!api) {
            return
        }

        api.scrollTo(parseInt(selectedID))

    }, [api, selectedID])

    function ScrollToTimelineElement(): void {
        const container = document.getElementById('timelineScrollArea');
        if (!container) return;
        const target = container.querySelector(`[data-timeline-id="${selectedID}"]`) as HTMLElement | null;
        if (!target) return;
        target.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

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
                    <Carousel className="w-3/4 h-[50vh] flex flex-col" setApi={setApi}
                              orientation={'vertical'}
                              opts={{watchDrag: false}}
                    >
                        <CarouselNext
                            className="self-center my-2"
                            onClick={() => {
                                setSelectedID((parseInt(selectedID) + 1).toString());
                                ScrollToTimelineElement();
                            }}
                        />
                        <CarouselContent className={'h-full flex'}>
                            {timelineItems.map((item, index) => (
                                <CarouselItem key={index} className="h-full w-full flex">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.image}
                                            alt={""}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious
                            className="self-center my-2"
                            onClick={() => {
                                setSelectedID((parseInt(selectedID) - 1).toString())
                                ScrollToTimelineElement();
                            }}
                        />
                    </Carousel>
                </div>
                <div className={"w-full h-[50vh] bg-white place-items-center"}>
                    <p>Map Here when GIS works</p>
                </div>
            </div>
        </div>

    );
}
