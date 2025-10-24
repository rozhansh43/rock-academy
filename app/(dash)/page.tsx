'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import DashboardHeader from '@/components/layout/dashboard-header';
import HeroCarousel from '@/components/partials/home/HeroCarousel';
import QuickActionsRow from '@/components/partials/home/QuickActionsRow';
import ClassesList, { ClassItem } from '@/components/partials/home/ClassesList';
import SidebarDrawer from '@/components/layout/sidebar-drawer';

import { apiCaller } from '@/apis/api-caller';
import { useOpen } from '@/hooks/use-open';

// --- MOCKS ---
const MOCK_CLASSES: ClassItem[] = [
  {
    id: 'c-101',
    persian_name: 'هیپ‌هاپ – ترم یک',
    instructor: 'سارا جمشیدی',
    weekdays_fa: ['دوشنبه', 'چهارشنبه'],
    start_time: '11:00',
    end_time: '19:00',
    remainingCount: 3,
    coverSrc: '/images/dance (1).png',
    accent: 'pink',
  },
  {
    id: 'c-102',
    persian_name: 'فری‌استایل – ترم یک',
    instructor: 'سارا جمشیدی',
    weekdays_fa: ['دوشنبه', 'چهارشنبه'],
    start_time: '11:00',
    end_time: '19:00',
    remainingCount: 3,
    coverSrc: '/images/dance (2).png',
    accent: 'blue',
  },
  {
    id: 'c-103',
    persian_name: 'رقص هندی – ترم یک',
    instructor: 'سارا جمشیدی',
    weekdays_fa: ['دوشنبه', 'چهارشنبه'],
    start_time: '11:00',
    end_time: '19:00',
    remainingCount: 3,
    coverSrc: '/images/dance (3).png',
    accent: 'cream',
  },
];

export default function Page() {
  const [, setId] = useQueryState('id');

  const detailDialog = useOpen('class-detail');
  const salonDialog = useOpen('salon');

  const classesQuery = useQuery({
    queryKey: ['classes'],
    queryFn: () => apiCaller.offerings.events.get(1, '', 'class'),
  });

  const apiItems = (classesQuery.data as any)?.data?.results ?? [];
  const items: ClassItem[] = MOCK_CLASSES;

  return (
    <div className="mt-4 space-y-8">
      <DashboardHeader />

      <HeroCarousel
        slides={[
          { src: '/images/b (1).png', alt: 'slide-1' },
          { src: '/images/b (2).png', alt: 'slide-2' },
          { src: '/images/b (3).png', alt: 'slide-3' },
        ]}
        className="container-main pl-0"
      />

      <QuickActionsRow
        onOpenSalon={() => salonDialog.open()}
        onOpenEvents={() => console.log('open events')}
        onOpenClasses={() => console.log('open classes')}
      />

      <ClassesList
        items={items}
        isLoading={classesQuery.isLoading && apiItems.length === 0}
        onMoreInfo={(id) => {
          setId(id);
          detailDialog.open();
        }}
      />

      {/* سایدبار یک‌بار در روت رندر شود */}
      <SidebarDrawer userName="سارا اکبری" score={35} fromLeft />
    </div>
  );
}
