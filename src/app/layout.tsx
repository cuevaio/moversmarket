import localFont from 'next/font/local';

import type { Metadata } from 'next';

import './globals.css';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        {children}
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
