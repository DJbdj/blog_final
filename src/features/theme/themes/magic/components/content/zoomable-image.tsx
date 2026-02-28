import { ClientOnly } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Download, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> {
  className?: string;
  showHint?: boolean;
  src?: string;
  width?: number;
  height?: number;
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const originalSrc = React.useMemo(() => {
    try {
      const base =
        typeof window !== "undefined" ? window.location.origin : undefined;
      const url = base ? new URL(src, base) : new URL(src);
      url.searchParams.set("original", "true");
      return url.toString();
    } catch {
      return src.includes("?")
        ? `${src}&original=true`
        : `${src}?original=true`;
    }
  }, [src]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Controls */}
      <div
        className={`absolute top-4 left-4 right-4 flex justify-between items-start z-10 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-white">图片预览</span>
          <span className="text-xs text-white/60">{alt || "图片"}</span>
        </div>

        <div className="flex gap-3 items-center">
          <a
            href={originalSrc}
            download
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Download size={18} className="text-white" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        className={`relative z-[5] p-4 md:p-8 w-full h-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-[0.95] opacity-0"
        }`}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>,
    document.body,
  );
}

export default function ZoomableImage({
  className = "",
  alt = "",
  src,
  showHint = false,
  width,
  height,
  ...props
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  if (!src) return null;

  return (
    <>
      <div
        className={cn(
          "relative group cursor-zoom-in block w-full overflow-hidden bg-muted/20",
          !isLoaded && "animate-pulse",
        )}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : "auto",
        }}
        onClick={() => setIsOpen(true)}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            className,
            "block transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          {...props}
        />

        {/* Hover Hint */}
        {showHint && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md transform scale-95 group-hover:scale-100 transition-all duration-200 flex items-center gap-1.5">
              <ZoomIn size={12} />
              <span className="text-xs">点击放大</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Portal - Client Only */}
      <ClientOnly>
        <Lightbox
          src={src}
          alt={alt}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </ClientOnly>
    </>
  );
}
