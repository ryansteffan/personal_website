import type { Metadata } from "next";
import { SelectRandomListElement } from "~/lib/utils";

const glowColors = [
  "hover:shadow-blue-500",
  "hover:shadow-green-500",
  "hover:shadow-orange-500",
  "hover:shadow-purple-500",
  "hover:shadow-red-500",
  "hover:shadow-yellow-500",
  "hover:shadow-pink-500",
  "hover:shadow-teal-500",
  "hover:shadow-cyan-500",
];

export const metadata: Metadata = {
  title: "Ryan Steffan - Projects",
  description: "The projects page of Ryan Steffan's website.",
  robots: { index: true, follow: true },
  keywords: [
    "Ryan Steffan",
    "coding",
    "networking",
    "programming",
    "projects",
    "portfolio",
    "website",
  ],
  authors: [{ name: "Ryan Steffan", url: "https://ryansteffan.com" }],
};

export interface Project {
  title: string;
  description: string;
  url: string;
  topics: string[];
}

export default function ProjectsPage(): React.ReactNode {
  const projects: Project[] = [
    {
      title: "Personal Portfolio Website",
      description:
        "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.\
        It also is home to my blog where I write about coding, networking, and other tech topics.",
      url: "https://github.com/RyanSteffan/personal_website",
      topics: ["Next.js", "Tailwind CSS", "React", "PostgreSQL"],
    },
    {
      title: "NASA_BOT_PYTHON",
      description:
        "A discord bot that fetches and displays NASA's Astronomy Picture of the Day (APOD) using Python and Discord.py. \
        While I do update this project from time to time, it is mostly feature complete, and I have moved on to other things.\
        The main features are easy deployment with Docker, management of the bot through Discord commands, and \
        fetching the APOD from NASA's API.",
      url: "https://github.com/RyanSteffan/NASA_BOT_PYTHON",
      topics: ["Python", "Discord.py", "Docker"],
    },
    {
      title: "Simply Syslog",
      description:
        "Simply Syslog is a simple syslog server written in Python that allows for easy \
        deployment and management of a docker-ized syslog server. This is currently a \
        work in progress but there is support for UDP logging.",
      url: "https://github.com/RyanSteffan/simply_syslog",
      topics: ["Python", "Syslog", "Docker", "Networking"],
    },
    {
      title: "My NeoVIM Config",
      description:
        "This is a repository that contains my NeoVIM configuration files. \
        It is based on kickstart.nvim and changes very little from the original.\
        It just has a few tweaks that get it to work my way.",
      url: "https://github.com/RyanSteffan/kickstart.nvim",
      topics: ["lua", "NeoVIM", "dotfiles"],
    },
    {
      title: "WezTermConfig",
      description:
        "This is a repository that contains my config for the terminal emulator WezTerm. \
                    Like my NeoVIM config, it is pretty basic and just has a few tweaks. It is intended \
                    to be cross-platform and work on both Windows and Linux.",
      url: "https://github.com/RyanSteffan/WezTermConfig",
      topics: ["lua", "WezTerm", "dotfiles"],
    },
    {
      title: "MCServerRegen",
      description:
        "This is currently a work in progress spigot plugin that I am making to \
                    allow for minecraft server admins to easily regenerate chunks in their world \
                    after a major update. This allows for new features to make it into the world without \
                    interfering with existing builds and player progress.",
      url: "https://github.com/RyanSteffan/MCServerRegen",
      topics: ["Java", "Spigot", "Minecraft"],
    },
    {
      title: "Whistler",
      description:
        "Whistler is a simple to use discord bot that allows for \
                    music to be played in a discord server. The goal is for it to be easy to use \
                    and have a simple interface. This is currently a work in progress.",
      url: "https://github.com/RyanSteffan/Whistler",
      topics: ["C#", "Discord.Net", "Discord Bot"],
    },
    {
      title: "WindowsHealthCheck",
      description:
        "WindowsHealthCheck is a an application that I have created that \
                    provides a nice GUI to check the health of your Windows PC. It checks for common issues \
                    using windows built-in tools such as SFC, DISM, and CHKDSK.",
      url: "https://github.com/ryansteffan/WindowsHealthCheck",
      topics: ["C#", "WinForms", "dotnet"],
    },
  ];

  return (
    <>
      <div className="m-16" />
      <div className="mx-auto mb-10 ml-5 mr-5 rounded-md bg-slate-700 bg-opacity-40 p-5 shadow-md shadow-black">
        <h2 className="pb-6 pl-2 font-sans text-4xl font-semibold tracking-tight text-black dark:text-white">
          My Projects...
        </h2>
        <div className="mb-4 w-full border-spacing-4 border-b border-slate-500" />
        <ProjectItems projects={projects} />
        <div className="mt-4 w-full border-spacing-4 border-b border-slate-500" />
        <p className="mt-4">
          I have more small projects on my github that you can checkout{" "}
          <a
            href="https://github.com/ryansteffan"
            className="text-blue-400 underline"
          >
            here
          </a>
          .
        </p>
      </div>
      <div className="mt-6" />
    </>
  );
}

function ProjectItems({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => (
        <a
          key={project.url}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col space-y-2 rounded-md border border-transparent bg-gray-100 p-4 transition-shadow duration-700 ease-in-out hover:shadow-md ${SelectRandomListElement<string>(glowColors)} dark:bg-gray-800`}
        >
          <h4 className="text-lg font-semibold text-black dark:text-white">
            {project.title}
          </h4>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap space-x-2 p-2">
            {project.topics.map((topic) => (
              <span
                key={topic}
                className="mt-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
