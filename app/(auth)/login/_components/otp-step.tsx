import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LOGIN_STEPS } from '../page';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ArrowLeftIcon, LoaderCircleIcon } from 'lucide-react';
import { SendOTPIn } from '@/apis';
import { setCookie } from '@/utils/cookies';
import { COOKIE_KEYS } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const formSchema = z.object({
  code: z.string().min(1, { message: 'کد الزامی است' }),
});
type FormType = z.infer<typeof formSchema>;

export const OtpStep: FC<{
  setStep: Dispatch<SetStateAction<LOGIN_STEPS>>;
  phoneNumber: string;
  sendData: any;
  setSendData: Dispatch<SetStateAction<any>>;
}> = ({ setStep, phoneNumber, sendData, setSendData }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      data: FormType,
    ): Promise<{ data: { tokens: { access: string } } }> => {
      return apiCaller.auth.otp.verify.post({
        ...data,
        phone: phoneNumber,
      }) as any;
    },
    onSuccess: (data: { data: { tokens: { access: string } } }) => {
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, data?.data?.tokens?.access);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/');
    },
  });

  const sendMutation = useMutation({
    mutationFn: (data: SendOTPIn) => {
      return apiCaller.auth.otp.send.post(data) as any;
    },
    onSuccess: (data: { data: { cooldown_seconds: number }; ok: boolean }) => {
      setSendData(data?.data);
      if (data?.ok) {
        setTimeLeft(data?.data?.cooldown_seconds as number);
        setIsTimerActive(true);
        form.setValue('code', '');
      }
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });
  useEffect(() => {
    form.setFocus('code');
  }, []);

  const [timeLeft, setTimeLeft] = useState(
    (sendData?.cooldown_seconds as number) || 60,
  );
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(120);
    setIsTimerActive(true);
  }, [sendData]);

  const formatTime = (seconds: number) => seconds + ' ثانیه';

  const onSubmit = (values: FormType) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex flex-col items-center gap-10 overflow-hidden">
      <div className="relative -mt-80 h-170 w-150 overflow-hidden rounded-full bg-[linear-gradient(180deg,_#FF9AF6_0%,_#AB5BF8_100%)]">
        <Image
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          src="/images/bg-otp.webp"
          width={340}
          height={340}
          alt=""
        />
      </div>
      <Button
        type="button"
        className="absolute top-4 left-4"
        variant="secondary"
        size="icon"
        mode="icon"
        shape="circle"
        onClick={() => setStep(LOGIN_STEPS.PHONE)}
      >
        <ArrowLeftIcon className="stroke-dark-3 size-4" />
      </Button>
      <Form {...form}>
        <form
          className="container-main relative flex size-full max-w-85 flex-col items-center gap-6 text-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-dark-2 text-sm font-medium">
            لطفا کد ارسال شده به شماره {phoneNumber} را وارد کنید
          </p>
          <FormField
            control={form.control}
            name="code"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="">
                <FormControl>
                  <InputOTP
                    maxLength={5}
                    {...field}
                    onChange={(val) => {
                      onChange(val);
                      if (val.length === 5) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isTimerActive ? (
            <p className="text-dark-3 text-sm font-medium">
              {formatTime(timeLeft)} تا ارسال مجدد
            </p>
          ) : (
            <Button
              type="button"
              variant="dim"
              size="sm"
              disabled={sendMutation.isPending}
              onClick={() => sendMutation.mutate({ phone: phoneNumber })}
              className="text-primary hover:text-primary/80 h-auto text-sm font-medium"
            >
              {sendMutation.isPending ? (
                <LoaderCircleIcon className="ml-1 size-3 animate-spin" />
              ) : null}
              ارسال مجدد کد
            </Button>
          )}

          <Button
            size="lg"
            className="w-full rounded-2xl"
            type="submit"
            disabled={mutation.isPending || sendMutation.isPending}
          >
            {mutation.isPending || sendMutation.isPending ? (
              <LoaderCircleIcon className="ml-1 size-3 animate-spin" />
            ) : null}
            ورود
          </Button>
        </form>
      </Form>
    </div>
  );
};
