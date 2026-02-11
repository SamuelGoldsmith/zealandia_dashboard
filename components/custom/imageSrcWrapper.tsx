import React from "react";

interface ImageSrcWrapperProps {
  /** text shown over the image in the bottom-left */
  overlayText?: string;
  /** optional extra classes for the overlay container */
  overlayClassName?: string;
  /** optional extra classes for the outer wrapper */
  wrapperClassName?: string;
  /** children (parent provides the Image) */
  children?: React.ReactNode;
}

/**
 * ImageSrcWrapper
 * - does NOT render the Image; parent should pass an Image as children
 * - overlayText (optional) will be rendered bottom-left, small & semi-transparent
 */
export default function ImageSrcWrapper({
  overlayText,
  overlayClassName,
  wrapperClassName,
  children,
}: ImageSrcWrapperProps) {
  return (
    <div className={`${wrapperClassName ?? ""}`}>

      {children}

      {overlayText ? (
        <div
          className={
            `fixed left-2 bottom-2 text-xs text-background/70 select-none pointer-events-none ` +
            (overlayClassName ?? "")
          }
        >
          {overlayText}
        </div>
      ) : null}
    </div>
  );
}
