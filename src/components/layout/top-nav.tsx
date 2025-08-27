
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dices, CalendarDays, Home, Target, ToyBrick, Menu } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/bowling', icon: Dices, label: 'Bowling' },
    { href: '/darts', icon: Target, label: 'AR Darts' },
    { href: '/soft-play', icon: ToyBrick, label: 'Soft Play' },
    { href: '/bookings', icon: CalendarDays, label: 'My Bookings' },
];


export default function TopNav() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    const NavLink = ({ item }: { item: { href: string, icon: React.ElementType, label: string }}) => {
        const isActive = pathname === item.href;
        const linkClasses = cn(
            "flex items-center gap-4 px-6 py-3 text-lg rounded-lg mx-2 transition-colors",
            isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
        );

        return (
            <SheetClose asChild>
                <Link href={item.href} className={linkClasses}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </Link>
            </SheetClose>
        )
    }

    // Render desktop version by default to avoid hydration mismatch
    const shouldShowMenuText = isMobile === undefined ? true : !isMobile;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container flex items-center justify-between h-20 px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost">
                            <Menu className="h-6 w-6" />
                            {shouldShowMenuText && <span className="ml-2">Menu</span>}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[300px]">
                        <SheetHeader className="p-4 border-b border-border/40 mb-4">
                           <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                           <SheetClose asChild>
                                <Link href="/" className="flex justify-center">
                                    <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={40} className="h-10 w-auto" />
                                </Link>
                           </SheetClose>
                        </SheetHeader>
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => <NavLink key={item.href} item={item} />)}
                        </div>
                    </SheetContent>
                </Sheet>
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                         <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={40} className="h-10 w-auto" />
                    </Link>
                </div>

                <div className="w-24"></div>
            </nav>
        </header>
    )
}
