'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
    const isMobile = useIsMobile();
    return (
        <header className="flex h-16 items-center border-b px-6 bg-card">
            <div className="flex items-center gap-4">
                {isMobile && <SidebarTrigger />}
            </div>
        </header>
    );
}
