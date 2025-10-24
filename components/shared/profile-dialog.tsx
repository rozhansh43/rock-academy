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
import { request } from '@/apis/core/request';
import { OpenAPI } from '@/apis/core/OpenAPI';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputPattern } from '@/components/ui/input';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AvatarUpload from '../ui/avatar-upload';
import { FileWithPreview } from '@/hooks/use-file-upload';
import { useState } from 'react';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'نام الزامی است' }),
  lastName: z.string().min(1, { message: 'نام خانوادگی الزامی است' }),
  phone: z.string().min(1, { message: 'شماره موبایل الزامی است' }),
  nationalId: z.string().optional(),
  birthDate: z.string().optional(),
  email: z.email({ message: 'ایمیل معتبر نیست' }).optional(),
});
type FormType = z.infer<typeof formSchema>;

export const ProfileDialog = () => {
  const { open, close } = useOpen('profile');
  const [selectedAvatar, setSelectedAvatar] = useState<FileWithPreview | null>(
    null,
  );

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<{ data: MeProfile }>([
    'profile',
  ])?.data;

  const mutation = useMutation({
    mutationFn: async (data: { profile: MeProfile; avatar?: File }) => {
      if (data.avatar) {
        // Send form-data with avatar
        const formDataObj = {
          avatar: data.avatar,
          first_name: data.profile.first_name || '',
          last_name: data.profile.last_name || '',
          phone: data.profile.phone || '',
          ...(data.profile.national_id && {
            national_id: data.profile.national_id,
          }),
          ...(data.profile.birth_date && {
            birth_date: data.profile.birth_date,
          }),
          ...(data.profile.email && { email: data.profile.email }),
        };

        // Use the direct request function with formData
        return request<MeProfile>(OpenAPI, {
          method: 'PATCH',
          url: '/auth/accounts/profile/',
          formData: formDataObj,
        });
      } else {
        // Send regular JSON data
        return apiCaller.auth.accounts.profile.put(data.profile);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSelectedAvatar(null);
      close();
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
      // Avatar will remain selected for retry
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
      // Reset avatar selection when dialog opens
      setSelectedAvatar(null);
    }
  }, [profileData]);

  return (
    <>
      <Button variant="dim" mode="icon" onClick={() => open()} type="button">
        <ProfileIcon className="size-6 stroke-zinc-500" />
      </Button>
      <FullscreenDialog
        id="profile"
        className="bg-[linear-gradient(5.65deg,#FFFFFF_53.76%,#FEE6F4_97.4%)]"
        onClose={() => setSelectedAvatar(null)}
      >
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
                const profileData: MeProfile = {
                  first_name: values.firstName,
                  last_name: values.lastName,
                  phone: values.phone,
                  national_id: values.nationalId || undefined,
                  birth_date:
                    values.birthDate?.replaceAll('/', '-') || undefined,
                  email: values.email || undefined,
                };

                const avatarFile =
                  selectedAvatar?.file instanceof File
                    ? selectedAvatar.file
                    : undefined;

                mutation.mutate({
                  profile: profileData,
                  avatar: avatarFile,
                });
              })}
            >
              <AvatarUpload
                onFileChange={setSelectedAvatar}
                defaultAvatar={profileData?.avatar || undefined}
              />
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
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>تاریخ تولد</FormLabel>
                    <FormControl>
                      <InputPattern
                        variant="lg"
                        placeholder="روز / ماه / سال"
                        format="#### / ## / ##"
                        mask="_"
                        type="tel"
                        onValueChange={(values) => {
                          onChange(values.formattedValue.replaceAll(' ', ''));
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        variant="lg"
                        type="email"
                        dir="ltr"
                        className="placeholder:text-right"
                        placeholder="ایمیل خود را وارد کنید"
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
                {selectedAvatar && mutation.isPending
                  ? 'در حال آپلود تصویر...'
                  : mutation.isPending
                    ? 'در حال ذخیره...'
                    : 'ثبت اطلاعات'}
              </Button>
            </form>
          </Form>
        </FullscreenDialog.Body>
      </FullscreenDialog>
    </>
  );
};
