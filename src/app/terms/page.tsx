export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-4xl font-headline text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Terms and Conditions</h1>
      
      <div className="space-y-4 text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">1. Introduction</h2>
            <p>Welcome to Pinopolis! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website we assume you accept these terms and conditions. Do not continue to use Pinopolis if you do not agree to take all of the terms and conditions stated on this page.</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">2. Bookings and Cancellations</h2>
            <p>All bookings made through our website are subject to confirmation and availability. Payment must be made in full at the time of booking. Cancellations made at least 24 hours in advance will receive a full refund. Cancellations made less than 24 hours in advance are non-refundable.</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">3. Age Restrictions</h2>
            <p>For certain deals and packages, such as our 'Wine Wednesday', you must be 18 years of age or older to book. Valid ID may be required upon arrival.</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">4. Liability</h2>
            <p>Pinopolis is not liable for any personal items lost or damaged on the premises. Participation in activities is at your own risk.</p>
        </div>
      </div>
    </div>
  );
}
