"use client";

import { useState } from "react";

type GalleryProps = {
  title: string;
  screenshots: string[];
  thumbnail: string;
  compact?: boolean;
};

export function Gallery({
  title,
  screenshots,
  thumbnail,
  compact = false,
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = screenshots.length > 0 ? screenshots : [thumbnail];
  const activeImage = images[activeIndex] ?? thumbnail;
  const hasRealScreenshots = screenshots.length > 0;

  if (!hasRealScreenshots) {
    return (
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 p-3">
        <div className="overflow-hidden rounded-[1.4rem] bg-black/50">
          <img
            src={thumbnail}
            alt={`${title} preview image`}
            className={`w-full object-cover ${compact ? "aspect-[4/3] max-h-60" : "aspect-[16/9] lg:h-[450px]"}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        compact
          ? "space-y-4"
          : "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_200px]"
      }
    >
      <div className="glass-panel-strong overflow-hidden rounded-[1.75rem] p-3">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className={`block h-full w-full overflow-hidden rounded-[1.4rem] bg-black/40 text-left ${
            compact ? "max-w-3xl mx-auto" : ""
          }`}
        >
          <img
            src={activeImage}
            alt={`${title} screenshot ${activeIndex + 1}`}
            className={`${compact ? "aspect-[4/3] max-h-60 w-full object-cover" : "aspect-[16/9] lg:aspect-auto lg:h-[450px] w-full object-cover"} transition duration-300 hover:scale-[1.01]`}
          />
        </button>
      </div>

      {hasRealScreenshots && images.length > 1 ? (
        <div
          className={`${compact ? "flex gap-2 overflow-auto" : "flex flex-row overflow-x-auto lg:flex-col lg:overflow-y-auto lg:max-h-[450px] gap-3 content-start pr-1"}`}
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 overflow-hidden rounded-2xl border transition ${
                index === activeIndex
                  ? "border-maroon-300/60 ring-2 ring-maroon-300/40"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className={`${compact ? "h-20 w-auto" : "h-24 lg:h-32 w-40 lg:w-full object-cover"}`}
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            Close
          </button>
          <div
            className="max-h-[90vh] max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={`${title} screenshot ${activeIndex + 1} in fullscreen`}
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
