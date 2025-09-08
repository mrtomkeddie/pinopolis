import Link from 'next/link';
import { PartyPopper } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <PartyPopper className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold font-headline text-2xl sm:inline-block">
              Pinopolis
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <Button variant="outline">
            My Visits
          </Button>
        </div>
      </div>
    </header>
  );
}
