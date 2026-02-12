import React from "react";

interface ImageSrcWrapperProps {
    overlayText?: string;
    overlayClassName?: string;
    wrapperClassName?: string;
    children?: React.ReactNode;
}

export default function ImageSrcWrapper({
                                            overlayText,
                                            overlayClassName,
                                            wrapperClassName,
                                            children,
                                        }: ImageSrcWrapperProps) {
    return (
        <div className={`relative inline-block ${wrapperClassName ?? ""}`}>
            {children}

            {overlayText ? (
                <span
                    className={
                        `absolute left-2 bottom-2 text-[0.5rem] text-primary/80 p-1 rounded pointer-events-none ` +
                        (overlayClassName ? ` ${overlayClassName}` : "")
                    }
                >
          {overlayText}
        </span>
            ) : null}
        </div>
    );
}
