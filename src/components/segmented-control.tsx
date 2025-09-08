
'use client';

import { useState } from 'react';
import { Zap, Utensils, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'experiences' | 'food-drinks' | 'party-bookings';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'experiences', label: 'Experiences', icon: Zap },
  { id: 'food-drinks', label: 'Food & Drinks', icon: Utensils },
  { id: 'party-bookings', label: 'Party Bookings', icon: PartyPopper },
];

export default function SegmentedControl() {
  const [activeTab, setActiveTab] = useState<Tab>('experiences');

  return (
    <div className="bg-black/50 border border-border/20 rounded-full p-1.5 flex items-center justify-between max-w-lg mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
            {
              'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg': activeTab === tab.id,
              'text-muted-foreground hover:text-white': activeTab !== tab.id,
            }
          )}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
