'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Input, InputWrapper } from '@/components/ui/input';
import { DoorOpen, MenuIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventsMenuIcon } from '@/components/icons/events-menu-icon';
import { ClassesIcon } from '@/components/icons/classes-icon';
import { useQuery } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { useOpen } from '@/hooks/use-open';
import { useQueryState } from 'nuqs';
import { ClassDetailDialog } from './classes/_components/class-detail-dialog';
import { SalonDialog } from '@/components/shared/salon-dialog';

export default function Page() {
  const plugin = useRef(Autoplay({ delay: 2500 }));

  const [, setId] = useQueryState('id');
  const query = useQuery({
    queryKey: ['classes'],
    queryFn: () => apiCaller.offerings.events.get(1, '', 'class'),
  });
  const data = (query.data as any)?.data as typeof query.data;

  const detailDialog = useOpen('class-detail');
  const salonDialog = useOpen('salon');

  return (
    <div className="space-y-8">
      <div className="container-main mx-0 -mt-14.5 w-[calc(100%-90px)]">
        <InputWrapper variant="lg">
          <SearchIcon />
          <Input
            variant="lg"
            placeholder="نام کلاس مورد نظر خود را جستجو کنید."
          />
        </InputWrapper>
      </div>
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item} className="basis-[300px]">
              <Image
                src="/images/slider.png"
                width={394}
                height={235}
                alt="slider"
                className="h-full w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="container-main flex flex-row justify-center gap-4">
        <div className="flex size-22 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-white/50 shadow-xs backdrop-blur-md">
          <EventsMenuIcon
            className="stroke-orange-300"
            width={36}
            height={36}
          />
          <span className="text-middle-gray text-sm font-medium">رویدادها</span>
        </div>
        <div className="flex size-22 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-white/50 shadow-xs backdrop-blur-md">
          <DoorOpen
            onClick={() => {
              salonDialog.open();
            }}
            className="stroke-orange-300"
            strokeWidth={1.5}
            width={36}
            height={36}
          />
          <span className="text-middle-gray text-sm font-medium">
            رزرو سالن
          </span>
        </div>
        <div className="flex size-22 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-white/50 shadow-xs backdrop-blur-md">
          <ClassesIcon className="stroke-orange-300" width={48} height={39} />
          <span className="text-middle-gray text-sm font-medium">کلاس ها</span>
        </div>
      </div>

      <div className="container-main flex flex-col gap-4">
        {query.isLoading ? (
          <p className="text-dark-2 text-center text-base font-medium">
            در حال بارگذاری...
          </p>
        ) : data?.results && data?.results?.length > 0 ? (
          data?.results?.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer rounded-[20px] bg-white p-3 drop-shadow-xs"
              onClick={() => {
                setId(item.id?.toString() ?? '');
                detailDialog.open();
              }}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-dark-1 text-sm font-bold">
                  {item.persian_name}
                </h3>
                <p className="text-[11px] leading-[14.7px] font-medium">
                  <span className="text-light-1">مربی : </span>
                  <span className="text-dark-3">{item?.instructor || '-'}</span>
                </p>
                <p className="text-[11px] leading-[14.7px] font-medium">
                  <span className="text-light-1">روزهای برگزاری : </span>
                  <span className="text-dark-3">
                    {item.weekdays_fa?.join('، ') || '-'}
                  </span>
                </p>
                <p className="text-[11px] leading-[14.7px] font-medium">
                  <span className="text-light-1">بازه زمانی : </span>
                  <span className="text-dark-3">
                    {item.start_time?.replaceAll(':00', '')} -{' '}
                    {item.end_time?.replaceAll(':00', '')}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-dark-2 text-center text-base font-medium">
            هیچ کلاسی یافت نشد
          </p>
        )}
      </div>
      <ClassDetailDialog />
      <SalonDialog />
    </div>
  );
}
