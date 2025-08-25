export interface Activity {
    title: string;
    description: string;
    href: string;
    image: string;
    imageHint: string;
}

export interface Booking {
    id: string;
    activity: string;
    date: Date;
    time: string;
    guests: number;
    image: string;
    imageHint: string;
}
