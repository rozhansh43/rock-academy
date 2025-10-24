'use client';

import { apiCaller } from '@/apis/api-caller';
import { ProfileDialog } from '@/components/shared/profile-dialog';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, ChevronLeftIcon, MenuIcon } from 'lucide-react';

const weekdays = ['شنبه', '1شنبه', '2شنبه', '3شنبه', '4شنبه', '5شنبه', 'جمعه'];

export default function Page() {
  const calenderData = {
    ok: true,
    data: {
      period: 'month',
      anchor_date: '2025-11-01',
      range: {
        start: '2025-10-23',
        end: '2025-11-21',
      },
      days: [
        {
          date: '2025-10-23',
          jalali: {
            y: 1404,
            m: 8,
            d: 1,
            weekday: 6,
            weekday_fa: 'پنجشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-24',
          jalali: {
            y: 1404,
            m: 8,
            d: 2,
            weekday: 7,
            weekday_fa: 'جمعه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-25',
          jalali: {
            y: 1404,
            m: 8,
            d: 3,
            weekday: 1,
            weekday_fa: 'شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-26',
          jalali: {
            y: 1404,
            m: 8,
            d: 4,
            weekday: 2,
            weekday_fa: 'یکشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-27',
          jalali: {
            y: 1404,
            m: 8,
            d: 5,
            weekday: 3,
            weekday_fa: 'دوشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-28',
          jalali: {
            y: 1404,
            m: 8,
            d: 6,
            weekday: 4,
            weekday_fa: 'سه‌شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-29',
          jalali: {
            y: 1404,
            m: 8,
            d: 7,
            weekday: 5,
            weekday_fa: 'چهارشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-30',
          jalali: {
            y: 1404,
            m: 8,
            d: 8,
            weekday: 6,
            weekday_fa: 'پنجشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-10-31',
          jalali: {
            y: 1404,
            m: 8,
            d: 9,
            weekday: 7,
            weekday_fa: 'جمعه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-01',
          jalali: {
            y: 1404,
            m: 8,
            d: 10,
            weekday: 1,
            weekday_fa: 'شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-02',
          jalali: {
            y: 1404,
            m: 8,
            d: 11,
            weekday: 2,
            weekday_fa: 'یکشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-03',
          jalali: {
            y: 1404,
            m: 8,
            d: 12,
            weekday: 3,
            weekday_fa: 'دوشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-04',
          jalali: {
            y: 1404,
            m: 8,
            d: 13,
            weekday: 4,
            weekday_fa: 'سه‌شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-05',
          jalali: {
            y: 1404,
            m: 8,
            d: 14,
            weekday: 5,
            weekday_fa: 'چهارشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-06',
          jalali: {
            y: 1404,
            m: 8,
            d: 15,
            weekday: 6,
            weekday_fa: 'پنجشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-07',
          jalali: {
            y: 1404,
            m: 8,
            d: 16,
            weekday: 7,
            weekday_fa: 'جمعه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-08',
          jalali: {
            y: 1404,
            m: 8,
            d: 17,
            weekday: 1,
            weekday_fa: 'شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-09',
          jalali: {
            y: 1404,
            m: 8,
            d: 18,
            weekday: 2,
            weekday_fa: 'یکشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-10',
          jalali: {
            y: 1404,
            m: 8,
            d: 19,
            weekday: 3,
            weekday_fa: 'دوشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-11',
          jalali: {
            y: 1404,
            m: 8,
            d: 20,
            weekday: 4,
            weekday_fa: 'سه‌شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-12',
          jalali: {
            y: 1404,
            m: 8,
            d: 21,
            weekday: 5,
            weekday_fa: 'چهارشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-13',
          jalali: {
            y: 1404,
            m: 8,
            d: 22,
            weekday: 6,
            weekday_fa: 'پنجشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-14',
          jalali: {
            y: 1404,
            m: 8,
            d: 23,
            weekday: 7,
            weekday_fa: 'جمعه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-15',
          jalali: {
            y: 1404,
            m: 8,
            d: 24,
            weekday: 1,
            weekday_fa: 'شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-16',
          jalali: {
            y: 1404,
            m: 8,
            d: 25,
            weekday: 2,
            weekday_fa: 'یکشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-17',
          jalali: {
            y: 1404,
            m: 8,
            d: 26,
            weekday: 3,
            weekday_fa: 'دوشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-18',
          jalali: {
            y: 1404,
            m: 8,
            d: 27,
            weekday: 4,
            weekday_fa: 'سه‌شنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-19',
          jalali: {
            y: 1404,
            m: 8,
            d: 28,
            weekday: 5,
            weekday_fa: 'چهارشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-20',
          jalali: {
            y: 1404,
            m: 8,
            d: 29,
            weekday: 6,
            weekday_fa: 'پنجشنبه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
        {
          date: '2025-11-21',
          jalali: {
            y: 1404,
            m: 8,
            d: 30,
            weekday: 7,
            weekday_fa: 'جمعه',
          },
          counts: {
            class: 0,
            event: 0,
            workshop: 0,
            salon: 0,
          },
          total: 0,
          has_any: false,
        },
      ],
      summary: {
        total_registrable_offerings: 0,
        days_with_any: 0,
      },
    },
    error: null,
    meta: {
      request_id: '9af6303b-8d6e-41ff-9071-2e5d72dc43f5',
      version: 'v1',
    },
  };

  const query = useQuery({
    queryKey: ['events'],
    queryFn: () => apiCaller.offerings.events.get(1, '', 'event'),
  });
  const data = (query.data as any)?.data as typeof query.data;

  console.log(data);

  return (
    <div className="container-main mt-8 space-y-8">
      <div className="flex flex-row items-center justify-between gap-2.5">
        <div className="flex-1" />

        <ProfileDialog />
        <Button variant="dim" mode="icon">
          <MenuIcon className="size-6 stroke-zinc-500" />
        </Button>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[30px] border border-[#DEDEDE] bg-white px-2 py-6">
        <div className="flex flex-row-reverse items-center justify-center gap-4">
          <Button
            variant="outline"
            shape="circle"
            mode="icon"
            size="sm"
            className="border-[#787777]!"
          >
            <ChevronLeftIcon className="size-5 stroke-[#787777] opacity-100" />
          </Button>
          <span className="text-middle-gray text-lg font-extrabold">
            آبان 1404
          </span>
          <Button
            variant="outline"
            shape="circle"
            mode="icon"
            size="sm"
            className="border-[#787777]!"
          >
            <ChevronRightIcon className="size-5 stroke-[#787777] opacity-100" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-4 text-center text-sm">
          {weekdays.map((weekday) => (
            <span key={weekday.toString()} className="text-middle-gray">
              {weekday}
            </span>
          ))}
          {Array.from({
            length: (calenderData?.data?.days?.[0]?.jalali?.weekday || 1) - 1,
          }).map((index) => (
            <span key={index?.toString()} />
          ))}
          {calenderData.data.days.map((day, index) => (
            <span
              key={index}
              className="text-dark-1 block h-9.5 w-6.5 justify-self-center rounded-full border pt-1 text-[13px] font-medium"
            >
              {day.jalali.d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
