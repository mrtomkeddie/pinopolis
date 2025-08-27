import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import TopNav from '@/components/layout/top-nav';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Pinopolis',
  description: 'Your ultimate bowling and entertainment destination.',
  manifest: '/manifest.json',
  themeColor: '#e91e63',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pinopolis',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/mobilelogo.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <body className={cn('font-body antialiased')}>
        <div className="flex flex-col min-h-screen bg-background">
          <TopNav />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
