import "~/styles/globals.css";

import { Providers } from "./providers";

import Footer from "../components/client/footer/footer";
import Header from "../components/client/header/header";

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
          <div className="flex min-h-screen flex-col">
            <div className="">
              <Header />
            </div>
            <div className="flex-1">{children}</div>
            <div className="">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
