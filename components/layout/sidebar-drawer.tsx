'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { ThursdayPlan } from '@/components/icons/thursday-plan';
import { ProfileIcon } from '@/components/icons/profile';
import { ContactIcon } from '@/components/icons/contact';
import { FAQIcon } from '@/components/icons/faq';
import { SalonIcon } from '@/components/icons/salon';
import { EventsIcon } from '@/components/icons/envents';
import { OnlineIcon } from '@/components/icons/onLine';
import { CoursesIcon } from '@/components/icons/courses';
import { BillingIcon } from '@/components/icons/billing';
import { ExitIcon } from '@/components/icons/exit';
import { OfflineIcon } from '@/components/icons/offline';
import { StarIcon } from '@/components/icons/star';

/** Shape of a drawer menu item */
type MenuItem = {
  label: string;
  href?: string; // If provided, item renders as a Link
  onClick?: () => void; // If provided, item renders as a Button
  icon: React.ReactNode; // Right-aligned icon for your RTL layout
};

type SidebarDrawerProps = {
  /** External control for open state; if omitted, Zustand store drives it */
  open?: boolean;
  /** Callback when open state changes (used only when `open` is controlled) */
  onOpenChange?: (v: boolean) => void;

  /** Display name in header */
  userName: string;
  /** Score badge value (default 35) */
  score?: number;
  /** Optional avatar URL */
  avatarUrl?: string;

  /** Custom menu items; falls back to default list if omitted */
  items?: MenuItem[];

  /** Extra class on the drawer panel */
  className?: string;

  /** Slide-in side: true = from left (default), false = from right */
  fromLeft?: boolean;
};

