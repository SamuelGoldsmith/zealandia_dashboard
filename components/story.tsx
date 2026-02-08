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
         <hr className={"border-deep-brown border-t w-auto mx-3 p-1"}/>
        <div className={cn(`w-full h-auto`, className)} {...props}>
           
            {children}
        </div></>
    )
}

export { Story }