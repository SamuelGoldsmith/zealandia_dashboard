"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

function ImageCycle({
    pairs,
    header,
    header_url,
    className,
  ...props
}:{ pairs: Array<{ image: string; text: string }>, header?: string, header_url?: string } & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={header_url} target="_blank" className={cn(`w-full text-center h-auto p-3`, className)} {...props} >
      {header && <div className="h-1/10 bg-roto-blue text-center"><h2 className="align-middle text-xl font-bold text-white">{header}</h2></div>}
      <Carousel opts={{ loop: true }} autoplayInterval={3000}>
        <CarouselContent>
        {pairs.map((pair, index) => (
          <CarouselItem key={index} >
            <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${pair.image})` }}>
              <div className="h-8/10"/>
              <div className={`w-full bg-primary-tp text-center p-3 h-2/10`}>
                <span className="text-m text-zealandia-orange font-bold vertical-align-bottom">{pair.text}</span>
              </div>
            </div>
            </CarouselItem>
    
        ))} 
         </CarouselContent>
      </Carousel>
    </a>
  )
}

export { ImageCycle }
