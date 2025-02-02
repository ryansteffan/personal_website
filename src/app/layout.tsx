import "~/styles/globals.css";

import { Providers } from "./providers";

import Footer from "../components/footer/footer";
import Header from "../components/header/header";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryan Steffan - Home",
  description: "Ryan Steffan's home page",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <Providers>
          <Header />
          <div className="min-content-height">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
