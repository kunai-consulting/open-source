import { component$ } from "@builder.io/qwik";
import { routeLoader$, type RouteNavigate } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { Label } from "~/components/ui/label/label";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui";
import { RepoCard } from "~/components/ui/repoCard/repoCard";
import { GithubMember } from "~/components/ui/githubMember/githubMember";
import { Commit as CommitComponent } from "~/components/ui/commit/commit";
import { Repo, Member, Commit } from "~/types";
import { repoNames, kunaicoMembers, repos, contributors } from "~/types/consts";
import { Title } from "~/components/ui/title/title";
import { KunaiLogo } from "~/components/ui/kunaiLogo/kunaiLogo";


export const sortCommitsByDate = (commits: Commit[]) => {
  // Sort all commits by most recent date first
  const sortedCommits = [...commits].sort((a, b) => {
    const dateA = new Date(a.commit?.author?.date || 0);
    const dateB = new Date(b.commit?.author?.date || 0);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });
  return sortedCommits;
};


export const useGetRepos = routeLoader$(async ({platform}) => {
  try {
    const responses = await Promise.all(
      repos.map((repo) =>
        fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/json",
            "User-Agent": "Cloudflare Worker",
            Authorization: `Bearer ${platform.env?.GH_API_TOKEN}`,
          },
        }).then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res;
        }),
      ),
    );
    const repositories = await Promise.all(responses.map((res) => res.json()));
    return repositories as Repo[];
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [] as Repo[];
  }
});

export const useGetMembers = routeLoader$(async ({platform}) => {
	try {
		const responses = await Promise.all(
			contributors.map((user) =>
				fetch(`https://api.github.com/users/${user}`, {
					headers: {
						Accept: "application/json",
						"User-Agent": "Cloudflare Worker",
            Authorization: `Bearer ${platform.env?.GH_API_TOKEN}`,
					},
				}).then((res) => {
					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
					return res;
				}),
			),
		);
		const members = await Promise.all(responses.map((res) => res.json()));
		return members as Member[];
	} catch (error) {
		console.error("Error fetching members:", error);
		return [] as Member[];
	}
});

export const useGetCommits = routeLoader$(async ({platform}) => {
	try {
		const responses = await Promise.all(
			repos.flatMap((repo) =>
        kunaicoMembers.map((author) =>
				fetch(`https://api.github.com/repos/${repo}/commits?author=${author}`, {
					headers: {
						Accept: "application/json",
						"User-Agent": "Cloudflare Worker",
            Authorization: `Bearer ${platform.env?.GH_API_TOKEN}`,
					},
				}).then((res) => {
					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
					return res;
				}),
			)),
		);
    const commits = await Promise.all(responses.map((res) => res.json()));
    const flattenedCommits = commits.flat(); // Flatten the array of commits
    return flattenedCommits as Commit[];
	} catch (error) {
		console.error("Error fetching members:", error);
		return [] as Commit[];
	}
});

export const mappedRepos = (repositories: Repo[], nav: RouteNavigate) => {
  if (repositories.length > 0) {
    return repositories.map((repo: Repo) => (
      <RepoCard key={repo.name} repo={repo} nav={nav} />
    ));
  } else {
    return <div class="text-[#6B7280]">No repositories found</div>;
  }
};

export const mappedMembers = (members: Member[], nav: RouteNavigate) => {
  if (members.length > 0) {
    return members.map((member) => <GithubMember key={member.id} member={member} nav={nav} />);
  } else {
    return <div class="text-[#6B7280]">No members found</div>;
  }
};

export const mappedCommits = (commits: Commit[]) => {
  // First sort all commits by date
  const allSortedCommits = sortCommitsByDate(commits);

  // Group commits by repo
  const groupedCommits: Record<keyof typeof repoNames, Commit[]> = {} as Record<
    keyof typeof repoNames,
    Commit[]
  >;

  allSortedCommits.forEach((commit) => {
    if (commit.html_url) {
      const repoKey = Object.keys(repoNames).find((key) =>
        commit.html_url?.includes(key)
      );
      if (repoKey && repoKey in repoNames) {
        if (!groupedCommits[repoKey as keyof typeof repoNames]) {
          groupedCommits[repoKey as keyof typeof repoNames] = [];
        }
        // Only add if we have less than 5 commits for this repo
        if (groupedCommits[repoKey as keyof typeof repoNames].length < 5) {
          groupedCommits[repoKey as keyof typeof repoNames].push(commit);
        }
      }
    }
  });

  return Object.entries(groupedCommits).map(([repoKey, repoCommits]) => (
    <CommitComponent key={repoKey} repoKey={repoKey} repoCommits={repoCommits} />
  ));

};

export default component$(() => {
  const getRepos = useGetRepos();
  const getMembers = useGetMembers();
  const getCommits = useGetCommits();

  const nav = useNavigate();

  return (
    <div class="container mx-auto px-4 bg-[#FFFFFF]">
      <div class="flex flex-col items-center justify-center gap-5 py-10">
        <KunaiLogo />
        <Label class="text-4xl font-bold text-[#324060]">Kunai Open Source</Label>
      </div>

      <div class="max-w-4xl mx-auto mb-10">
        <h2 class="text-[#324060] text-center leading-relaxed">
          At Kunai, we're dedicated to advancing web development through our open
          source projects, including contributions to Qwik - a revolutionary
          framework for building instant web applications. Our Qwik Design System
          provides developers with a comprehensive set of UI components and tools to
          create beautiful, consistent interfaces. Additionally, we've developed the
          Builder Plugin SEO to help optimize content for search engines, making
          web applications more discoverable and effective.
        </h2>
      </div>

      <Title>Projects</Title>
      <div class="flex flex-wrap items-center justify-center gap-4 mb-10">
        <Button>
          <Link href="https://qwik.design">Qwik Design System</Link>
        </Button>

        <Button>
          <Link href="https://qwik.dev" class="flex items-center gap-2">
            Qwik
            <img
              src="https://raw.githubusercontent.com/BuilderIO/qwik/main/packages/docs/public/logos/qwik-logo.svg"
              alt="Qwik Logo"
              width={24}
              height={24}
              class="w-6 h-6"
            />
          </Link>
        </Button>

        <Button>
          <Link href="https://github.com/kunai-consulting/builder-plugin-seo">
            Builder plugin SEO
          </Link>
        </Button>
        <Button>
          <Link href="https://github.com/twentyhq/twenty">
            Twenty
          </Link>
        </Button>
      </div>

      <Title>Repositories</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 max-w-3xl mx-auto px-4">
        {mappedRepos(getRepos.value, nav)}
      </div>

      <Title>Contributors</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {mappedMembers(getMembers.value, nav)}
      </div>

      <Title>Recent Commits</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {mappedCommits(getCommits.value)}
      </div>
    </div>
  );
});
