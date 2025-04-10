import { Metadata } from "next";
import UnderConstruction from "../../../components/client/under_construction/under_construction";

export const metadata: Metadata = {
  title: "Ryan Steffan - Blog",
  description: "Ryan Steffan's blog.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Ryan Steffan",
    "home page",
    "blog",
    "website",
    "portfolio",
    "programming",
    "technology",
    "networking",
  ],
  authors: [{ name: "Ryan Steffan", url: "https://ryansteffan.com" }],
};

export default function BlogPage(): React.ReactNode {
  return (
    <>
      <div className="m-16" />
      <UnderConstruction />
    </>
  );
}
