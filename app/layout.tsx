import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { DirectionProvider } from '@/components/providers/direction-provider';
import './globals.css';
import { BaseLayout } from '@/components/layout/base-layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DirectionProvider>
          <BaseLayout>{children}</BaseLayout>
        </DirectionProvider>
      </body>
    </html>
  );
}
