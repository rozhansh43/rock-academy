import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { DirectionProvider } from '@/components/providers/direction-provider';
import { BaseLayout } from '@/components/layout/base-layout';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';

const iranYekanFont = localFont({
  src: [
    { path: '../public/fonts/IRANYekanXFaNum-Bold.woff', weight: '700' },
    { path: '../public/fonts/IRANYekanXFaNum-Bold.woff2', weight: '700' },
    { path: '../public/fonts/IRANYekanXFaNum-Regular.woff', weight: '400' },
    { path: '../public/fonts/IRANYekanXFaNum-Regular.woff2', weight: '400' },
  ],
  variable: '--font-iran-yekan',
});

export const metadata: Metadata = {
  title: 'راک آکادمی',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${iranYekanFont.variable} ${iranYekanFont.className} antialiased`}
      >
        <QueryProvider>
          <DirectionProvider>
            <BaseLayout>{children}</BaseLayout>
          </DirectionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
