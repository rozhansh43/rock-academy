import { FC } from 'react';
import { FullscreenDialog } from '@/components/ui/fullscreen-dialog';
import Image from 'next/image';

export const SalonDialog: FC = () => {
  return (
    <FullscreenDialog id="salon" className="p-0" onClose={() => {}}>
      <FullscreenDialog.Body className="flex flex-col">
        <Image
          src="/images/salon-a.jpg"
          alt="class-detail-dialog"
          width={440}
          height={410}
          className="w-full basis-100 object-cover"
        />
        <div className="-mt-10 min-h-1/2 flex-1 rounded-t-4xl bg-white p-6"></div>
      </FullscreenDialog.Body>
    </FullscreenDialog>
  );
};
