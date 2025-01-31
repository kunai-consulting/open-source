import { component$ } from "@builder.io/qwik";
import { routeLoader$, RouteNavigate } from "@builder.io/qwik-city";
import { Card } from "../components/ui/card/card";
import { Avatar } from "~/components/ui";
import { useNavigate } from "@builder.io/qwik-city";
import { Label } from "~/components/ui/label/label";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui";

export interface Repo {
  full_name: string;
  name: string;
  html_url: string;
  url: string;
  language: string;
  description: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

export interface Member {
  login: string;
  avatar_url: string;
  html_url: string;
}

export const useGetRepos = routeLoader$(async () => {
  const response = await fetch("https://api.github.com/orgs/QwikDev/repos", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as [Repo];
});

export const useGetMembers = routeLoader$(async () => {
  const response = await fetch("https://api.github.com/orgs/QwikDev/members", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as [Member];
});

export const mappedRepos = (repositories: Repo[], nav: RouteNavigate) => {
  if (repositories.length > 0) {
    return repositories.map((repo: Repo) => (
      <>
        <Card.Root onClick$={() => nav(repo.html_url)}  key={repo.full_name} class="bg-white shadow-lg hover:shadow-xl transition-shadow border border-[#E8E9EC]">
          <Card.Header>
            <Card.Title class="text-[#324060] text-xl font-semibold">{repo.name}</Card.Title>
            <Card.Description class="text-[#6B7280]">{repo.description}</Card.Description>
          </Card.Header>
          <Card.Content class="cursor-pointer">
            {repo.language && (
              <div class="flex items-center space-x-4 rounded-full p-4 bg-[#EBF8FF] w-fit">
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-medium text-[#324060]">{repo.language}</p>
                </div>
              </div>
            )}
            <Label key={repo.full_name} class="mt-4 space-y-2">
              <h1 class="text-[#6B7280]">Last Updated: {new Date(repo.updated_at).toDateString()}</h1>
              <h1 class="text-[#6B7280]">Stargazers: {repo.stargazers_count}</h1>
              <h1 class="text-[#6B7280]">Forks: {repo.forks_count}</h1>
            </Label>
          </Card.Content>
        </Card.Root>
      </>
    ));
  } else {
    return <div class="text-[#6B7280]">No repositories found</div>;
  }
};

export const mappedMembers = (members: [Member], nav: RouteNavigate) => {
  if (members.length > 0) {
    return members.map((member: Member) => (
      <>
        <Link
          href={member.html_url}
          onClick$={(e) => {
            e.preventDefault();
            nav(member.html_url);
          }}
          class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-[#E8E9EC] text-[#324060] hover:text-[#F5A59F] transition-colors"
        >
          <Avatar.Root key={member.login}>
            <Avatar.Image
              src={member.avatar_url}
              class="cursor-pointer"
            />
          </Avatar.Root>
          <span>{member.login}</span>
        </Link>
      </>
    ));
  } else {
    return <div class="text-[#6B7280]">No members found</div>;
  }
};

export default component$(() => {
  const getRepos = useGetRepos();
  const getMembers = useGetMembers();
  const nav = useNavigate();

  return (
    <div class="container mx-auto px-4 bg-[#FFFFFF]">
      <div class="flex flex-col items-center justify-center gap-6 py-12">
        <div class="flex gap-8 items-center justify-center">
          <Link href="https://www.kunaico.com/" class="bg-[#324060] rounded-full p-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
            <svg width={384} height={384} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32">
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333333" flood-opacity="0.3"/>
              </filter>
              <g filter="url(#shadow)" transform="translate(24 14)">
                <path d="M0 49.7437C0 37.8131 24.3559 33.1154 37.3081 26.1326C56.6701 15.6933 73.4510 -1.2683 81.4502 6.5217C91.0218 15.8382 68.6915 37.6423 68.6915 49.6563C68.6915 61.6699 91.0218 83.4740 81.4502 92.7904C73.4510 100.5805 56.6701 83.6186 37.3081 73.1791C24.3559 66.1965 0 61.4988 0 49.5684V49.7437Z" fill="#E85A51"></path>
                <path d="M19.8643 10.7988L58.8037 49.7003L19.8643 88.6023V10.7988ZM15.3860 0V99.4100L65.1399 49.7047L15.3860 0Z" fill="#fff" class="transition-[fill] duration-[500ms] group-data-[mobile-nav]:fill-[#2F3652]"></path>
              </g>
            </svg>
          </Link>
        </div>
        <Label class="text-4xl font-bold text-[#324060]">Kunai Open Source</Label>
      </div>
      
      <div class="max-w-4xl mx-auto mb-12">
        <h2 class="text-[#324060] text-center leading-relaxed">
          At Kunai, we're dedicated to advancing web development through our open source projects, including contributions to Qwik - a revolutionary framework for building instant web applications. Our Qwik Design System provides developers with a comprehensive set of UI components and tools to create beautiful, consistent interfaces. Additionally, we've developed the Builder Plugin SEO to help optimize content for search engines, making web applications more discoverable and effective.
        </h2>
      </div>

      <h2 class="text-[#324060] text-2xl font-bold text-center mb-8">Projects</h2>

      <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
        <Button class="bg-[#324060] hover:bg-[#F5A59F] text-white flex items-center gap-2 shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
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

        <Button class="bg-[#324060] hover:bg-[#F5A59F] text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
          <Link href="https://qwik.design">Qwik Design System</Link>
        </Button>

        <Button class="bg-[#324060] hover:bg-[#F5A59F] text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.25)]">
          <Link href="https://github.com/kunai-consulting/builder-plugin-seo">Builder plugin SEO</Link>
        </Button>
      </div>

      <h2 class="text-[#324060] text-2xl font-bold text-center mb-8">Repositories</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mappedRepos(getRepos.value, nav)}
      </div>

      <h2 class="text-[#324060] text-2xl font-bold mb-8">Contributors</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {mappedMembers(getMembers.value, nav)}
      </div>
    </div>
  );
});
