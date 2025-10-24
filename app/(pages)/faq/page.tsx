'use client';

import { ProfileDialog } from '@/components/shared/profile-dialog';
import { Button } from '@/components/ui/button';
import { MenuIcon, ChevronDown } from 'lucide-react';
import { mockData } from './mock-data';
import { useState } from 'react';

export default function Page() {
  const [selectedFaqId, setSelectedFaqId] = useState<number | null>(null);
  const handleFaqClick = (id: number) => {
    setSelectedFaqId(selectedFaqId === id ? null : id);
  };

  return (
    <div className="container-main pt-8">
      <div className="flex flex-row items-center justify-between gap-2.5">
        <p className="text-middle-gray text-xl font-bold">سوالات متداول</p>

        <div>
          <ProfileDialog />
          <Button variant="dim" mode="icon">
            <MenuIcon className="size-6 stroke-zinc-500" />
          </Button>
        </div>
      </div>
      <div className="mt-4.5 flex flex-col gap-4">
        {mockData.map((item) => (
          <div
            key={item.id}
            className={`border-light-2 cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
              selectedFaqId === item.id ? 'border-purple' : ''
            }`}
            onClick={() => handleFaqClick(item.id)}
          >
            <div className="flex items-center justify-between">
              <p className="text-dark-1 text-sm font-bold">{item.question}</p>
              <ChevronDown
                className={`size-4 text-gray-600 transition-transform duration-200 ${
                  selectedFaqId === item.id ? 'rotate-180' : ''
                }`}
              />
            </div>
            {selectedFaqId === item.id && (
              <p className="text-dark-3 mt-3 pr-4 text-sm">
                {item.answer_text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
