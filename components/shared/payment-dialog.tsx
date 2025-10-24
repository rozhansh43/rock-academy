import { FC, useId, useState } from 'react';
import { FullscreenDialog } from '../ui/fullscreen-dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { formatPrice } from '@/utils/strings';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarService } from '@/apis';

export const PaymentDialog: FC = () => {
  const queryClient = useQueryClient();
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();
  const [acceptTerms, setAcceptTerms] = useState(true);

  const itemData: any = queryClient.getQueryData(['payment-item']);

  console.log(itemData);

  return (
    <FullscreenDialog
      id="payment"
      className="bg-light-3 p-0"
      onClose={() => {}}
    >
      <FullscreenDialog.Header className="pt-7">
        <FullscreenDialog.Title className="text-dark-2 text-center">
          پرداخت
        </FullscreenDialog.Title>
      </FullscreenDialog.Header>
      <FullscreenDialog.Body className="container-main relative mb-25 flex h-full flex-col gap-8">
        <div className="flex flex-col gap-1 text-base text-[#696969]">
          <span>{itemData?.persian_name}</span>
          <span>{itemData?.weekdays_fa?.join('، ') || '-'}</span>
          <span
            dir="ltr"
            className="w-fit"
          >{`${itemData?.time_range?.from || ''} - ${itemData?.time_range?.to || ''}`}</span>
        </div>
        <div className="text-lg font-semibold text-[#4E4E4E]">نوع پرداخت</div>
        <RadioGroup defaultValue="cash">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id={id1} />
            <Label htmlFor={id1} variant="secondary">
              پرداخت کامل
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="installment"
              id={id2}
              disabled
              className="text-white!"
            />
            <Label htmlFor={id2} variant="secondary">
              پرداخت قسطی (بزودی)
            </Label>
          </div>
        </RadioGroup>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={id3}
            size="sm"
            checked={acceptTerms}
            onCheckedChange={(value) => setAcceptTerms(!!value)}
          />
          <Label htmlFor={id3} variant="secondary" className="text-xs">
            با قوانین و مقررات موافقم.
          </Label>
        </div>
        {acceptTerms && (
          <div>
            <div className="text-lg font-semibold text-[#4E4E4E]">
              جزییات پرداخت
            </div>
            <div className="mt-3 flex flex-col gap-3 border-b px-8 pb-3">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-[#8E8E8E]">{itemData?.persian_name}</span>
                <span className="text-[#3C3C3C]">
                  {formatPrice(itemData?.price)} تومان
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-[#8E8E8E]">تخفیف</span>
                <span className="text-[#3C3C3C]">
                  {itemData?.discount_percentage}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-[#8E8E8E]">جمع خرید</span>
                <span className="text-[#3C3C3C]">
                  {formatPrice(itemData?.price)} تومان
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-8 pt-4 text-sm">
              <span className="text-[#3C3C3C]">مبلغ قابل پرداخت</span>
              <span className="text-primary">
                {formatPrice(itemData?.price_after_discount)} تومان
              </span>
            </div>
          </div>
        )}
        <div className="flex-1" />
      </FullscreenDialog.Body>
      <div className="bg-linear sticky bottom-0 left-0 flex w-full max-w-[calc(var(--w-md)-1px)] translate-0 flex-row items-center justify-between gap-1 rounded-t-3xl bg-gradient-to-t from-white to-purple-100 p-6">
        <Button
          size="lg"
          className="w-40 rounded-4xl text-lg font-semibold"
          disabled={!acceptTerms}
        >
          پرداخت
        </Button>

        <div className="flex flex-col items-center gap-1">
          <div className="text-light-1 text-sm">مبلغ قابل پرداخت</div>
          <span className="text-dark-1 text-lg font-semibold">
            {formatPrice(itemData?.price_after_discount)} تومان
          </span>
        </div>
      </div>
    </FullscreenDialog>
  );
};
