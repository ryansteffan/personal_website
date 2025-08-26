import type { Metadata } from "next";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Ryan Steffan - About",
  description: "The about me page for Ryan Steffan's website.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["Ryan Steffan", "about me", "portfolio", "website", "bio"],
  authors: [{ name: "Ryan Steffan", url: "https://ryansteffan.com" }],
};

export default function AboutPage(): React.ReactNode {
  return (
    <>
      <div className="mt-16 md:mt-32" />
      <div className="mx-auto mb-10 ml-5 mr-5 mt-10 rounded-md bg-slate-700 bg-opacity-40 p-5 pt-8 text-black shadow-sm shadow-black dark:text-white md:mx-auto md:my-10 md:max-w-4xl md:p-10">
        <h2 className="text-center font-sans text-4xl font-semibold tracking-tight">
          About Me...
        </h2>
        <p className="pt-3">
          Hi my name is Ryan Steffan, and I am a recent graduate of the Red
          River College Polytechnic&apos;s Business Information Technology
          program. My skills mainly consist of Networking with Cisco equipment,
          and System Administration with Windows and Linux servers. I also have
          experience with programming and web development using languages such
          as Python, C#, and TypeScript. I have a passion for all kinds of
          technology and enjoy learning about new tech whenever I have the
          chance. In my free time I like to work on my home lab, play video
          games, and work on my personal programming projects. If you want to
          connect feel free to reach out to me on LinkedIn, Github, or via the
          contact form on my website.
        </p>
        <div className="flex justify-center pt-5">
          <a href="https://www.linkedin.com/in/ryan-steffan/">
            <FaLinkedin size={50} className="m-2" />
          </a>
          <a href="https://github.com/TheTurnnip/">
            <FaGithub size={50} className="m-2" />
          </a>
        </div>
      </div>
    </>
  );
}
