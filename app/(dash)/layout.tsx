import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
