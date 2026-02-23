"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Story({
    children,
    className,
  ...props
}:{ children: React.ReactNode, className?: string } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <>
        <div className={cn(`w-full h-auto`, className)} {...props}>
           
            {children}
        </div></>
    )
}

export { Story }