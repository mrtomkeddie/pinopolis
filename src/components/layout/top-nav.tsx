'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dices, CalendarDays, Home, Target, ToyBrick } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/bowling', icon: Dices, label: 'Bowling' },
    { href: '/darts', icon: Target, label: 'AR Darts' },
    { href: '/soft-play', icon: ToyBrick, label: 'Soft Play' },
    { href: '/bookings', icon: CalendarDays, label: 'My Bookings' },
];


export default function TopNav() {
    const pathname = usePathname();

    const NavLink = ({ item }: { item: { href: string, icon: React.ElementType, label: string } }) => (
        <Button asChild variant="ghost" className={cn("text-muted-foreground hover:text-foreground", { "text-primary hover:text-primary": pathname === item.href })}>
            <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
            </Link>
        </Button>
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container flex items-center justify-between h-20 px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={120} />
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {navItems.map((item) => <NavLink key={item.href} item={item} />)}
                </div>
            </nav>
        </header>
    )
}
