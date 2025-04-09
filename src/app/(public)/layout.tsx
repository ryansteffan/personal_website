import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "~/components/client/header/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { env } from "~/env.js";

export const metadata: Metadata = {
  title: "Ryan Steffan - Home",
  description: "Ryan Steffan's home page",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={`${GeistSans.variable} dark`}>
        <body className="bg-gradient-to-b dark:from-black dark:via-slate-900 dark:to-blue-900">
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
