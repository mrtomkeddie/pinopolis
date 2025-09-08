export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Pinopolis Book. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Admin Login</a>
            <a href="#" className="hover:text-primary transition-colors">Staff Login</a>
        </div>
      </div>
    </footer>
  );
}
