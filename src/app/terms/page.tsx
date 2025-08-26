export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-4xl font-headline text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Terms and Conditions</h1>
      
      <div className="space-y-4 text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">GENERAL ADMISSION</h2>
            <ul className="list-disc pl-5 space-y-1">
                <li>We request that you arrive at least 15 minutes before your allocated time slot to allow you to comply with all the registration formalities.</li>
                <li>Anyone who is considered to be intimidating or aggressive to our customers or team members will be asked to leave immediately and will be refused future admission at all of our venues.</li>
                <li>Please remove hoods, helmets and caps when you enter our venue.</li>
                <li>Please comply with our strict no-smoking policy throughout the building which also includes e-cigarettes.</li>
                <li>Do not bring in food or drink from elsewhere.</li>
                <li>The Management at all our venues reserves the right at all times to search customers and refuse admission at our absolute discretion at any time.</li>
            </ul>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">ALCOHOL & SOCIAL RESPONSIBILITY</h2>
             <ul className="list-disc pl-5 space-y-1">
                <li>We operate all our licensed venues responsibly, safely and within the law. We want our guests to enjoy visiting us and to find safe, welcoming environments, which neither condone nor encourage excessive drinking. We support the objectives of the Licensing Act 2003 and the Licensing (Scotland) Act 2005. We always seek to work closely and constructively with key authorities including Police, Fire, Environmental Health and Local Authorities.</li>
                <li>We actively operate the ‘Challenge 25’ Policy.</li>
            </ul>
        </div>
        
        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">PRIVATE HIRE TERMS</h2>
            <p>Please contact the venue directly for the Private Hire Terms and Conditions.</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">TERMS AND CONDITIONS</h2>
             <ul className="list-disc pl-5 space-y-1">
                <li>All our children’s prices apply to children aged 15 and under.</li>
                <li>Student discount will only be given when presented with a valid student id card at the time of booking</li>
                <li>Bookings will only be considered final when full payment has been made and an official receipt or e-mail confirmation has been issued by Pinopolis. It is your responsibility to check the accuracy of your booking and report any mistakes to Pinopolis within 24 hrs of receiving the confirmation.</li>
                <li>Pinopolis will use all reasonable endeavours to ensure that your booking commences at the time slot allocated. However, it is your responsibility to ensure that you and the members of your group arrive on time. We can only hold your lane for 10 minutes. After this time, we cannot guarantee your booking. However, we will do our best to fit you in if we can.</li>
                <li>Pinopolis is not under any obligation to offer any refunds for pre-purchased bowling time. If you have pre-purchased bowling time, you may not exchange your allocated time slot for another, unless permitted by a member of Pinopolis Management.</li>
                <li>No booking can be cancelled past its start time; this qualifies as a no-show; no refund can be offered and cancellation fees may apply.</li>
                <li>Bookings are only valid for the date and time shown and are void if tampered with and are strictly non-transferable.</li>
                <li>Pinopolis are entitled to cancel your booking at any time. In the event of a cancellation by Pinopolis, you shall be entitled to a full refund or the option to reschedule, but no other compensation shall be payable.</li>
                <li>Pinopolis will process any information that we collect from you in accordance with our Privacy Policy which is available on request or from our website.</li>
                <li>Pinopolis reserves the right to limit the availability and/or change any of its Activities at any time.</li>
                <li>Pinopolis will not be held responsible for any loss or damage to any of your personal belongings during your visit to the venue.</li>
                <li>If you, or any member of your group causes any damage to any of the alley’s facilities, fixtures, or fittings, then you will be liable for the costs of repairing such damage and any loss of business incurred by that damage. The cost of any such repairs will be charged to the person responsible for the booking.</li>
                <li>The Terms and Conditions (together with any applicable Pinopolis Rules and Privacy Policy) set out the terms on which you agree to take part in the activities at Pinopolis. Please confirm that you accept the Conditions and agree to comply with them. If you do not agree to these Conditions, you/your child must not take part in any Activities in the venue.</li>
                <li>The Activities are provided by Pinopolis Limited, trading as Pinopolis which is a limited liability partnership incorporated in England and Wales under Company Number:07444964 and whose registered office address is at 45 High Street, Haverford West, Wales, SA61 2BP</li>
            </ul>
        </div>
        
        <div className="space-y-2">
            <h2 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">GOVERNING LAW</h2>
             <ul className="list-disc pl-5 space-y-1">
                <li>These Conditions and any dispute or claim (including non-contractual disputes and claims) arising out of or in connection with it or its subject matter or formation shall be governed by, and construed in accordance with the law of territory of incorporation.</li>
                <li>The courts of territory of incorporation shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes and claims) arising out of or in connection with these Conditions or its subject matter or formation.</li>
                <li>Nothing in these Conditions shall limit or exclude Pinopolis liability for: death or personal injury caused by its negligence, or the negligence of its employees or agents; or fraud or fraudulent misrepresentation.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
