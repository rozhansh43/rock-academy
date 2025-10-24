'use client';

import { MenuIcon, SearchIcon } from 'lucide-react';
import { Input, InputWrapper } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileDialog } from '@/components/shared/profile-dialog';
import { useUIStore } from '@/store/useUIStore';

export default function DashboardHeader() {
  const toggle = useUIStore((s) => s.toggleSidebarDrawer);

  return (
    <div className="container-main flex flex-row items-center justify-between gap-2.5 p-5">
      <InputWrapper variant="lg">
        <SearchIcon />
        <Input
          variant="lg"
          placeholder="نام کلاس مورد نظر خود را جستجو کنید."
        />
      </InputWrapper>

      <div className="flex items-center gap-2">
        <ProfileDialog />
        <Button
          variant="dim"
          mode="icon"
          onClick={toggle}
          aria-label="toggle sidebar"
        >
          <MenuIcon className="size-6 stroke-zinc-500" />
        </Button>
      </div>
    </div>
  );
}
