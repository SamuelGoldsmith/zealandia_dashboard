'use client';

import {TextBox} from "@/components/text-box";
import Image from "next/image";
import {Story} from "@/components/story";
import ImageSrcWrapper from "@/components/custom/imageSrcWrapper";
import {useEffect, useState} from "react";
import Papa, {ParseResult} from "papaparse";

interface CsvDataRow {
    Description: string;
    LinkToDescription: string;
    LinkName: string;
    ImageLink: string;
    ImageCredit: string;
}

interface GetInvolvedEntry {
    Description: string;
    Links: [
        {
            LinkToDescription: string;
            LinkName: string;
        }
    ]
    ImageLink: string;
    ImageCredit: string;
}

const dataLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQx-MJXFVWXP1KqLkkxECQK7Gwiqn9nk_84gM0-6t1MbBH_HolAsf9o223PhgsU77GbRl9twltB9r8M/pub?gid=375773158&single=true&output=csv"
//const dataLink = process.env.GET_INVOLVED_CSV_URL

export default function GetInvolved() {

    const [data, setData] = useState<GetInvolvedEntry[]>([]);

    useEffect(() => {

        async function loadCSV() {
            const mergeData: GetInvolvedEntry[] = [];
            let prevItem: GetInvolvedEntry | null = null;

            if (!dataLink) {
                console.error("CSV URL is not defined in environment variables.");
                return;
            }
            const res = await fetch(dataLink)
            if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.statusText}`);
            const csv: string = await res.text();

            const results: ParseResult<CsvDataRow> = Papa.parse<CsvDataRow>(csv, {
                header: true,
                skipEmptyLines: true,
            });

            results.data.forEach((item) => {
                if (prevItem && item.Description === prevItem.Description) {
                    prevItem.Links.push({
                        LinkToDescription: item.LinkToDescription,
                        LinkName: item.LinkName,
                    });
                } else {
                    const newEntry: GetInvolvedEntry = {
                        Description: item.Description,
                        Links: [
                            {
                                LinkToDescription: item.LinkToDescription,
                                LinkName: item.LinkName,
                            }
                        ],
                        ImageLink: item.ImageLink,
                        ImageCredit: item.ImageCredit,

                    }
                    mergeData.push(newEntry);
                    prevItem = newEntry;
                }
            })

            setData(mergeData)
        }

        loadCSV();
    }, []);

    return (
        data.map((item, index) => {
            return (
                <Story key={index} className="flex-wrap lg:flex-nowrap md:flex-nowrap flex pb-10">
                    <div className={"flex flex-wrap lg:flex-nowrap md:flex-nowrap align-top w-full"}>
                        <ImageSrcWrapper overlayText={item.ImageCredit} wrapperClassName={"p-3 w-1/3"}>
                            <img
                                src={item.ImageLink}
                                alt={item.ImageCredit}
                                className={"self-center w-full"}
                            />
                        </ImageSrcWrapper>
                        <div className={"flex flex-col w-2/3 p-3 justify-center"}>
                            <TextBox
                                className="text-center w-full text-2xl"
                                type="browns"
                                text={item.Description}
                            />
                            {item.Links.map((link, linkIndex) => (
                                <a key={linkIndex} className="self-center text-xl hover:underline pb-3" href={link.LinkToDescription} target="_blank">
                                    {link.LinkName}
                                </a>
                            ))}
                        </div>
                    </div>
                </Story>
            );
        })
    );
}