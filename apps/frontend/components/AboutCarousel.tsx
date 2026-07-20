"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string; caption: string };

export function AboutCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const slide = slides[index];

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-navy/10 shadow-md">
        <div className="relative aspect-[4/3]">
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
            priority={index === 0}
          />
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-1.5 text-white shadow transition hover:bg-navy"
          aria-label="Previous photo"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-1.5 text-white shadow transition hover:bg-navy"
          aria-label="Next photo"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="mt-2 text-center text-sm text-slate-500 italic">{slide.caption}</p>
    </div>
  );
}
