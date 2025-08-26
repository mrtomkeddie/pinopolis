
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dices, CalendarDays, Home, Target, ToyBrick, Menu } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

    const NavLink = ({ item, isMobile = false }: { item: { href: string, icon: React.ElementType, label: string }, isMobile?: boolean }) => {
        const baseClasses = "text-muted-foreground hover:text-foreground";
        const activeClasses = "text-primary hover:text-primary";
        const mobileClasses = "flex items-center gap-4 p-4 text-lg";
        const desktopClasses = "flex items-center gap-2";

        const buttonContent = (
            <>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
            </>
        )

        if (isMobile) {
            return (
                <SheetClose asChild>
                    <Link href={item.href} className={cn(baseClasses, { [activeClasses]: pathname === item.href }, mobileClasses)}>
                        {buttonContent}
                    </Link>
                </SheetClose>
            )
        }

        return (
            <Button asChild variant="ghost" className={cn(baseClasses, { [activeClasses]: pathname === item.href }, desktopClasses)}>
                <Link href={item.href}>
                    {buttonContent}
                </Link>
            </Button>
        )
    }

    if (isMobile) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="container flex items-center justify-between h-20 px-4 md:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            <div className="flex justify-center p-4 border-b border-border/40 mb-4">
                               <SheetClose asChild>
                                    <Link href="/">
                                        <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={40} className="h-10 w-auto" />
                                    </Link>
                               </SheetClose>
                            </div>
                            <div className="flex flex-col">
                                {navItems.map((item) => <NavLink key={item.href} item={item} isMobile />)}
                            </div>
                        </SheetContent>
                    </Sheet>
                    
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/">
                            <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={40} className="h-10 w-auto" />
                        </Link>
                    </div>

                    <div className="w-10"></div>
                </nav>
            </header>
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container flex items-center h-20 px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Pinopolis Logo" width={120} height={40} className="h-10 w-auto" />
                    </Link>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    {navItems.map((item) => <NavLink key={item.href} item={item} />)}
                </div>
            </nav>
        </header>
    )
}
