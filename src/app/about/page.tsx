import Head from "next/head";
import UnderConstruction from "../../components/client/under_construction/under_construction";
import Link from "next/link";

export default function AboutPage(): React.ReactNode {
  return (
    <>
      <div className="m-10" />
      {/* <UnderConstruction /> */}
      <div className="m-10">
        <div className="mb-14 ml-32 mr-32">
          <h2 className="relative p-4 font-sans text-4xl font-semibold tracking-tight text-black dark:text-white">
            About Me...
          </h2>
          <div className="rounded-md bg-slate-700 bg-opacity-40 p-5">
            <p className="text-lg">
              Hi, my name is Ryan and I am currently a forth term Business
              Information Technology student at Red River College Polytech in
              Winnipeg. I am mainly focusing on Computer Networking and System
              Administration, but I am also taking courses on programming and
              web development. My main skills are working with Cisco networking
              equipment, and Windows/Linux Servers. I have a passion for all
              kinds of technology and enjoy learning about new tech whenever I
              have the chance. In my free time I like to work on my home lab,
              play video games, and work on my personal programming projects. If
              you want to connect feel free to reach out to me on LinkedIn,
              Github, or via the contact form on this email.
            </p>
            <div className="pt-3">
              <ul className="text-lg">
                <li>
                  My Linkedin:{" "}
                  <a
                    className="underline"
                    href="www.linkedin.com/in/ryan-steffan"
                  >
                    www.linkedin.com/in/ryan-steffan
                  </a>
                </li>
                <li>
                  My Github:{" "}
                  <a
                    className="underline"
                    href="https://github.com/TheTurnnip/"
                  >
                    {" "}
                    https://github.com/TheTurnnip/
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
