'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';
import { ClassesIcon } from '../icons/classes-icon';
import { HomeIcon } from '../icons/home-icon';
import { EventsMenuIcon } from '../icons/events-menu-icon';
import { MoneyBagIcon } from '../icons/money-bag-icon';
import { PaymentDialog } from '../shared/payment-dialog';
import SidebarDrawer from './sidebar-drawer';
import { ClassDetailDialog } from '@/app/(dash)/classes/_components/class-detail-dialog';
import { SalonDialog } from '../shared/salon-dialog';
import DashboardHeader from './dashboard-header';

const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const navItems = [
    {
      icon: (
        <ClassesIcon
          className={cn(
            'stroke-zinc-400',
            isActive('/classes') && 'stroke-purple-500',
          )}
        />
      ),
      width: 48,
      height: 39,
      label: 'کلاس‌ها',
      href: '/classes',
    },
    {
      icon: (
        <HomeIcon
          className={cn(
            'stroke-zinc-400',
            isActive('/') && 'stroke-purple-500',
          )}
        />
      ),
      width: 36,
      height: 36,
      label: 'خانه',
      href: '/',
    },
    {
      icon: (
        <EventsMenuIcon
          width={34}
          height={34}
          className={cn(
            'stroke-zinc-400',
            isActive('/events') && 'stroke-purple-500',
          )}
        />
      ),
      width: 34,
      height: 34,
      label: 'رویدادها',
      href: '/events',
    },
    {
      icon: (
        <MoneyBagIcon
          className={cn(
            'stroke-zinc-400',
            isActive('/fin') && 'stroke-purple-500',
          )}
        />
      ),
      width: 34,
      height: 34,
      label: 'مالی',
      href: '/fin',
    },
  ];
  const index = navItems.findIndex((item) => item.href === pathname);

  const paymentDialog = useOpen('payment');

  return (
    <>
      <div className="size-full bg-white">
        <div className="h-[calc(100%-80px)] w-full overflow-auto pb-10">
          <DashboardHeader />

          {children}
          <nav className="fixed bottom-9.5 flex h-19 w-[calc(100%-32px)] max-w-[calc(var(--container-md)-32px)] -translate-x-4 flex-row justify-center gap-10 rounded-full bg-linear-22 bg-gradient-to-tr from-white from-[14%] to-purple-100 to-[86%] px-1.5 shadow-[0px_1px_3px_0px] shadow-black/25">
            <div className="relative flex flex-row items-center justify-center gap-10">
              <motion.div
                initial={{ right: -13.5 + (48 + 40) * (index + 0) }}
                animate={{ right: -13.5 + (48 + 40) * (index + 0) }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute -top-9 flex size-[75px] items-center justify-center rounded-full border-[0.3px] border-white bg-orange-50/10 backdrop-blur-xs"
              >
                <div className="size-13.5 rounded-full bg-white" />
              </motion.div>
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className="z-1 flex w-[48px] basis-[48px] flex-col items-center justify-center gap-[2px]"
                >
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: isActive(item.href) ? -26 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ width: item.width, height: item.height }}
                    className="flex min-h-9 min-w-9 items-center justify-center"
                  >
                    {item.icon}
                  </motion.div>
                  <span
                    className={cn(
                      'text-sm font-medium text-zinc-400',
                      pathname === item.href && 'text-purple-500',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
          <PaymentDialog />
        </div>
      </div>
      <ClassDetailDialog />
      <SalonDialog />
      <SidebarDrawer userName="سارا اکبری" score={35} />
    </>
  );
};

export { DashboardLayout };
