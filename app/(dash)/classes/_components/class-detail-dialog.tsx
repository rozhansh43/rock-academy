import { FC } from 'react';
import { FullscreenDialog, useOpen } from '@/components/ui/fullscreen-dialog';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/strings';
import { useQueryState } from 'nuqs';

export const ClassDetailDialog: FC = () => {
  const [id, setId] = useQueryState('id');
  const detailDialog = useOpen('class-detail');

  const query = useQuery({
    enabled: !!id,
    queryKey: ['class-detail', id],
    queryFn: () => apiCaller.offerings.events.$id.get(id ?? ''),
  });
  const data = (query.data as any)?.data as typeof query.data;

  const items = [
    {
      label: 'تاریخ شروع',
      value: data?.start_date || '-',
    },
    {
      label: 'تاریخ پایان',
      value: data?.end_date || '-',
    },
    {
      label: 'روزهای برگزاری',
      value: data?.weekdays_fa?.join('، ') || '-',
    },
    {
      label: 'ساعت برگزاری',
      value:
        data?.time_range?.from || '-' + ' تا ' + data?.time_range?.to || '-',
    },
    {
      label: 'نام مربی',
      value: '?',
    },
    {
      label: 'تعداد جلسات',
      value: data?.sessions_count || '-',
    },
    {
      label: 'سالن',
      value: data?.salon_name || '-',
    },
    {
      label: 'ظرفیت',
      value: data?.capacity ? `${data.capacity} نفر` : '-',
    },
  ];

  return (
    <FullscreenDialog
      id="class-detail"
      className="overflow-auto p-0"
      onClose={() => {
        setId(null);
      }}
    >
      <FullscreenDialog.Body className="flex flex-col">
        <Image
          src="/images/class-1.png"
          alt="class-detail-dialog"
          width={440}
          height={410}
          className="w-full basis-100 object-cover"
        />
        <div className="-mt-10 min-h-1/2 flex-1 rounded-t-4xl bg-white p-6">
          <h1 className="text-xl font-bold">{data?.persian_name}</h1>
          <div className="mt-6 flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.label} className="flex flex-row gap-2 text-sm">
                <span className="text-middle-gray basis-25">{item.label}</span>
                <span className="text-dark-1 flex-1 border-b pb-1">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          {data?.description && (
            <>
              <h2 className="text-dark-2 mt-6 text-base font-medium">معرفی</h2>
              <p
                className="text-dark-1 text-sm"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></p>
            </>
          )}
        </div>
        <div className="bg-linear div sticky bottom-0 flex w-full flex-row items-center justify-between gap-1 rounded-t-3xl bg-gradient-to-t from-white to-purple-100 p-6">
          <Button
            size="lg"
            className="h-13 w-40 rounded-4xl text-lg font-semibold"
          >
            ثبت نام
          </Button>
          <span className="text-dark-1 text-lg font-medium">
            {formatPrice(data?.price)} تومان
          </span>
        </div>
      </FullscreenDialog.Body>
    </FullscreenDialog>
  );
};
