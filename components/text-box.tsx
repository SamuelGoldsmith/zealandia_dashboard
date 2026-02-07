"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function TextBox({
    text,
    children,
    type,
    secondaryText,
    className,
  ...props
}:{ text?: string, type?: string, secondaryText?: string, children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    if (type == null) {
        return (
            <div className={cn(`9/10 bg-primary-tp text-center p-5 h-auto m-3 rounded-sm`, className)} {...props}>
                {text && <span className={cn("text-m text-sea-blue")}>{text}</span>}
                {children}
            </div>
        )
    } else if (type == "dark") {
        return (
            <div
                className={cn(`9/10 bg-deep-brown text-center flex-row p-6 h-auto m-3 rounded-sm`, className)} {...props}>
                {secondaryText && <span className={cn("text-m text-kowahi-gold font-bold mr-3")}>{secondaryText}</span>}
                {text && <span className={cn("text-m text-primary font-bold")}>{text}</span>}
                {children}
            </div>
        )
    } else if (type == "dark-inline") {
        return (
            <div
                className={cn(`inline-flex w-fit bg-deep-brown text-center flex-row p-6 h-auto m-3 rounded-sm`, className)} {...props}>
                {secondaryText && <span className={cn("text-m text-kowahi-gold font-bold mr-3")}>{secondaryText}</span>}
                {text && <span className={cn("text-m text-primary font-bold")}>{text}</span>}
                {children}
            </div>
        )
    } else if (type == "browns") {
        return (
            <div
                className={cn(`w-fit bg-primary-tp text-left rounded-sm h-auto m-3 p-6`, className)} {...props}>
                {secondaryText && <h1 className={cn("text-3xl text-center text-kowahi-gold font-sans mr-3")}>{secondaryText}</h1>}
                {text && <span className={cn("text-m text-deep-brown")}>{text}</span>}
                {children}
            </div>
        )
    } else if (type == "blue") {
        return (
            <div
                className={cn(`w-fit text-left rounded-sm h-auto m-3 p-6`, className)} {...props}>
                {secondaryText && <h1 className={cn("text-3xl text-center text-nav-blue font-sans mr-3")}>{secondaryText}</h1>}
                {text && <span className={cn("text-m text-sea-blue")}>{text}</span>}
                {children}
            </div>
        )
    }
}

export { TextBox }
