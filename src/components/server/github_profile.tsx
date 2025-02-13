"use client";

import { data } from "framer-motion/client";
import { Octokit, App } from "octokit";

export default function GithubProfile() {
  //   const githubApi: Octokit = new Octokit();
  //   const profile = await githubApi.request("GET /users/{username}", {
  //     username: "TheTurnnip",
  //     headers: { "X-GitHub-Api-Version": "2022-11-28" },
  //   });

  const data = {
    login: "TheTurnnip",
    id: 88756502,
    node_id: "MDQ6VXNlcjg4NzU2NTAy",
    avatar_url: "https://avatars.githubusercontent.com/u/88756502?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/TheTurnnip",
    html_url: "https://github.com/TheTurnnip",
    followers_url: "https://api.github.com/users/TheTurnnip/followers",
    following_url:
      "https://api.github.com/users/TheTurnnip/following{/other_user}",
    gists_url: "https://api.github.com/users/TheTurnnip/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/TheTurnnip/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/TheTurnnip/subscriptions",
    organizations_url: "https://api.github.com/users/TheTurnnip/orgs",
    repos_url: "https://api.github.com/users/TheTurnnip/repos",
    events_url: "https://api.github.com/users/TheTurnnip/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/TheTurnnip/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "Ryan Steffan",
    company: null,
    blog: "ryansteffan.com",
    location: null,
    email: null,
    hireable: null,
    bio: "Hi, I am Ryan. I am a student at RRC Polytech and I mainly work with Python and C#. ",
    twitter_username: null,
    public_repos: 16,
    public_gists: 0,
    followers: 1,
    following: 0,
    created_at: "2021-08-11T02:36:59Z",
    updated_at: "2025-02-07T03:38:09Z",
  };

  console.log(data);

  return <></>;
}
