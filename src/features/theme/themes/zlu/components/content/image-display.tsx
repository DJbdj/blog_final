"use client";

import { useState } from "react";
import { Maximize2, X } from "lucide-react";

interface ImageDisplayProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageDisplay({ src, alt, caption }: ImageDisplayProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <figure className="my-6">
        <div className="relative rounded-lg overflow-hidden bg-[var(--zlu-bg-tertiary)]">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsZoomed(true)}
            loading="lazy"
          />
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white opacity-0 hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-[var(--zlu-text-secondary)] mt-2">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Image Modal - Using Portal-like behavior with highest z-index */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          onClick={() => setIsZoomed(false)}
          style={{ isolation: 'isolate' }}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
