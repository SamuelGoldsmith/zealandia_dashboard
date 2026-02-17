'use client';

import {TimelineColor, TimelineLayout, TimelineSize, TimelineStatus} from "@/components/custom/timeline-layout";
import {ReactNode, useState, useEffect, useRef} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import Layer from "@arcgis/core/layers/Layer";
import Papa, {ParseResult} from 'papaparse';
import {TextBox} from "@/components/text-box";
import {DropdownMenuContent, DropdownMenuTrigger, DropdownMenu} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ArrowDownUp } from 'lucide-react';

const HistoricMap = dynamic(() => import("../../components/historical-map"), { ssr: false });

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
    dataSource?: string;
    sources: string[];
    filter?: string;
}

interface CsvDataRow {
    Year: string;
    DisplayTitle: string;
    PhotoTitle: string;
    description: string;
    dataSource: string;
    filter: string;
    photoLink: string;
    source: string;
    Lat: string;
    Lon: string;
}

interface filterData {
    name: string;
    active: boolean;
}

type PointFeature = {
    id: string;
    x: number;
    y: number;
    title?: string;
    description?: string;
    filter?: string;
};

const dataLink: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQx-MJXFVWXP1KqLkkxECQK7Gwiqn9nk_84gM0-6t1MbBH_HolAsf9o223PhgsU77GbRl9twltB9r8M/pub?gid=0&single=true&output=csv"

export default function KMTK() {

    const [layers, setLayers] = useState<Layer[]>([]);

    // states to store the TOTAL list of items from the csv
    const [timelineItems, setTimeLineItems] = useState<TimelineElement[]>([]);
    const [mapPoints, setMapPoints] = useState<PointFeature[]>([]);

    // timeline filter states
    const [filters, setFilters] = useState<filterData[]>([]);

    // keeps track of item order
    const [ascending, setAscending] = useState(true);

    // states for storing current state of elements to be filtered
    const [currentItems, setCurrentItems] = useState<TimelineElement[]>([]);
    const [currentPoints, setCurrentPoints] = useState<PointFeature[]>([]);

    let id = 0;

    useEffect(() => {

        async function loadCSV() {
            const res = await fetch(dataLink)
            if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.statusText}`);
            const csv: string = await res.text();

            const results: ParseResult<CsvDataRow> = Papa.parse<CsvDataRow>(csv, {
                header: true,
                skipEmptyLines: true,
            });

            const items: TimelineElement[] = [];
            const points: PointFeature[] = [];
            const filtersToAdd: filterData[] = [];
            let prevItem: TimelineElement;

            results.data.forEach((item: CsvDataRow, index) => {
                const images = [];
                const srcs = [];

                if (prevItem && prevItem.title === item.DisplayTitle) {
                    // if the current item has the same DisplayTitle as the previous item, add its photo
                    prevItem.images.push(item.photoLink);
                    prevItem.sources.push(item.source);

                } else {
                    images.push(item.photoLink);
                    srcs.push(item.source);

                    // create new timeline element
                    const newItem: TimelineElement = {
                        id: String(id),
                        date: String(item.Year),
                        title: item.DisplayTitle,
                        description: item.description,
                        dataSource: item.dataSource,
                        images: images,
                        sources: srcs,
                        filter: item.filter
                    }
                    items.push(newItem);

                    // create new filter if doesn't exist
                    if (item.filter && !filtersToAdd.find(filter => filter.name === item.filter)) {
                        filtersToAdd.push({name: item.filter, active: true});
                    }

                    if(item.Lat && item.Lon) {
                        // create new point for the map
                        const newPoint: PointFeature = {
                            id: String(id),
                            x: Number(item.Lon),
                            y: Number(item.Lat),
                            title: item.DisplayTitle,
                            description: item.description,
                            filter: item.filter
                        }
                        points.push(newPoint);
                    }

                    prevItem = newItem;
                    id++
                }
            });

            setTimeLineItems(items);
            setMapPoints(points);
            setFilters(filtersToAdd);
        }

        loadCSV();
    }, []);

    // sorts the items by date order
    function sortTimelineItems(items: TimelineElement[]): TimelineElement[] {
        if(ascending) {
            items.sort((a, b) => parseInt(a.date) - parseInt(b.date));
        } else {
            items.sort((a, b) => parseInt(b.date) - parseInt(a.date));
        }

        return items
    }

    useEffect(() => {
        setCurrentItems(prev => sortTimelineItems(prev));
    }, [ascending]);

    const [selectedID, setSelectedID] = useState((id - 1).toString());

    useEffect(() => {
        const tempItems: TimelineElement[] = [];
        const tempPoints: PointFeature[] = [];

        filters.forEach((filter: filterData) => {
            if(filter.active) {
                timelineItems.filter(item => item.filter === filter.name).forEach((item) => tempItems.push(item));
                mapPoints.filter(point => point.filter === filter.name).forEach((item) => tempPoints.push(item));
            }
        });

        setCurrentItems(sortTimelineItems(tempItems));
        setCurrentPoints(tempPoints);

    }, [filters, ascending]);

    function ScrollToTimelineElement(): void {
        const container = document.getElementById('timelineScrollArea');
        if (!container) return;
        const target = container.querySelector(`[data-timeline-id="${selectedID}"]`) as HTMLElement | null;
        if (!target) return;
        target.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    useEffect(() => {
        ScrollToTimelineElement();
    }, [selectedID]);

    return (
        <div className="flex lg:flex-row flex-col w-full h-screen justify-between">
            <ScrollArea className="lg:w-[60%] lg:h-[100vh] w-full h-[60%]" id={'timelineScrollArea'}>
                <div className={"flex flex-row"}>
                    <TextBox
                        text={"History of Reclamation of Te Kaiwharawhara"}
                        type={"dark"}
                        className={"text-2xl w-8/10"}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" className={"self-center p-3 w-1/10 text-m text-vivid-azure hover:underline"}>Filter</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"bg-primary"}>
                            {filters.map((filter: filterData, index) => (
                                <div key={index} className={"flex flex-row gap-3"}>
                                    <Field orientation={"horizontal"} className={"mb-3"}>
                                        <Checkbox
                                            className={"border-vivid-azure data-[state=checked]:border-vivid-azure hover:border-vivid-orange data-[state=checked]:hover:border-vivid-orange"}
                                            checked={filter.active}
                                            onCheckedChange={() => {
                                                setFilters(prev =>
                                                    prev.map((f, i) => (i === index ? { ...f, active: !f.active } : f)))
                                            }}
                                        />
                                        <FieldLabel className={"text-vivid-azure"}>
                                            {filter.name}
                                        </FieldLabel>
                                    </Field>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className={"self-center m-1 hover:bg-nav-blue"} onClick={() => setAscending(!ascending)}>
                        <ArrowDownUp className={"text-vivid-azure"} />
                    </Button>
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
                {/*66be186453d84308b26257021d6fb664*/}
                <HistoricMap
                    id={"66be186453d84308b26257021d6fb664"}
                    selectedId={selectedID}
                    setSelectedId={setSelectedID}
                    onLayersLoaded={setLayers}
                    points={currentPoints}
                />
            </div>
        </div>

    );
}

