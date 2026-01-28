"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function TextBox({
    text,
    type,
    className,
  ...props
}:{ text?: string, type?: string } & React.HTMLAttributes<HTMLDivElement>) {
  if(type == null) {
  return (
    <div className={cn(`9/10 bg-primary-tp text-center p-5 h-auto m-3`, className)} {...props}>
      {text && <span className={cn("text-m text-roto-blue")}>{text}</span>}
    </div>
  )
} else if (type == "dark") {
  return (
    <div className={cn(`9/10 bg-kawakawa-green text-center p-5 h-auto m-3`, className)} {...props}>
      {text && <span className={cn("text-m text-white font-bold")}>{text}</span>}
    </div>
  )
}
}
export { TextBox }
