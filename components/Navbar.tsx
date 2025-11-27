"use client";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (navItem: string) => {
    const eventMap: { [key: string]: string } = {
      logo: 'nav_logo_clicked',
      home: 'nav_home_clicked',
      events: 'nav_events_clicked',
      create_event: 'nav_create_event_clicked',
    };

    const eventName = eventMap[navItem];
    if (eventName) {
      posthog.capture(eventName, {
        nav_item: navItem,
        nav_location: 'header',
      });
    }
  };

  return (
    <header>
        <nav>
            <Link href="/" className="logo" onClick={() => handleNavClick('logo')}>
                <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                <p>Event</p>
            </Link>
            <ul>
                <Link href="/" onClick={() => handleNavClick('home')}>Home</Link>
                <Link href="/" onClick={() => handleNavClick('events')}>Events</Link>
                <Link href="/" onClick={() => handleNavClick('create_event')}>Create Event</Link>
            </ul>
        </nav>
    </header>
  );
};

export default Navbar;