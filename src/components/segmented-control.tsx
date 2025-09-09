
'use client';

import { Zap, Utensils, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dispatch, SetStateAction } from 'react';

type Tab = 'experiences' | 'food-drinks' | 'party-bookings';

const tabs: { id: Tab; label: string; mobileLabel?: string; icon: React.ElementType }[] = [
  { id: 'experiences', label: 'Experiences', icon: Zap },
  { id: 'food-drinks', label: 'Food & Drinks', mobileLabel: 'Food', icon: Utensils },
  { id: 'party-bookings', label: 'Party Bookings', mobileLabel: 'Parties', icon: PartyPopper },
];

interface SegmentedControlProps {
    activeTab: Tab;
    setActiveTab: (tabId: Tab) => void;
}

export default function SegmentedControl({ activeTab, setActiveTab }: SegmentedControlProps) {
  const getGradient = (tabId: Tab) => {
    switch (tabId) {
        case 'experiences': return 'from-cyan-500 to-blue-500';
        case 'food-drinks': return 'from-yellow-400 to-orange-500';
        case 'party-bookings': return 'from-pink-500 to-purple-500';
        default: return 'from-gray-500 to-gray-700';
    }
  }

  return (
    <div className="bg-black/50 border border-white/10 rounded-full p-1.5 flex items-center justify-between max-w-lg mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
            {
              [`bg-gradient-to-r ${getGradient(tab.id)} text-white shadow-lg`]: activeTab === tab.id,
              'text-muted-foreground hover:text-white': activeTab !== tab.id,
            }
          )}
        >
          <tab.icon className="w-4 h-4" />
          {tab.mobileLabel ? (
            <>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.mobileLabel}</span>
            </>
          ) : (
            <span>{tab.label}</span>
          )}
        </button>
      ))}
    </div>
  );
}
