'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { OfflineIcon } from '@/components/icons/offline';
import { SalonIcon } from '@/components/icons/salon';
import { ThursdayPlan } from '@/components/icons/thursday-plan';

type QuickActionsRowProps = {
  onOpenSalon: () => void;
  onOpenEvents?: () => void;
  onOpenClasses?: () => void;
};

export default function QuickActionsRow({
  onOpenSalon,
  onOpenEvents,
  onOpenClasses,
}: QuickActionsRowProps) {
  const Item = ({
    icon,
    label,
    onClick,
    className = '',
  }: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'flex size-24 flex-col items-center justify-center gap-2 rounded-2xl bg-white/60 shadow-xs backdrop-blur-md',
        className,
      )}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );

  return (
    <div className="container-main flex items-center justify-center gap-4">
      <Item
        className="bg-[#FFF2E4] text-sm text-[#FF832C]"
        icon={
          <ThursdayPlan className="fill-[#FF8E3F]" width={36} height={36} />
        }
        label="برنامه پنجشنبه"
        onClick={onOpenEvents}
      />
      <Item
        className="bg-[#ECF6FE] text-sm text-[#57B6FF]"
        icon={
          <SalonIcon
            className="stroke-[#57B6FF] text-[#57B6FF]"
            strokeWidth={1.5}
            width={36}
            height={36}
          />
        }
        label="رزرو سالن"
        onClick={onOpenSalon}
      />
      <Item
        className="bg-[#FFE2E2] text-sm text-[#FF4F4F]"
        icon={
          <OfflineIcon className="stroke-[#FF4F4F]" width={48} height={39} />
        }
        label="کلاس های آفلاین"
        onClick={onOpenClasses}
      />
    </div>
  );
}
