"use client";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const Page = () => {
  // Note: PostHog automatically captures pageviews with defaults: '2025-05-24'
  // No need for manual pageview tracking or useEffect hooks

  return (
    <section>
      <h1 className="text-center">The Hub for Every Event <br /> You Can't Miss</h1>
      <p className="text-center mt-5">Parties, Concerts and much more, All in One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7" id="events">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;