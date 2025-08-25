import ActivityCard from '@/components/activity-card';
import ActivitySuggestions from '@/components/activity-suggestions';
import { activities } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to the Fun Zone!</h1>
        <p className="text-muted-foreground">Choose your next adventure from the activities below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
      
      <ActivitySuggestions />
    </div>
  );
}
