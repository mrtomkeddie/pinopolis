import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {new Date().getFullYear()} Pinopolis. All Rights Reserved. -{' '}
          <Link href="/terms" className="hover:text-primary underline-offset-4 hover:underline">
            Terms & Conditions
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://www.facebook.com/PinopolisLlanelli/?locale=en_GB" aria-label="Facebook page" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://www.instagram.com/pinopolis_llanelli/" aria-label="Instagram page" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
