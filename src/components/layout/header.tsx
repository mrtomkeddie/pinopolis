'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
    return (
        <header className="flex h-16 items-center border-b px-6 bg-card">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-headline tracking-tight text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]">Pinopolis</h1>
            </div>
        </header>
    );
}
