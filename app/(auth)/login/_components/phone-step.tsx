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
    <Form {...form}>
      <form
        className="flex size-full flex-col items-center gap-3 text-center"
        onSubmit={form.handleSubmit((values) => {
          setPhoneNumber(values.phone);
          mutation.mutate(values);
        })}
      >
        <div className="flex-1" />
        <div className="flex-1 grow-2">
          <h1 className="text-dark-2 text-xl font-semibold">ورود</h1>
          <p className="text-dark-2 mt-2.5 text-sm">
            لطفا شماره موبایل خود را وارد کنید
          </p>
          <FormField
            control={form.control}
            name="phone"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="mt-5">
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
        </div>
        <Button
          size="lg"
          className="w-56 rounded-2xl"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <LoaderCircleIcon className="ml-1 size-3 animate-spin" />
          ) : null}
          تایید
        </Button>
      </form>
    </Form>
  );
};
