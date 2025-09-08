import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Playfair_Display } from 'next/font/google';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Pinopolis Book',
  description: 'Book your next futuristic entertainment experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('antialiased min-h-screen bg-background', fontBody.variable, fontHeadline.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
