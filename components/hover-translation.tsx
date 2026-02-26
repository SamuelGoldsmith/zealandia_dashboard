"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card"
import { HoverCardContent } from "./ui/hover-card"
import {useEffect} from "react";
import {useState} from "react";
import Papa, {ParseResult} from "papaparse";

const translationLink: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQx-MJXFVWXP1KqLkkxECQK7Gwiqn9nk_84gM0-6t1MbBH_HolAsf9o223PhgsU77GbRl9twltB9r8M/pub?gid=1728029904&single=true&output=csv"

interface TranslationRow {
    word: string;
    translation: string;
}

function HoverTranslation({
    text,
    className,
  ...props
}:{ text: string, className?: string } & React.HTMLAttributes<HTMLSpanElement>) {

    const [translations, setTranslations] = useState<Record<string, string>>({})

    useEffect(() => {

        async function loadCSV() {

            const t: Record<string, string> = {}

            if (!translationLink) {
                console.error("CSV URL is not defined in environment variables.");
                return;
            }
            const res = await fetch(translationLink)
            if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.statusText}`);
            const csv: string = await res.text();

            const results: ParseResult<TranslationRow> = Papa.parse<TranslationRow>(csv, {
                header: true,
                skipEmptyLines: true,
            });

            results.data.forEach((item) => {
                t[item.word] = item.translation;
            })

            setTranslations(t)
        }

        loadCSV();
    }, []);


  return (
    <span className={cn(`cursor-pointer`, className)} {...props}>
      <HoverCard>
        <HoverCardTrigger><span className={cn("text-m hover:underline px-0.5 bg-takahe-10 border-takahe rounded-md border text-foreground")}>{text}</span></HoverCardTrigger>
        <HoverCardContent side="bottom" align="center" className="w-64 p-3 bg-primary-tp border border-sea-blue rounded-md shadow-md">
          <p className="text-sm text-sea-blue">{translations[text.toLowerCase() as keyof typeof translations]}</p>
        </HoverCardContent>
        </HoverCard>
    </span>
  )
}

export { HoverTranslation }
