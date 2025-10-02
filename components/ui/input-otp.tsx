'use client';

import * as React from 'react';
import { cn } from '../../utils/cn';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput>) {
  return (
    <OTPInput
      dir="ltr"
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center justify-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      className={cn(
        'w-full! [clip-path:inset(0px_0px_0px_0px)]! disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      dir="ltr"
      data-slot="input-otp-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  const inputOTPContext: any = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] || {};

  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        'border-light-1 focus:border-ring relative flex h-10 w-10 items-center justify-center rounded-xl border border-y bg-white text-sm outline-hidden transition-all',
        isActive && 'ring-ring ring-offset-background z-10 ring-2',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Dot />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
