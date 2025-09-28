'use client';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { MenuIcon, SearchIcon, SortAscIcon, SortDescIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { weekdaysToFa } from '@/utils/strings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { ProfileDialog } from '@/components/shared/profile-dialog';
import { ClassDetailDialog } from './_components/class-detail-dialog';
import { useOpen } from '@/hooks/use-open';
import { useQueryState } from 'nuqs';

export default function Page() {
  const [sort, setSort] = useState<string>('');
  const [, setId] = useQueryState('id');

  const query = useQuery({
    queryKey: ['classes'],
    queryFn: () => apiCaller.offerings.events.get(1, '', 'class'),
  });
  const data = (query.data as any)?.data as typeof query.data;

  const detailDialog = useOpen('class-detail');

  return (
    <>
      <div className="container-main pt-8">
        <div className="flex flex-row items-center justify-between gap-2.5">
          <InputWrapper variant="lg">
            <SearchIcon />
            <Input
              variant="lg"
              placeholder="نام کلاس مورد نظر خود را جستجو کنید."
            />
          </InputWrapper>

          <ProfileDialog />
          <Button variant="dim" mode="icon">
            <MenuIcon className="size-6 stroke-zinc-500" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mt-7">
            <Button variant="foreground">
              <SortDescIcon />
              مرتب سازی
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-45">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem
                value="1"
                // onSelect={(event) => event.preventDefault()}
              >
                از مبتدی به پیشرفته
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem
                value="2"
                // onSelect={(event) => event.preventDefault()}
              >
                از پیشرفته به پیشرفته
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-4.5">
          {query.isLoading ? (
            <p className="text-dark-2 text-center text-base font-medium">
              در حال بارگذاری...
            </p>
          ) : data?.results && data?.results?.length > 0 ? (
            data?.results?.map((item) => (
              <div key={item.id} className="rounded-[20px] bg-white p-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-dark-1 text-sm font-bold">
                    {item.persian_name}
                  </h3>
                  <p className="text-[11px] leading-[14.7px] font-medium">
                    <span className="text-light-1">مربی : </span>
                    <span className="text-dark-3">?</span>
                  </p>
                  <p className="text-[11px] leading-[14.7px] font-medium">
                    <span className="text-light-1">روزهای برگزاری : </span>
                    <span className="text-dark-3">
                      {weekdaysToFa(item.weekdays)}
                    </span>
                  </p>
                  <p className="text-[11px] leading-[14.7px] font-medium">
                    <span className="text-light-1">بازه زمانی : </span>
                    <span className="text-dark-3">
                      {item.start_time?.replaceAll(':00', '')} -{' '}
                      {item.end_time?.replaceAll(':00', '')}
                    </span>
                  </p>
                  <div className="space-x-3">
                    <Button size="sm" className="w-17">
                      ثبت نام
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setId(item.id?.toString() ?? '');
                        detailDialog.open();
                      }}
                    >
                      اطلاعات بیشتر
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-dark-2 text-center text-base font-medium">
              هیچ کلاسی یافت نشد
            </p>
          )}
        </div>
      </div>
      <ClassDetailDialog />
    </>
  );
}
