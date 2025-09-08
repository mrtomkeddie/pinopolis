import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <PartyPopper className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              Pinopolis Book
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="#activities" className="text-muted-foreground transition-colors hover:text-primary">
            Activities
          </Link>
          <Link href="#parties" className="text-muted-foreground transition-colors hover:text-primary">
            Parties
          </Link>
        </nav>
      </div>
    </header>
  );
}
