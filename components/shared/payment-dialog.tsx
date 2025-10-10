import { FC, useId, useState } from 'react';
import { FullscreenDialog } from '../ui/fullscreen-dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { formatPrice } from '@/utils/strings';
import { Button } from '../ui/button';

export const PaymentDialog: FC = () => {
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();
  const [acceptTerms, setAcceptTerms] = useState(true);

  return (
    <FullscreenDialog id="payment" className="dash-gradient" onClose={() => {}}>
      <FullscreenDialog.Header>
        <FullscreenDialog.Title className="text-dark-2 text-center">
          پرداخت
        </FullscreenDialog.Title>
      </FullscreenDialog.Header>
      <FullscreenDialog.Body className="relative flex h-full flex-col gap-8">
        <div className="flex flex-col gap-1 text-base text-[#696969]">
          <span>رگتون -ترم 2</span>
          <span>سه شنبه_پنجشنبه</span>
          <span>18-20</span>
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
              className=""
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
        <div>
          <div className="text-lg font-semibold text-[#4E4E4E]">
            جزییات پرداخت
          </div>
          <div className="mt-3 flex flex-col gap-3 border-b px-8 pb-3">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-[#8E8E8E]">رگتون-ترم 2</span>
              <span className="text-[#3C3C3C]">
                {formatPrice(2000000)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-[#8E8E8E]">تخفیف</span>
              <span className="text-[#3C3C3C]">0</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-[#8E8E8E]">جمع خرید</span>
              <span className="text-[#3C3C3C]">
                {formatPrice(2000000)} تومان
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 px-8 pt-4 text-sm">
            <span className="text-[#3C3C3C]">مبلغ قابل پرداخت</span>
            <span className="text-primary">{formatPrice(2000000)} تومان</span>
          </div>
        </div>
        <div className="flex-1" />

        <div className="bg-linear sticky bottom-0 left-0 flex w-full max-w-[calc(var(--w-md)-1px)] translate-6 flex-row items-center justify-between gap-1 rounded-t-3xl bg-gradient-to-t from-white to-purple-100 p-6">
          <Button
            size="lg"
            className="w-40 rounded-4xl text-lg font-semibold"
            // disabled={!data?.is_registration_active}
          >
            پرداخت
          </Button>

          <div className="flex flex-col items-center gap-1">
            <div className="text-light-1 text-sm">مبلغ قابل پرداخت</div>
            <span className="text-dark-1 text-lg font-semibold">
              {formatPrice(2000000)} تومان
            </span>
          </div>
        </div>
      </FullscreenDialog.Body>
    </FullscreenDialog>
  );
};
