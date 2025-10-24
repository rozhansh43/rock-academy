'use client';

import { ProfileDialog } from '@/components/shared/profile-dialog';
import { Button } from '@/components/ui/button';
import { MenuIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="container-main pt-8">
      <div className="flex flex-row items-center justify-between gap-2.5">
        <p className="text-middle-gray text-xl font-bold">ارتباط با ما</p>
        <div>
          <ProfileDialog />
          <Button variant="dim" mode="icon">
            <MenuIcon className="size-6 stroke-zinc-500" />
          </Button>
        </div>
      </div>
      <div className="mt-4.5 flex flex-col gap-4">
        <div>
          <Image
            src="/images/logotype.webp"
            alt="logo"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-[48px] flex flex-col items-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4 stroke-zinc-500" />
              <p className="text-dark-1 text-sm font-bold">شماره تماس</p>
              <p className="text-dark-3 text-sm">09123456789</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MailIcon className="size-4 stroke-zinc-500" />
              <p className="text-dark-1 text-sm font-bold"> ایمیل</p>
              <p className="text-dark-3 text-sm">example@example.com</p>
            </div>
            <div className="flex flex-row gap-2">
              <MapPinIcon className="size-4 stroke-zinc-500" />
              <p className="text-dark-1 text-sm font-bold">آدرس</p>
              <p className="text-dark-3 text-sm">
                تهران، تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳، طبقه
                دوم
              </p>
            </div>
            <div className="mt-4 flex flex-row items-center gap-2">
              <a
                href="https://www.google.com/maps?q=35.6892,51.3890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/map.png"
                  alt="map"
                  className="border-light-2 rounded-lg border"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
