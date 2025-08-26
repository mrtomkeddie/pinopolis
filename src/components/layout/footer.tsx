import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Pinopolis. All Rights Reserved. -{' '}
          <Link href="/terms" className="hover:text-primary underline-offset-4 hover:underline">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
}
