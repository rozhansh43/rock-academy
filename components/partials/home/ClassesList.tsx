'use client';

import * as React from 'react';
import Image from 'next/image';

export type ClassItem = {
  id: number | string;
  persian_name: string;
  instructor?: string;
  weekdays_fa?: string[];
  start_time?: string;
  end_time?: string;
  remainingCount?: number;
  coverSrc?: string;
  accent?: 'pink' | 'blue' | 'cream';
};

type ClassesListProps = {
  items: ClassItem[];
  isLoading?: boolean;
  showActions?: boolean; // optional CTAs (not in figma)
  onMoreInfo?: (id: string) => void;
};

export default function ClassesList({
  items,
  isLoading,
  showActions = false,
  onMoreInfo,
}: ClassesListProps) {
  if (isLoading) {
    return (
      <p className="container-main text-dark-2 text-center text-base font-medium">
        در حال بارگذاری...
      </p>
    );
  }
  if (!items?.length) {
    return (
      <p className="container-main text-dark-2 text-center text-base font-medium">
        هیچ کلاسی یافت نشد
      </p>
    );
  }

  return (
    <div className="container-main flex flex-col gap-4">

      {items.map((item, i) => {
        const theme = getTheme(item.accent ?? auto(i));
        return (
          <article
            key={item.id}
            dir="rtl"
            className={[
              'relative flex items-center justify-between gap-3 overflow-hidden',
              'rounded-[22px] shadow-[0px_1px_5px_rgba(0,0,0,0.2)]',
              theme.bg,
              'px-3.5 py-3 sm:px-4 sm:py-3.5',
            ].join(' ')}
          >
            {/* right: texts */}
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-[15px] leading-6 font-extrabold text-middle-gray">
                {item.persian_name}
              </h3>
              <p className="text-[12px] leading-6 text-zinc-500">
                <span className="text-zinc-400">مربی : </span>
                <span>{item.instructor || '-'}</span>
              </p>
              <p className="text-[12px] leading-6 text-zinc-500">
                <span className="text-zinc-400">روزهای برگزاری : </span>
                <span>{item.weekdays_fa?.join('، ') || '-'}</span>
              </p>
              <p className="text-[12px] leading-6 text-zinc-500">
                <span className="text-zinc-400">ساعت برگزاری : </span>
                <span>
                  {(item.start_time ?? '').replaceAll(':00', '')} -{' '}
                  {(item.end_time ?? '').replaceAll(':00', '')}
                </span>
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-[11px] font-semibold text-[color:var(--orange)] shadow-[0_1px_4px_rgba(0,0,0,.06)]">
                  {item.remainingCount} نفر باقیمانده
                </span>
                {showActions && (
                  <button
                    onClick={() => onMoreInfo?.(String(item.id))}
                    className="ml-auto rounded-full border border-zinc-300 px-3 py-1 text-[11px] text-zinc-600 hover:bg-white/70"
                  >
                    اطلاعات بیشتر
                  </button>
                )}
              </div>
            </div>

            {/* left: illustration */}
            <div className="relative h-[143px] w-[122px] self-end">
              <Image
                src={item.coverSrc || '/images/illus-dance-1.png'} // fallback fixed
                alt={item.persian_name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
                priority={i === 0}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* helpers */
function auto(i: number): 'pink' | 'blue' | 'cream' {
  return (['pink', 'blue', 'cream'] as const)[i % 3];
}
function getTheme(acc: 'pink' | 'blue' | 'cream') {
  switch (acc) {
    case 'pink':
      return { bg: 'bg-[oklch(96%_0.03_20)]' };
    case 'blue':
      return { bg: 'bg-[oklch(96%_0.04_230)]' };
    case 'cream':
      return { bg: 'bg-[oklch(97%_0.05_95)]' };
  }
}
