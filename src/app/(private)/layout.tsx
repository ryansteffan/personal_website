import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "../(public)/providers";
import { ClerkProvider } from "@clerk/nextjs";
import ManagementSidebar from "~/components/client/management_sidebar/management_sidebar";
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
        <body>
          <Providers>
            <div className="flex">
              <ManagementSidebar />
              <div className="ml-2 mr-2 w-full">{children}</div>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
