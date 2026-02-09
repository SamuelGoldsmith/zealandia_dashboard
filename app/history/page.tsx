'use client';

import {TimelineColor, TimelineLayout, TimelineSize, TimelineStatus} from "@/components/custom/timeline-layout";
import {ReactNode, useState, useEffect} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import Layer from "@arcgis/core/layers/Layer";
import dynamic from "next/dynamic";
import Papa, {ParseResult} from 'papaparse';
import {TextBox} from "@/components/text-box";
import {DropdownMenuContent, DropdownMenuTrigger, DropdownMenu} from "@/components/ui/dropdown-menu";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";

const ArcGISMap = dynamic(() => import("../../components/map"), {ssr: false});

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
    filter?: string;
}

interface CsvDataRow {
    Year: string;
    DisplayTitle: string;
    PhotoTitle: string;
    description: string;
    photoLink: string;
    source: string;
}

export default function KMTK() {

    const [layers, setLayers] = useState<Layer[]>([]);

    const [timelineItems, setTimeLineItems] = useState<TimelineElement[]>([]);

    // timeline filter states
    const [historical, setHistorical] = useState(true);
    const [cultural, setCultural] = useState(true);

    let id = 0;

    useEffect(() => {

        async function loadCSV() {
            const res = await fetch("/timelineData.csv")
            if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.statusText}`);
            const csv: string = await res.text();

            const results: ParseResult<CsvDataRow> = Papa.parse<CsvDataRow>(csv, {
                header: true,
                skipEmptyLines: true,
            });

            const items: TimelineElement[] = [];
            let prevItem: TimelineElement;

            results.data.forEach((item: CsvDataRow) => {
                const images = [];

                if (prevItem && prevItem.title === item.DisplayTitle) {
                    // if the current item has the same DisplayTitle as the previous item, add its photo
                    prevItem.images.push(item.photoLink);
                } else {
                    images.push(item.photoLink);

                    const newItem: TimelineElement = {
                        id: String(id++),
                        date: String(item.Year),
                        title: item.DisplayTitle,
                        description: item.description,
                        images: images,
                    }
                    items.push(newItem);

                    prevItem = newItem;
                }
            });

            setTimeLineItems(items);
        }

        loadCSV();
    })


    timelineItems.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    timelineItems.reverse()

    timelineItems.forEach((item, index) => {
        item.id = index.toString();
    })

    const [selectedID, setSelectedID] = useState((id - 1).toString());

    const [currentItems, setCurrentItems] = useState<TimelineElement[]>([]);

    useEffect(() => {
        let tempItems = timelineItems;

        if(!historical) {
            tempItems = tempItems.filter(item => item.filter === "historical");
        }

        setCurrentItems(tempItems);

    }, [historical, cultural, timelineItems]);

    return (
        <div className="flex lg:flex-row flex-col w-full h-screen justify-between">
            <ScrollArea className="lg:w-[60%] lg:h-[100vh] w-full h-[60%]" id={'timelineScrollArea'}>
                <div className={"flex flex-row"}>
                    <TextBox
                        text={"History of Reclamation of Te Kaiwharwhara"}
                        type={"dark"}
                        className={"text-2xl w-8/10"}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" className={"self-center p-3 w-1/10 text-m"}>Filter</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"bg-primary"}>
                            <Checkbox checked={historical} onCheckedChange={(historical) => setHistorical(historical as boolean)}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <TimelineLayout
                    className={'shadow-black'}
                    connectorColor={'accent'}
                    iconColor={'accent'}
                    selectedID={selectedID}
                    setSelectedID={setSelectedID}
                    items={currentItems}
                />
            </ScrollArea>
            <div className={"lg:w-[40vw] lg:h-full w-full h-[40vh] bg-white place-items-center"}>
                <ArcGISMap
                    id={"bda891e30a384c4f9108fd9fdb6b07e9"}
                    onLayersLoaded={setLayers}
                />
            </div>
        </div>

    );
}