export default function SidebarDrawer({
  open: controlledOpen,
  onOpenChange,
  userName,
  score = 35,
  avatarUrl,
  items,
  className,
  fromLeft = true, // mobile UX here prefers opening from the left
}: SidebarDrawerProps) {
  // --- Global state via Zustand (uncontrolled mode) ---
  const isOpenFromStore = useUIStore((s) => s.isSidebarDrawerOpen);
  const openStore = useUIStore((s) => s.openSidebarDrawer);
  const closeStore = useUIStore((s) => s.closeSidebarDrawer);

  // Prefer controlled prop if provided, else use store
  const open = controlledOpen ?? isOpenFromStore;
  const setOpen = (v: boolean) =>
    controlledOpen === undefined
      ? v
        ? openStore()
        : closeStore()
      : onOpenChange?.(v);

  // --- Default menu items (you can override via `items` prop) ---
  const menu: MenuItem[] = items ?? [
    {
      label: 'پروفایل کاربری',
      href: '/profile',
      icon: <ProfileIcon width={'20px'} />,
    },
    {
      label: 'تماس با ما',
      href: '/contact',
      icon: <ContactIcon width={'20px'} />,
    },
    { label: 'سوالات متداول', href: '/faq', icon: <FAQIcon width={'20px'} /> },
    {
      label: 'برنامه پنج‌شنبه‌ها',
      href: '/thursday-plan',
      icon: <ThursdayPlan width={'20px'} />,
    },
    { label: 'رزرو سالن', href: '/salon', icon: <SalonIcon width={'20px'} /> },
    {
      label: 'کلاس‌های آفلاین',
      href: '/classes/offline',
      icon: <OfflineIcon width={'20px'} />,
    },
    { label: 'رویدادها', href: '/events', icon: <EventsIcon width={'20px'} /> },
    {
      label: 'کلاس‌های حضوری',
      href: '/classes/online',
      icon: <OnlineIcon width={'20px'} />,
    },
    {
      label: 'لیست دوره‌های من',
      href: '/my-courses',
      icon: <CoursesIcon width={'20px'} />,
    },
    {
      label: 'سوابق مالی',
      href: '/billing',
      icon: <BillingIcon width={'20px'} />,
    },
    {
      label: 'خروج',
      onClick: () => console.log('logout…'),
      icon: <ExitIcon width={'20px'} />,
    },
  ];

  // --- Positioning & rounded corners based on slide side ---
  const sidePos = fromLeft ? 'left-0' : 'right-0';
  // Move slightly beyond 100% so borders/shadows never peek when closed
  const translateClosed = fromLeft
    ? '-translate-x-[112%]'
    : 'translate-x-[112%]';
  // Big soft corners to match the visual spec
  const roundedPanel = fromLeft
    ? 'rounded-s-[50px] rounded-br-[50px]' // opening from left → free edge is right + bottom-right
    : 'rounded-e-[50px] rounded-bl-[50px]';

  return (
    // Fixed wrapper constrained to your max-w-md "mobile frame".
    // Kept mounted at all times to preserve smooth close/open transitions.
    <div
      className="pointer-events-none fixed inset-y-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 overflow-x-hidden"
      aria-hidden={!open}
    >
      {/* Local backdrop (inside the mobile frame only). Clicking it closes the drawer. */}
      <div
        onClick={() => setOpen(false)}
        className={[
          'absolute inset-0 rounded-[26px] transition',
          open
            ? 'pointer-events-auto visible bg-black/30 backdrop-blur-[1px]'
            : 'pointer-events-none invisible bg-transparent',
        ].join(' ')}
      />

      {/* Sliding panel */}
      <aside
        dir="rtl"
        data-open={open}
        aria-hidden={!open}
        className={[
          'absolute top-0 bottom-0 p-8',
          sidePos,
          'w-[70%] max-w-[360px]',
          translateClosed,
          'transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] data-[open=true]:translate-x-0',
          // Soft warm gradient background matching your design
          'bg-[linear-gradient(-160deg,#FFF_0%,#FFF8F1_62%,#EFD8FF_100%)]',
          'border',
          roundedPanel,
          open ? 'border-border shadow-xl' : 'border-transparent shadow-none',
          'pointer-events-auto',
          className ?? '',
        ].join(' ')}
      >
        {/* Floating handle: perfectly half-out/half-in at the vertical center.
           For LTR designs, flip side classes. */}
        <button
          onClick={() => setOpen(false)}
          aria-label="close"
          className={[
            'absolute top-1/3 grid -translate-y-1/2 place-items-center', // NOTE: if you want *exact* middle, use top-1/2
            'border-border size-14 rounded-full bg-white text-gray-400',
            fromLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2',
          ].join(' ')}
        >
          <ChevronRight className={`size-8 ${fromLeft ? '' : 'rotate-180'}`} />
        </button>

        {/* Header: two-column grid → avatar (col 1), name + score (col 2) */}
        <header className="px-6">
          <div className="grid grid-cols-[64px_1fr] items-center gap-x-14">
            {/* Avatar with a “story ring”. Start angle 270deg → right-to-left sweep. */}
            <div className="relative">
              <div className="size-[80px] rounded-full bg-[conic-gradient(from_270deg,theme(colors.orange.300)_0_40%,theme(colors.purple.400)_40%_75%,theme(colors.pink.200)_75%_100%)] p-[6px]">
                <div className="grid size-full place-items-center overflow-hidden rounded-full bg-white">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={userName}
                      width={75}
                      height={75}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    // Fallback avatar (replace with your SVG if desired)
                    <div className="bg-secondary text-muted-foreground grid size-[75px] place-items-center rounded-full">
                      <Image
                        src={'/images/user.svg'}
                        alt={userName}
                        width={75}
                        height={75}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name (bold) and score badge */}
            <div className="relative">
              <div className="text-dark-3 mb-4 text-lg leading-5 font-bold">
                {userName}
              </div>
              <div className="border-border bg-light-orange/50 mb-1 inline-flex w-[105px] items-center justify-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] text-[#C25E19]">
                <StarIcon width={'10px'} />
                <span>{score} امتیاز</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hairline divider */}
        <div className="mx-5 mt-5 mb-3 h-px bg-[oklch(94%_0.004_506.32_/_.7)]" />

        {/* Menu list (scrollable, generous spacing).
            Each item: label on left, icon on right (RTL). */}
        <nav className="h-[84%] overflow-y-auto px-3 pb-[env(safe-area-inset-bottom,20px)]">
          <ul className="space-y-1">
            {menu.map((m, i) => {
              const content = (
                <div className="text-foreground/90 flex items-center justify-between gap-8 rounded-2xl px-3.5 py-[8px] transition hover:bg-white/60 dark:hover:bg-white/10">
                  <span className="text-[13px] font-medium">{m.label}</span>
                  <span className="text-gray stroke-middle-gray text-middle-gray fill-middle-gray text-[13px]">
                    {m.icon}
                  </span>
                </div>
              );
              return (
                <li key={i}>
                  {m.href ? (
                    // Link item → close on navigate
                    <Link
                      href={m.href}
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      {content}
                    </Link>
                  ) : (
                    // Action item → run onClick then close
                    <button
                      className="w-full text-right"
                      onClick={() => {
                        m.onClick?.();
                        setOpen(false);
                      }}
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
