export type EventItem = {
    image: string,
    title: string,
    slug: string,
    location: string,
    date: string,
    time: string
}

export const events: EventItem[] = [
    {
        title: "React Summit 2025",
        image: "/images/event1.png",
        slug: "react-summit-2025",
        location: "Amsterdam, Netherlands",
        date: "June 13-14, 2025",
        time: "9:00 AM - 6:00 PM"
    },
    {
        title: "Google I/O Extended",
        image: "/images/event2.png",
        slug: "google-io-extended-2025",
        location: "Mountain View, CA",
        date: "May 14-15, 2025",
        time: "10:00 AM - 5:00 PM"
    },
    {
        title: "Next.js Conf",
        image: "/images/event3.png",
        slug: "nextjs-conf-2025",
        location: "San Francisco, CA",
        date: "October 24, 2025",
        time: "9:00 AM - 7:00 PM"
    },
    {
        title: "GitHub Universe",
        image: "/images/event4.png",
        slug: "github-universe-2025",
        location: "San Francisco, CA",
        date: "November 6-7, 2025",
        time: "8:30 AM - 6:00 PM"
    },
    {
        title: "AI Engineers Hackathon",
        image: "/images/event5.png",
        slug: "ai-engineers-hackathon-2025",
        location: "New York, NY",
        date: "July 19-21, 2025",
        time: "48-hour event"
    },
    {
        title: "Web3 Summit Berlin",
        image: "/images/event6.png",
        slug: "web3-summit-berlin-2025",
        location: "Berlin, Germany",
        date: "August 18-20, 2025",
        time: "9:00 AM - 7:00 PM"
    }
];
