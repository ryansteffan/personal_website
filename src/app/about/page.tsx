import Head from "next/head";
import UnderConstruction from "../../components/client/under_construction/under_construction";
import Link from "next/link";

export default function AboutPage(): React.ReactNode {
  return (
    <>
      <div className="mt-32" />
      <div className="mx-auto my-10 max-w-4xl rounded-md bg-slate-700 bg-opacity-40 p-10 pt-8 text-black shadow-sm shadow-black dark:text-white">
        <h2 className="text-center font-sans text-4xl font-semibold tracking-tight underline">
          About Me
        </h2>
        <p className="pt-3">
          Hi, my name is Ryan and I am currently a fourth term Business
          Information Technology student at Red River College Polytech in
          Winnipeg. I am mainly focusing on Computer Networking and System
          Administration, but I am also taking courses on programming and web
          development. My main skills are working with Cisco networking
          equipment, and Windows/Linux Servers. I have a passion for all kinds
          of technology and enjoy learning about new tech whenever I have the
          chance. In my free time I like to work on my home lab, play video and
          build games, and work on my personal programming projects. If you want
          to connect feel free to reach out to me on LinkedIn, Github, or via
          the contact form on my website.
        </p>
      </div>
    </>
  );
}
