import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <div className="mx-auto my-auto">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  );
}
