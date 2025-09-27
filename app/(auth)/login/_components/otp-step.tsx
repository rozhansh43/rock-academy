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

  return (
    <Form {...form}>
      <form
        className="relative flex size-full flex-col items-center gap-3 text-center"
        onSubmit={form.handleSubmit((values) => {
          mutation.mutate(values);
        })}
      >
        <Button
          type="button"
          className="absolute left-0"
          variant="outline"
          size="icon"
          mode="icon"
          onClick={() => setStep(LOGIN_STEPS.PHONE)}
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div className="flex-1" />
        <div className="flex-1 grow-2">
          <h1 className="text-dark-2 text-xl font-semibold">ورود</h1>
          <p className="text-dark-2 mt-2.5 text-sm">
            لطفا کد ارسال شده به شماره {phoneNumber} را وارد کنید
          </p>
          <FormField
            control={form.control}
            name="code"
            render={({ field: { ...field } }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <InputOTP maxLength={5} {...field}>
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
            <p className="text-dark-2 mt-3 text-xs">
              {formatTime(timeLeft)} تا ارسال مجدد
            </p>
          ) : (
            <Button
              type="button"
              variant="dim"
              size="sm"
              disabled={sendMutation.isPending}
              onClick={() => sendMutation.mutate({ phone: phoneNumber })}
              className="text-primary hover:text-primary/80 mt-3 h-auto text-xs"
            >
              {sendMutation.isPending ? (
                <LoaderCircleIcon className="ml-1 size-3 animate-spin" />
              ) : null}
              ارسال مجدد کد
            </Button>
          )}
        </div>
        <Button
          size="lg"
          className="w-56 rounded-2xl"
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
  );
};
