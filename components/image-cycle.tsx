"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const audioInstances = new Map<string, HTMLAudioElement>();

const playAudio = (audioSrc: string) => {
  if (audioInstances.has(audioSrc)) {
    const audio = audioInstances.get(audioSrc)!;
    audio.currentTime = 0;
    audio.play().catch(err => console.error("Audio play error:", err));
  } else {
    const audio = new Audio(audioSrc);
    audioInstances.set(audioSrc, audio);
    audio.play().catch(err => console.error("Audio play error:", err));
  }
};

const stopAudio = (audioSrc: string) => {
  if (audioInstances.has(audioSrc)) {
    const audio = audioInstances.get(audioSrc)!;
    audio.pause();
    audio.currentTime = 0;
  }
};

function ImageCycle({
    pairs,
    header, 
    className,
  ...props
}:{ pairs: Array<{ image: string; text: string, link: string, audio: string }>, header?: string} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(`w-full text-center h-auto p-3`, className)} {...props}>
      {header && <div className="h-1/10 bg-roto-blue text-center"><h2 className="align-middle text-xl font-bold text-white">{header}</h2></div>}
      <Carousel opts={{ loop: true }} autoplayInterval={3000}>
        <CarouselContent>
        {pairs.map((pair, index) => (
       
          <CarouselItem key={index} > <a href={pair.link} target="_blank" rel="noopener noreferrer" key={index} onMouseEnter={() => playAudio(pair.audio)} onMouseLeave={() => stopAudio(pair.audio)}>
            <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${pair.image})` }}>
              <div className="h-8/10"/>
                <div className={`w-full bg-primary-tp text-center p-3 h-2/10`}>
                  <span className="text-m text-zealandia-orange font-bold vertical-align-bottom">{pair.text}</span>
                </div>
            </div> </a>
            </CarouselItem>
           
    
        ))} 
         </CarouselContent>
      </Carousel>
    </div>
  )
}

export { ImageCycle }
