'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Dices, CalendarDays, LayoutDashboard, Target, ToyBrick } from 'lucide-react';
import Image from 'next/image';

const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/bowling', icon: Dices, label: 'Bowling' },
    { href: '/darts', icon: Target, label: 'AR Darts' },
    { href: '/soft-play', icon: ToyBrick, label: 'Soft Play' },
    { href: '/bookings', icon: CalendarDays, label: 'My Bookings' },
];

export default function AppSidebarContent() {
    const pathname = usePathname();

    return (
        <>
            <SidebarHeader>
                <Link href="/" className="flex items-center justify-center p-2">
                    <Image src="/logo.png" alt="Pinopolis Logo" width={150} height={150} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                                tooltip={item.label}
                            >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </>
    )
}
