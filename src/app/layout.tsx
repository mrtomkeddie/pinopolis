
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Montserrat, Poppins } from 'next/font/google';

const fontBody = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
});

// Using a generic font-family name for Segoe UI which is a system font.
// This is a common practice when the font is widely available.
const fontHeadline = {
  variable: '--font-headline',
};

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
