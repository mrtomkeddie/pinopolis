
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Montserrat, Bebas_Neue } from 'next/font/google';
import PwaInstaller from '@/components/pwa-installer';

const fontBody = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Pinopolis',
  description: 'Book your next futuristic entertainment experience.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  shrinkToFit: 'no',
  viewportFit: 'cover',
  themeColor: '#050505',
  userScalable: 'no',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
       <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/mobile%20icon.png?v=2" />
      </head>
      <body className={cn('antialiased min-h-screen bg-background pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]', fontBody.variable, fontHeadline.variable)} suppressHydrationWarning>
        <PwaInstaller />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
