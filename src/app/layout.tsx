import localFont from 'next/font/local';

import type { Metadata } from 'next';

import './globals.css';

import Link from 'next/link';

import { CompassIcon, TagIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Movers Market',
  description: 'The property marketplace for buyers and sellers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[150dvh] antialiased [scrollbar-gutter:stable]`}
      >
        <div className="sticky top-0 z-10 border-b">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between bg-background px-2 sm:px-8">
            <Link href="/listings" className="font-black">
              MoversMarket
            </Link>
            <div className="flex gap-2">
              <Link
                href="/listings"
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'flex aspect-square h-8 items-center justify-center p-0 sm:aspect-auto sm:px-4',
                )}
              >
                <CompassIcon className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">Explore</span>
              </Link>

              <Button
                variant="default"
                className={cn(
                  'flex aspect-square h-8 items-center justify-center p-0 sm:aspect-auto sm:px-4',
                )}
              >
                <TagIcon className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">Sell</span>
              </Button>
            </div>
          </nav>
        </div>
        <div className="mx-auto mt-4 max-w-6xl px-2 sm:px-8">{children}</div>
        <div className="my-8 flex w-full justify-center">
          <a
            className="font-mono text-sm text-muted-foreground"
            href="https://www.cueva.io/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            made by cueva.io
          </a>
        </div>
      </body>
    </html>
  );
}
