
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Montserrat, Poppins } from 'next/font/google';

const fontBody = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Poppins({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '600', '700'],
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
