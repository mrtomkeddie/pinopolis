'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations } from '@/app/actions';
import {
  type RecommendPartyPackagesOutput,
} from '@/ai/flows/recommend-party-packages';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Bot, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export type FormState = {
  data: RecommendPartyPackagesOutput | null;
  error: string | null;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Find My Package
        </>
      )}
    </Button>
  );
}

function PackageSkeleton() {
    return (
        <Card className="bg-card/80 border-border/60">
            <CardHeader>
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                </div>
                <div>
                  <Skeleton className="h-5 w-1/4 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    );
}


export default function PartyPackages() {
  const initialState: FormState = { data: null, error: null };
  const [state, formAction] = useFormState(getRecommendations, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="space-y-8">
      <Card className="max-w-3xl mx-auto bg-card/80 border-border/60">
        <form action={formAction}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests">Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  name="numberOfGuests"
                  type="number"
                  placeholder="e.g., 12"
                  required
                  min="1"
                  defaultValue="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desiredDuration">Desired Duration (hours)</Label>
                <Input
                  id="desiredDuration"
                  name="desiredDuration"
                  type="number"
                  placeholder="e.g., 3"
                  required
                  min="1"
                  step="0.5"
                  defaultValue="3"
                />
              </div>
              <SubmitButton />
            </div>
            {state.error && (
              <p className="text-sm text-destructive mt-4">{state.error}</p>
            )}
          </CardContent>
        </form>
      </Card>

      <div className="max-w-5xl mx-auto">
        {pending && !state.data && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PackageSkeleton />
                <PackageSkeleton />
                <PackageSkeleton />
            </div>
        )}
        {state.data?.recommendedPackages && state.data.recommendedPackages.length > 0 && (
          <div className="space-y-8">
            <Alert className="bg-primary/10 border-primary/50 text-primary-foreground">
              <Bot className="h-4 w-4 stroke-primary" />
              <AlertTitle className="text-primary">AI Recommendations</AlertTitle>
              <AlertDescription>
                Based on your criteria, here are the best packages for you.
              </AlertDescription>
            </Alert>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.data.recommendedPackages.map((pkg) => (
                <Card key={pkg.packageName} className={`bg-card/80 border-2 transition-all duration-300 ${pkg.suitable ? 'border-primary' : 'border-border/60'}`}>
                  {pkg.suitable && (
                    <Badge variant="default" className="absolute -top-3 left-4 bg-primary text-primary-foreground">Recommended</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center justify-between">
                      {pkg.packageName}
                      {pkg.suitable ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <XCircle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center"><Users className="mr-2 h-4 w-4" /> Up to {pkg.capacity} guests</div>
                        <div className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {pkg.duration} hours</div>
                    </div>
                    {pkg.addons && pkg.addons.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center"><Zap className="mr-2 h-4 w-4 text-accent" /> Available Add-ons</h4>
                            <div className="flex flex-wrap gap-2">
                                {pkg.addons.map(addon => (
                                    <Badge key={addon.addonName} variant="secondary">{addon.addonName}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Book Package <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
