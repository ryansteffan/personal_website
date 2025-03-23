import { Octokit } from "octokit";
import { env } from "~/env";
import ProjectGrid from "~/components/client/project_grid/project_grid";
import type { PageItem } from "~/components/types/project_page";
import { IconBrandGithub } from "@tabler/icons-react";
import { type Endpoints } from "@octokit/types";

export default async function ProjectsPage(): Promise<React.ReactNode> {
  const octokit = new Octokit({
    auth: env.GITHUB_TOKEN,
  });

  const myGithubRepos: Endpoints["GET /users/{username}/repos"]["response"] =
    await octokit.request("GET /users/{username}/repos", {
      username: "TheTurnnip",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

  console.log("Pulled github details.");

  const repoItems: PageItem[] = [];

  for (const element of myGithubRepos.data) {
    // Add each cards details here
    repoItems.push({
      title: <a href={element.html_url}>{element.full_name}</a>,
      description: element.description ?? "No description available.",
      header: <Header />,
      icon: (
        <a href={element.html_url}>
          <IconBrandGithub className="h-4 w-4 text-blue-300" />
        </a>
      ),
    });
  }

  return (
    <>
      <div className="m-16" />
      {/* <UnderConstruction /> */}
      <div className="mx-auto mb-10 ml-3 mr-3 rounded-md bg-slate-700 bg-opacity-40 p-5 shadow-md shadow-black md:m-auto">
        <h2 className="pb-6 pl-2 font-sans text-4xl font-semibold tracking-tight text-black dark:text-white">
          My Projects...
        </h2>
        <ProjectGrid items={repoItems} />
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-blue-500 to-neutral-100 dark:from-blue-500 dark:to-red-400"></div>
    </>
  );
}
