"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function TextBox({
    text,
    type,
    secondaryText,
    className,
  ...props
}:{ text?: string, type?: string, secondaryText?: string } & React.HTMLAttributes<HTMLDivElement>) {
    if (type == null) {
        return (
            <div className={cn(`9/10 bg-primary-tp text-center p-5 h-auto m-3`, className)} {...props}>
                {text && <span className={cn("text-m text-roto-blue")}>{text}</span>}
            </div>
        )
    } else if (type == "dark") {
        return (
            <div
                className={cn(`9/10 bg-kawakawa-green text-center flex-row p-6 h-auto m-3`, className)} {...props}>
                {secondaryText && <span className={cn("text-m text-kowahi-gold font-bold mr-3")}>{secondaryText}</span>}
                {text && <span className={cn("text-m text-primary font-bold")}>{text}</span>}
            </div>
        )
    } else if (type == "dark-inline") {
        return (
            <div
                className={cn(`inline-flex w-fit bg-kawakawa-green text-center flex-row p-6 h-auto m-3`, className)} {...props}>
                {secondaryText && <span className={cn("text-m text-kowahi-gold font-bold mr-3")}>{secondaryText}</span>}
                {text && <span className={cn("text-m text-primary font-bold")}>{text}</span>}
            </div>
        )
    } else if (type == "light") {
        return (
            <div
                className={cn(`inline-flex w-fit bg-primary-tp text-center flex-row h-auto mx-3 px-6`, className)} {...props}>
                {secondaryText && <span className={cn("text-m mr-3")}>{secondaryText}</span>}
                {text && <span className={cn("text-m")}>{text}</span>}
            </div>
        )
    }
}

export { TextBox }
