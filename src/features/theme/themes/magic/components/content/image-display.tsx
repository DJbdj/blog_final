import { useState, useRef } from "react";
import { ZoomIn, Download, X } from "lucide-react";
import { createPortal } from "react-dom";

interface ImageDisplayProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  showHint?: boolean;
}

function Lightbox({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = src;
    link.download = alt || "image.png";
    link.click();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={handleDownload}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Download size={20} />
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="max-w-[90vw] max-h-[90vh]">
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>,
    document.body
  );
}

export function ImageDisplay({
  src,
  alt,
  width,
  height,
  className = "",
  showHint = false,
}: ImageDisplayProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!src) return null;

  return (
    <>
      <div
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Zoom Icon Overlay */}
        {showHint && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="p-2 bg-white/90 rounded-lg">
              <ZoomIn size={20} className="text-primary" />
            </div>
          </div>
        )}
      </div>

      <Lightbox
        src={src}
        alt={alt}
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
      />
    </>
  );
}
