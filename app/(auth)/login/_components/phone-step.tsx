import { Dispatch, FC, SetStateAction, useEffect } from 'react';
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
import { MOBILE_REGEX } from '@/utils/regex';
import { LOGIN_STEPS } from '../page';
import { useMutation } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { InputPattern } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: 'شماره موبایل الزامی است' })
    .regex(MOBILE_REGEX, { message: 'شماره موبایل معتبر نیست' }),
});
type FormType = z.infer<typeof formSchema>;

export const PhoneStep: FC<{
  setStep: Dispatch<SetStateAction<LOGIN_STEPS>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setSendData: Dispatch<SetStateAction<any>>;
}> = ({ setStep, setPhoneNumber, setSendData }) => {
  const mutation = useMutation({
    mutationFn: (data: FormType) => {
      return apiCaller.auth.otp.send.post(data) as any;
    },
    onSuccess: (data: { data: { cooldown_seconds: number }; ok: boolean }) => {
      setSendData(data?.data);
      if (data?.ok) {
        setStep(LOGIN_STEPS.OTP);
      }
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  useEffect(() => {
    form.setFocus('phone');
  }, []);

  return (
    <div className="size-full bg-[url('/images/bg-login.webp')] bg-cover bg-no-repeat">
      <Form {...form}>
        <form
          className="container-main flex size-full max-w-80 -translate-y-10 flex-col items-center justify-center gap-9 text-center"
          onSubmit={form.handleSubmit((values) => {
            setPhoneNumber(values.phone);
            mutation.mutate(values);
          })}
        >
          <Image
            src="/images/logotype.webp"
            alt="logo"
            width={150}
            height={130}
          />
          <h1 className="text-dark-3 text-2xl font-bold">ورود/ثبت‌نام</h1>
          <p className="text-dark-2 text-sm">
            لطفا شماره موبایل خود را وارد کنید
          </p>
          <FormField
            control={form.control}
            name="phone"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="-mt-4 w-full">
                <FormControl>
                  <InputPattern
                    disabled={mutation.isPending}
                    variant="lg"
                    className="text-center tracking-widest"
                    placeholder="0912 ____ ____"
                    format="#### ### ####"
                    mask="_"
                    type="tel"
                    onValueChange={(values) => {
                      onChange(values.value);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="lg"
            className="w-full rounded-2xl"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <LoaderCircleIcon className="ml-1 size-3 animate-spin" />
            ) : null}
            دریافت کد
          </Button>
        </form>
      </Form>
    </div>
  );
};
