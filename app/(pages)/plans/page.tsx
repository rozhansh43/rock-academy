'use client';

import { ProfileDialog } from '@/components/shared/profile-dialog';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { mockData } from './mock';
import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="container-main bg-light-pink h-full pt-8">
      <div className="flex h-full flex-grow flex-col">
        <div className="flex flex-row items-center justify-between gap-2.5">
          <p className="text-middle-gray text-xl font-bold"> کلاس‌های آفلاین</p>

          <div>
            <ProfileDialog />
            <Button variant="dim" mode="icon">
              <MenuIcon className="size-6 stroke-zinc-500" />
            </Button>
          </div>
        </div>
        <div className="mt-[90px] flex flex-grow flex-col gap-4">
          <Carousel opts={{ loop: true, align: 'start' }}>
            <CarouselContent>
              {mockData.map((item) => (
                <CarouselItem key={item.id}>
                  <>
                    <p className="text-primary mb-[40px] text-center text-xl font-bold">
                      {item.title}
                    </p>
                    <div className="border-primary flex justify-center overflow-hidden rounded-3xl border bg-white shadow-sm">
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={340}
                        height={200}
                      />
                    </div>
                  </>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex justify-between">
              <CarouselNext className="static" />
              <CarouselDotButtons />
              <CarouselPrevious className="static" />
            </div>
          </Carousel>
        </div>
        <div className="flex h-[122px] items-center justify-center">
          <Button
            asChild
            variant="outline"
            className="border-purple text-purple flex h-[54px] w-[298px] items-center justify-center gap-[10px] rounded-[30px] p-[10px] opacity-100"
          >
            <Link className="text-purple" href="/">
              بازگشت به خانه
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
