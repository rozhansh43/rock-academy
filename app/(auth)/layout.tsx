import { AuthLayout } from '@/components/layout/auth-layout';

export default function layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
