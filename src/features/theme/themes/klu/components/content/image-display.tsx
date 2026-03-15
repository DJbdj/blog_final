import { useState } from "react";
import { ZoomableImage } from "./zoomable-image";

interface ImageDisplayProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ImageDisplay({ src, alt, width, height }: ImageDisplayProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="not-prose my-6">
      <div className="relative rounded-xl overflow-hidden border border-[var(--klu-border-primary)] bg-[var(--klu-bg-secondary)]">
        <ZoomableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-[var(--klu-bg-tertiary)] animate-pulse" />
        )}
      </div>
      {alt && alt !== "blog image" && (
        <figcaption className="mt-2 text-center text-sm text-[var(--klu-text-muted)]">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
