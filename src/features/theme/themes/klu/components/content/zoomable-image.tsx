import { useState, useCallback, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
}

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  onLoad,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Thumbnail */}
      <div
        className={cn(
          "relative cursor-zoom-in group",
          className
        )}
        onClick={open}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={onLoad}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <ZoomIn className="text-white w-8 h-8" />
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Image container */}
          <div
            className="h-full w-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Caption */}
          {alt && alt !== "blog image" && (
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white/80 text-sm">{alt}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ZoomableImage;
