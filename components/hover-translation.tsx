"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card"
import { HoverCardContent } from "./ui/hover-card"
import translations from "@/lib/translations.json"
function HoverTranslation({
    text,
    className,
  ...props
}:{ text: string, className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn(``, className)} {...props}>
      <HoverCard>
        <HoverCardTrigger><span className={cn("text-m text-white bg-roto-blue border border-nav-blue p-1  rounded-md")}>{text}</span></HoverCardTrigger>
        <HoverCardContent side="bottom" align="center" className="w-64 p-3 bg-primary-tp border border-roto-blue rounded-md shadow-md">
          <p className="text-sm text-roto-blue">{translations[text.toLowerCase() as keyof typeof translations]}</p>
        </HoverCardContent>
        </HoverCard>
    </span>
  )
}

export { HoverTranslation }
