'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestActivities } from '@/ai/flows/suggest-activities';
import { bookingHistory } from '@/lib/data';

export default function ActivitySuggestions() {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true);
        // In a real app, userAge and bookingHistory would be dynamic from user data
        const result = await suggestActivities({ userAge: 30, bookingHistory });
        setSuggestions(result.suggestedActivities);
      } catch (error) {
        console.error('Failed to fetch activity suggestions:', error);
        setSuggestions('Could not load suggestions at this time.');
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestions();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-primary/20 to-background border-primary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>For You</span>
        </CardTitle>
        <CardDescription>Based on your recent activity, here are some suggestions!</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating ideas...</span>
          </div>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {suggestions.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>)}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
