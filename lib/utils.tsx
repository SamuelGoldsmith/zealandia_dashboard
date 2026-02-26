import Layer from "@arcgis/core/layers/Layer";
import { clsx, type ClassValue } from "clsx"
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge"
import React from 'react';
import { HoverTranslation } from "@/components/hover-translation";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function isKLayer(name: string): boolean {
  return name.toLowerCase().startsWith('k ')
}

export function trimKLayer(name: string): string {
  return name.substring(2)
}

export interface DataLayer {
  id: string;
  title: string;
  description: string;
  links: string[];
  linkTitles: string[];
  tags: string[];
  layer: Layer;
}

export interface TextBoxDataPre {
  id: string,
  title: string,
  text: string,
  translate: string
}

export interface TextBoxData {
  id: string,
  title: string,
  text: string,
  translate: string[]
}

type TextDataResponse = {
  data: {
    id: string;
    title: string;
    text: string;
    translate: string[];
  };
};

export function createTranslatedNode(
  text: string,
  translate: string[]
): React.ReactNode {
  if (!translate || translate.length === 0) {
    return <p className="whitespace-pre-line">{text}</p>;
  }

  const translatedWords = new Set<string>();

  const escapeRegex = (word: string) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `\\b(${translate.map(escapeRegex).join("|")})\\b`,
    "gi"
  );

  const parts = text.split(regex);

  return (
    <p className="whitespace-pre-line">
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        const isMatch = translate.some(
          (word) => word.toLowerCase() === lowerPart
        );

        if (isMatch && !translatedWords.has(lowerPart)) {
          translatedWords.add(lowerPart);
          return (
            <HoverTranslation key={index} text={part}>
              {part}
            </HoverTranslation>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </p>
  );
}