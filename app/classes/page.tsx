'use client';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { ProfileIcon } from '@/components/icons/profile-icon';
import { useQuery } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';

export default function Page() {
  const query = useQuery({
    queryKey: ['classes'],
    queryFn: () => apiCaller.offerings.events.get(),
  });
  console.log(query.data);
  return (
    <div className="container-main pt-8">
      <div className="flex flex-row items-center justify-between gap-2.5">
        <InputWrapper variant="lg">
          <SearchIcon />
          <Input
            variant="lg"
            placeholder="نام کلاس مورد نظر خود را جستجو کنید."
          />
        </InputWrapper>

        <Button variant="dim" mode="icon">
          <ProfileIcon className="size-6 stroke-zinc-500" />
        </Button>
        <Button variant="dim" mode="icon">
          <MenuIcon className="size-6 stroke-zinc-500" />
        </Button>
      </div>
    </div>
  );
}
