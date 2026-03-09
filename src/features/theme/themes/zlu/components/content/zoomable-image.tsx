"use client";

import { useEffect, useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };

    if (isZoomed) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto cursor-pointer rounded-lg hover:opacity-90 transition-opacity"
        onClick={() => setIsZoomed(true)}
        loading="lazy"
      />

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-screen object-contain px-4"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
