
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Menu } from '@/lib/menu-data';
import { Clock, X } from 'lucide-react';

interface MenuDialogProps {
  menu: Menu;
}

export default function MenuDialog({ menu }: MenuDialogProps) {
  return (
    <DialogContent className="bg-black/80 border-border/40 text-foreground p-0 w-full h-full max-w-full sm:max-w-3xl sm:h-auto sm:max-h-[90dvh] flex flex-col">
        <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-headline bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {menu.title}
            </DialogTitle>
            <DialogDescription>{menu.description}</DialogDescription>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
        <Separator className="bg-border/20" />
        <ScrollArea className="flex-grow">
            <Accordion type="multiple" className="w-full p-6 pt-2" defaultValue={menu.categories.map(c => c.title)}>
            {menu.categories.map((category) => (
                <AccordionItem value={category.title} key={category.title} className="border-b-border/20">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline relative text-left">
                        <span className="py-4">{category.title}</span>
                        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-yellow-500 to-orange-500/0" />
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        {category.description && <p className="text-sm text-muted-foreground mb-4">{category.description}</p>}
                        <ul className="space-y-4">
                        {category.items.map((item) => (
                            <li key={item.name} className="flex justify-between items-baseline">
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    {item.description && <p className="text-sm text-muted-foreground max-w-md">{item.description}</p>}
                                </div>
                                { item.price > 0 && <p className="font-mono text-base text-yellow-400">${item.price.toFixed(2)}</p> }
                            </li>
                        ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </ScrollArea>
        <Separator className="bg-border/20" />
        <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Kitchen open: 10:30am - 9:30pm daily</span>
        </div>
    </DialogContent>
  );
}
