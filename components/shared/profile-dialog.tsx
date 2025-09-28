import { FullscreenDialog, useOpen } from '@/components/ui/fullscreen-dialog';
import { Button } from '@/components/ui/button';
import { ProfileIcon } from '@/components/icons/profile-icon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { MeProfile } from '@/apis/models/MeProfile';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputPattern } from '@/components/ui/input';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'نام الزامی است' }),
  lastName: z.string().min(1, { message: 'نام خانوادگی الزامی است' }),
  phone: z.string().min(1, { message: 'شماره موبایل الزامی است' }),
  nationalId: z.string().optional(),
  birthDate: z.string().optional(),
  email: z.email({ message: 'ایمیل معتبر نیست' }).nullish().optional(),
});
type FormType = z.infer<typeof formSchema>;

export const ProfileDialog = () => {
  const { open, close } = useOpen('profile');

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<{ data: MeProfile }>([
    'profile',
  ])?.data;

  const mutation = useMutation({
    mutationFn: (data: MeProfile) => {
      return apiCaller.auth.accounts.profile.put(data);
    },
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      nationalId: '',
      email: '',
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        phone: profileData.phone,
        nationalId: profileData.national_id || undefined,
        email: profileData.email || undefined,
        birthDate: profileData.birth_date || undefined,
      });
    }
  }, [profileData]);

  return (
    <>
      <Button variant="dim" mode="icon" onClick={() => open()} type="button">
        <ProfileIcon className="size-6 stroke-zinc-500" />
      </Button>
      <FullscreenDialog id="profile" className="dash-gradient">
        <FullscreenDialog.Header>
          <FullscreenDialog.Title className="text-dark-2 text-center">
            حساب کاربری
          </FullscreenDialog.Title>
        </FullscreenDialog.Header>
        <FullscreenDialog.Body>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit((values) => {
                mutation.mutate({
                  first_name: values.firstName,
                  last_name: values.lastName,
                  phone: values.phone,
                  national_id: values.nationalId || undefined,
                  birth_date: values.birthDate || undefined,
                  email: values.email || undefined,
                });
              })}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input
                        variant="lg"
                        placeholder="نام خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input
                        variant="lg"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>شماره موبایل</FormLabel>
                    <FormControl>
                      <InputPattern
                        variant="lg"
                        readOnly
                        className="tracking-widest placeholder:text-right"
                        placeholder="شماره موبایل خود را وارد کنید"
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
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>کد ملی</FormLabel>
                    <FormControl>
                      <InputPattern
                        variant="lg"
                        className="tracking-widest placeholder:text-right"
                        placeholder="کد ملی خود را وارد کنید"
                        format="##########"
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
                className="mt-2 w-full"
                size="lg"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                ثبت اطلاعات
              </Button>
            </form>
          </Form>
        </FullscreenDialog.Body>
      </FullscreenDialog>
    </>
  );
};
