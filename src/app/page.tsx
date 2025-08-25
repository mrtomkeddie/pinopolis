import ActivityCard from '@/components/activity-card';
import ActivitySuggestions from '@/components/activity-suggestions';
import OpeningHours from '@/components/opening-hours';
import { activities } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Welcome to Pinopolis!</h1>
        <p className="text-muted-foreground mt-2">Choose your next adventure from the activities below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivitySuggestions />
        <OpeningHours />
      </div>
    </div>
  );
}
