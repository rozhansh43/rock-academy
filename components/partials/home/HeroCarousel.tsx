'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

type Slide = { src: string; alt?: string };

type HeroCarouselProps = {
  slides: Slide[];
  className?: string;
  /** ارتفاع اسلاید (px) */
  height?: number;
};

export default function HeroCarousel({
  slides,
  className,
  height = 170,
}: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  );
  const [api, setApi] = React.useState<EmblaCarouselType | null>(null);
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // wire embla events for index & count
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    setCount(api.slideNodes().length);
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', () => {
      setCount(api.slideNodes().length);
      onSelect();
    });
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className={className}>
      <Carousel
        opts={{ loop: true, align: 'start' }}
        plugins={[plugin.current]}
        // setApi={setApi} // <-- دریافت emblaApi
      >
        <CarouselContent className="gap-1 px-1">
          {slides.map((s, i) => (
            <CarouselItem key={i} className="basis-[86%] md:basis-[70%]">
              <div className="overflow-hidden rounded-3xl shadow-sm">
                <Image
                  src={s.src}
                  alt={s.alt ?? `slide-${i + 1}`}
                  width={280}
                  height={186}
                  className="w-full object-cover"
                  style={{ height }}
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-2 flex w-full items-center justify-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  'mt-5',
                  'h-1.5 rounded-full transition',
                  index === i ? 'w-6 bg-purple-500' : 'w-1.5 bg-zinc-300',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}
