import { Metadata } from "next";
import HomePageBackground from "~/components/client/home_page_bg/home_page_bg";

export const metadata: Metadata = {
  title: "Ryan Steffan - Home",
  description: "The home page of Ryan Steffan's website.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["Ryan Steffan", "home page", "portfolio", "website"],
  authors: [{ name: "Ryan Steffan", url: "https://ryansteffan.com" }],
};

export default function HomePage(): React.ReactNode {
  return (
    <>
      <HomePageBackground />
    </>
  );
}
