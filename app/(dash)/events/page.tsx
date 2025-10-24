'use client';

import { apiCaller } from '@/apis/api-caller';
import { ProfileDialog } from '@/components/shared/profile-dialog';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, ChevronLeftIcon, MenuIcon } from 'lucide-react';
import Image from 'next/image';

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
    queryFn: () => apiCaller.offerings.events.get(1, '', undefined),
  });
  const data = (query.data as any)?.data as typeof query.data;

  return (
    <div className="container-main space-y-8">
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
            <span className="text-middle-gray">{weekday}</span>
          ))}
          {Array.from({
            length: (calenderData?.data?.days?.[0]?.jalali?.weekday || 1) - 1,
          }).map(() => (
            <span />
          ))}
          {calenderData.data.days.map((day) => (
            <span className="text-dark-1 block h-9.5 w-6.5 justify-self-center rounded-full border pt-1 text-[13px] font-medium">
              {day.jalali.d}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4.5 flex flex-col gap-4">
        {query.isLoading ? (
          <p className="text-dark-2 text-center text-base font-medium">
            در حال بارگذاری...
          </p>
        ) : data?.results && data?.results?.length > 0 ? (
          data?.results?.map((item) => (
            <div key={item.id} className="rounded-[20px] bg-white p-3">
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
                <div className="space-x-3">
                  <Button
                    size="sm"
                    className="w-17"
                    // @ts-ignore
                    disabled={!item.is_registration_active}
                  >
                    ثبت نام
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {}}>
                    اطلاعات بیشتر
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Image src="/images/no-data.png" width={200} height={200} alt="" />
            <p className="text-dark-2">در این تاریخ هیچ دوره‌ای یافت نشد!</p>
          </div>
        )}
      </div>
    </div>
  );
}
