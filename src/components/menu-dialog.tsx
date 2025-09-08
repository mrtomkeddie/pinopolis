
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Menu } from '@/lib/menu-data';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuDialogProps {
  menu: Menu;
  accentColor?: 'yellow' | 'pink';
}

export default function MenuDialog({ menu, accentColor = 'yellow' }: MenuDialogProps) {
  const titleGradient = {
    yellow: 'from-yellow-400 to-orange-400',
    pink: 'from-pink-400 to-purple-400',
  }[accentColor];

  const lineGradient = {
    yellow: 'via-yellow-400',
    pink: 'via-pink-400',
  }[accentColor];
  
  const textColor = {
    yellow: 'text-yellow-400',
    pink: 'text-pink-400',
  }[accentColor];


  return (
    <DialogContent className="bg-black/80 border-border/40 text-foreground p-0 w-full h-full max-w-full sm:max-w-3xl sm:h-auto sm:max-h-[90dvh] flex flex-col">
        <DialogHeader className="p-6 pb-2 flex-shrink-0">
            <DialogTitle className={cn("text-2xl font-headline bg-gradient-to-r bg-clip-text text-transparent", titleGradient)}>
                {menu.title}
            </DialogTitle>
            <DialogDescription>{menu.description}</DialogDescription>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
        <Separator className="bg-border/20 flex-shrink-0" />
        <div className="flex-grow overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="p-6 pt-2">
                <Accordion type="single" collapsible className="w-full space-y-4">
                {menu.categories.map((category) => (
                    <AccordionItem value={category.title} key={category.title} className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline relative text-left px-6 py-4">
                            <div className="flex items-center w-full">
                                <div className={cn("flex-grow h-px bg-gradient-to-r from-transparent to-transparent opacity-50", lineGradient)}></div>
                                <span className="px-4 flex-shrink-0 text-center">{category.title}</span>
                                <div className={cn("flex-grow h-px bg-gradient-to-l from-transparent to-transparent opacity-50", lineGradient)}></div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            {category.description && <p className="text-sm text-muted-foreground mb-4">{category.description}</p>}
                            <ul className="space-y-4">
                            {category.items.map((item) => (
                                <li key={item.name} className="bg-black/20 border border-white/10 rounded-lg p-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <h4 className={cn("font-semibold", textColor)}>{item.name}</h4>
                                            {item.description && <p className="text-sm text-muted-foreground mt-1 max-w-md">{item.description}</p>}
                                        </div>
                                        { item.price > 0 && <p className="font-mono text-base text-white">£{item.price.toFixed(2)}</p> }
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
          </ScrollArea>
        </div>
        <Separator className="bg-border/20 flex-shrink-0" />
        <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2 flex-shrink-0">
            <Clock className="w-4 h-4" />
            <span>Bar open: 10:30am - 9:30pm daily</span>
        </div>
    </DialogContent>
  );
}
