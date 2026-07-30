import { Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-ink-200 bg-surface mt-16 rounded-3xl border p-6 shadow-sm md:mt-14 md:p-7">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-ink-900 text-2xl font-semibold">StayScape</h3>
          <p className="text-ink-600 mt-3 max-w-xl text-sm">
            Discover carefully curated US stays with a booking flow designed for
            clarity and confidence. Compare homes quickly and reserve with ease.
          </p>
          <p className="text-ink-500 mt-5 inline-flex items-center gap-1 text-xs">
            <Users className="h-3.5 w-3.5" />
            Powered by live listing data from your StayScape database
          </p>
        </div>
        <div>
          <h4 className="text-ink-900 text-sm font-semibold">Explore</h4>
          <ul className="text-ink-600 mt-3 space-y-2 text-sm">
            <li>City getaways</li>
            <li>Coastal retreats</li>
            <li>Cabin weekends</li>
            <li>Extended stays</li>
          </ul>
        </div>
        <div>
          <h4 className="text-ink-900 text-sm font-semibold">Support</h4>
          <ul className="text-ink-600 mt-3 space-y-2 text-sm">
            <li>Guest help center</li>
            <li>Host guidelines</li>
            <li>Cancellation policy</li>
            <li>Trust and safety</li>
          </ul>
        </div>
      </div>
      <div className="border-ink-200 text-ink-500 mt-8 border-t pt-4 text-xs">
        © {new Date().getFullYear()} StayScape. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
