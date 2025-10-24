'use client';
import { format, setMonth, newDate, toDate } from 'date-fns-jalali';
import { apiCaller } from '@/apis/api-caller';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MenuIcon,
  Loader2Icon,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { DANCE_STYLE, danceStylesObj } from '@/types/constants';
import { useQueryState } from 'nuqs';
import { useOpen } from '@/hooks/use-open';
import { ClassDetailDialog } from '../classes/_components/class-detail-dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { formatPrice } from '@/utils/strings';
import { Badge } from '@/components/ui/badge';

const weekdays = ['شنبه', '1شنبه', '2شنبه', '3شنبه', '4شنبه', '5شنبه', 'جمعه'];

export default function Page() {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM-dd'));
  const splittedMonth = month.split('-').map((i) => +i);
  const [activeDate, setActiveDate] = useState('');

  const calendarQuery = useQuery({
    gcTime: Infinity,
    staleTime: Infinity,
    queryKey: ['calendar-event', month],
    queryFn: () =>
      apiCaller.calendar.events.calendar.get(
        'month',
        undefined,
        undefined,
        undefined,
        month.slice(0, 8) + '01',
      ),
  });
  const calenderData = (calendarQuery.data as any)
    ?.data as typeof calendarQuery.data;

  const query = useQuery({
    staleTime: 0,
    gcTime: 5000,
    enabled: !!activeDate,
    queryKey: ['events', activeDate],
    queryFn: () =>
      apiCaller.offerings.events.get(
        1,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        activeDate,
        activeDate,
        'overlap',
      ),
  });
  const data = (query.data as any)?.data as typeof query.data;

  const queryClient = useQueryClient();
  const [, setId] = useQueryState('id');
  const detailDialog = useOpen('class-detail');
  const eventDrawer = useOpen('content', 'drawer');
  const paymentDialog = useOpen('payment');

  return (
    <>
      <div className="container-main space-y-8">
        <div className="flex min-h-[384px] w-full flex-col items-center gap-4 rounded-[30px] border border-[#DEDEDE] bg-white px-2 py-6">
          <div className="flex flex-row-reverse items-center justify-center gap-4">
            <Button
              variant="outline"
              shape="circle"
              mode="icon"
              size="sm"
              className="border-[#787777]!"
              onClick={() => {
                setActiveDate('');
                setMonth(
                  format(
                    newDate(splittedMonth[0], splittedMonth[1], 1),
                    'yyyy-MM-dd',
                  ),
                );
              }}
            >
              <ChevronLeftIcon className="size-5 stroke-[#787777] opacity-100" />
            </Button>
            <span className="text-middle-gray text-lg font-extrabold">
              {`${format(newDate(splittedMonth[0], splittedMonth[1] - 1, 1), 'MMMM')} ${format(newDate(splittedMonth[0], splittedMonth[1] - 1, 1), 'yyyy')}`}
            </span>
            <Button
              variant="outline"
              shape="circle"
              mode="icon"
              size="sm"
              className="border-[#787777]!"
              onClick={() => {
                setActiveDate('');
                setMonth(
                  format(
                    newDate(splittedMonth[0], splittedMonth[1] - 2, 1),
                    'yyyy-MM-dd',
                  ),
                );
              }}
            >
              <ChevronRightIcon className="size-5 stroke-[#787777] opacity-100" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-4 text-center text-sm">
            {weekdays.map((weekday) => (
              <span className="text-middle-gray">{weekday}</span>
            ))}
            {calendarQuery.isLoading ? (
              <div className="col-span-7 mx-auto pt-20">
                <Loader2Icon className="text-dark-3 animate-spin" />
              </div>
            ) : !!calenderData?.days?.length ? (
              <>
                {Array.from({
                  length: (calenderData?.days?.[0]?.jalali?.weekday || 1) - 1,
                }).map(() => (
                  <span />
                ))}
                {calenderData?.days?.map((day) => (
                  <Button
                    variant="outline"
                    className={cn(
                      'border-light-1 text-dark-2 h-9.5 w-6.5 flex-col justify-self-center rounded-full border pt-1 text-[13px] font-medium',
                      Number(activeDate.slice(8, 10)) === day.jalali?.d &&
                        'bg-light-orange hover:bg-light-orange/90',
                    )}
                    onClick={() => {
                      const m = day.jalali?.m || 0;
                      const d = day.jalali?.d || 0;
                      setActiveDate(
                        `${day.jalali?.y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`,
                      );
                    }}
                  >
                    {day?.jalali?.d || '-'}
                    <div
                      className={cn(
                        'bg-light-orange invisible size-1 rounded-full',
                        !!day.total && 'visible',
                        Number(activeDate.slice(8, 10)) === day.jalali?.d &&
                          'bg-orange',
                      )}
                    />
                  </Button>
                ))}
              </>
            ) : (
              <p>مشکلی بوجود آمده است لطفا مجدد تلاش کنید</p>
            )}
          </div>
        </div>

        {!activeDate ? (
          <p className="text-dark-3 text-center text-lg font-semibold">
            ابتدا یک روز را انتخاب کنید
          </p>
        ) : (
          <div className="mt-4.5 flex flex-col gap-4">
            {query.isLoading ? (
              <p className="text-dark-2 text-center text-base font-medium">
                در حال بارگذاری...
              </p>
            ) : data?.results && data?.results?.length > 0 ? (
              data?.results?.map((item) => (
                <div
                  key={item.id}
                  className="flex cursor-pointer flex-row items-center justify-between rounded-[20px] bg-white p-3 drop-shadow-xs"
                  style={{
                    backgroundColor:
                      // @ts-ignore
                      danceStylesObj?.[item?.dance_style as DANCE_STYLE]?.bg +
                      '80',
                  }}
                  onClick={() => {
                    if (item.kind === 'class') {
                      setId(item.id?.toString() ?? '');
                      detailDialog.open();
                    } else {
                      setId(item.id?.toString() ?? '');
                      eventDrawer.open();
                    }
                  }}
                >
                  <div className="flex flex-col justify-between gap-2">
                    <h3 className="text-dark-1 text-sm font-bold">
                      {item.persian_name}
                    </h3>
                    <p className="text-[11px] leading-[14.7px] font-medium">
                      <span className="text-light-1">مربی : </span>
                      <span className="text-dark-3">
                        {item?.instructor || '-'}
                      </span>
                    </p>
                    <p className="text-[11px] leading-[14.7px] font-medium">
                      <span className="text-light-1">روزهای برگزاری : </span>
                      <span className="text-dark-3">
                        {item.weekdays_fa?.join('، ') || '-'}
                      </span>
                    </p>
                    <p className="text-[11px] leading-[14.7px] font-medium">
                      <span className="text-light-1">بازه زمانی : </span>
                      <span className="text-dark-3" dir="ltr">
                        {item.start_time?.replaceAll(':00', '')} -{' '}
                        {item.end_time?.replaceAll(':00', '')}
                      </span>
                    </p>
                  </div>
                  <Image
                    src={
                      // @ts-ignore
                      danceStylesObj?.[item?.dance_style as DANCE_STYLE]?.img ||
                      ''
                    }
                    width={120}
                    height={120}
                    alt=""
                  />
                  <Drawer
                    open={eventDrawer.isOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        eventDrawer.close();
                      }
                    }}
                  >
                    <DrawerContent>
                      <div
                        className="container-main mb-7 text-[#444444] [&_h3]:mb-1 [&_h3,h4]:text-base [&_h3,h4]:font-bold [&_p,ul]:text-sm"
                        dangerouslySetInnerHTML={{
                          __html: item.description || '',
                        }}
                      />
                      <div className="bg-linear div sticky bottom-0 flex w-full flex-row items-center justify-between gap-1 rounded-t-3xl bg-gradient-to-t from-white to-purple-100 p-6">
                        <Button
                          size="lg"
                          className="h-13 w-40 rounded-4xl text-lg font-semibold"
                          onClick={() => {
                            queryClient.setQueryData(
                              ['payment-item'],
                              () => item,
                            );
                            paymentDialog.open();
                          }}
                        >
                          رزرو رویداد
                        </Button>
                        {!item?.discount_percentage ? (
                          <span className="text-dark-1 text-lg font-semibold">
                            {formatPrice(item?.price)} تومان
                          </span>
                        ) : (
                          <div className="text-dark-1 flex flex-col items-end gap-1 text-lg font-semibold">
                            <div className="flex flex-row items-center gap-2">
                              <Badge
                                shape="circle"
                                variant="primary"
                                className="font-bold"
                              >
                                {item?.discount_percentage}%
                              </Badge>
                              <span className="text-light-1 text-sm line-through">
                                {formatPrice(item?.price)} تومان
                              </span>
                            </div>

                            <span>
                              {formatPrice(item?.price_after_discount)} تومان
                            </span>
                          </div>
                        )}
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="/images/no-data.png"
                  width={170}
                  height={170}
                  alt=""
                />
                <p className="text-dark-2">
                  در این تاریخ هیچ دوره‌ای یافت نشد!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <ClassDetailDialog />
    </>
  );
}
