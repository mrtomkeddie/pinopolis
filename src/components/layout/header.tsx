'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
    return (
        <header className="flex h-16 items-center border-b px-6 bg-card">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold tracking-tight">Family Fun Zone</h1>
            </div>
        </header>
    );
}
