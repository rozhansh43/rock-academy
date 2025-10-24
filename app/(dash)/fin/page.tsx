'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'paid' | 'pend' | 'past'>('paid');

  const tabs: { title: string; value: typeof activeTab }[] = [
    { title: 'پرداخت شده', value: 'paid' },
    { title: 'در انتظار', value: 'pend' },
    { title: 'از موعد گذشته', value: 'past' },
  ];

  return (
    <div className="container-main mt-1">
      <div className="flex flex-row justify-between">
        {tabs.map((item) => (
          <div key={item.value} className="flex flex-col items-center gap-0.5">
            <Button
              onClick={() => setActiveTab(item.value)}
              variant="dim"
              className={cn(
                'text-middle-gray text-base',
                item.value === activeTab &&
                  'text-primary hover:text-primary/90',
              )}
            >
              {item.title}
            </Button>
            <div
              className={cn(
                'bg-primary invisible size-2 rounded-full',
                item.value === activeTab && 'visible',
              )}
            />
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
}
