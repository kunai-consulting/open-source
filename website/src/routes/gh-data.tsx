import { routeLoader$ } from "@builder.io/qwik-city";
import type { Repo, Member, Commit } from "~/types";
import { repos, contributors, kunaicoMembers } from "~/types/consts";

import { writeFile } from 'fs/promises';

export const getRepos = routeLoader$(async ({platform}) => {
    try {
      const responses = await Promise.all(
        repos.map((repo) =>
          fetch(`https://api.github.com/repos/${repo}`, {
            headers: {
              Accept: "application/json",
              "User-Agent": "Cloudflare Worker",
              Authorization: `Bearer ${platform.env?.GH_API_KEY}`,
            },
          }).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res;
          }),
        ),
      );
      const repositories = await Promise.all(responses.map((res) => res.json()));
      
      // Write the repositories data to a JSON file
      await writeFile('repositories.json', JSON.stringify(repositories, null, 2));
      
      return repositories as Repo[];
    } catch (error) {
      console.error("Error fetching repos:", error);
      return [] as Repo[];
    }
  });
  
export const getMembers = routeLoader$(async ({platform}) => {
    try {
        const responses = await Promise.all(
            contributors.map((user) =>
                fetch(`https://api.github.com/users/${user}`, {
                    headers: {
                        Accept: "application/json",
                        "User-Agent": "Cloudflare Worker",
                        Authorization: `Bearer ${platform.env?.GH_API_KEY}`,
                    },
                }).then((res) => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res;
                }),
            ),
        );
        const members = await Promise.all(responses.map((res) => res.json()));
        
        // Write the members data to a JSON file
        await writeFile('members.json', JSON.stringify(members, null, 2));
        
        return members as Member[];
    } catch (error) {
        console.error("Error fetching members:", error);
        return [] as Member[];
    }
});

export const getCommits = routeLoader$(async ({platform}) => {
    try {
        const responses = await Promise.all(
            repos.flatMap((repo) =>
                kunaicoMembers.map((author) =>
                    fetch(`https://api.github.com/repos/${repo}/commits?author=${author}`, {
                        headers: {
                            Accept: "application/json",
                            "User-Agent": "Cloudflare Worker",
                            Authorization: `Bearer ${platform.env?.GH_API_KEY}`,
                        },
                    }).then((res) => {
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                        return res;
                    }),
                )),
        );
        const commits = await Promise.all(responses.map((res) => res.json()));
        const flattenedCommits = commits.flat(); // Flatten the array of commits

        // Write the commits data to a JSON file
        await writeFile('commits.json', JSON.stringify(flattenedCommits, null, 2));

        return flattenedCommits as Commit[];
    } catch (error) {
        console.error("Error fetching commits:", error);
        return [] as Commit[];
    }
});

export const fetchAllData = async () => {
    await Promise.all([
        getRepos(),
        getMembers(),
        getCommits()
    ]);

};
