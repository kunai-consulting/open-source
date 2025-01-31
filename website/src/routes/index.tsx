import { component$ } from "@builder.io/qwik";
import { routeLoader$, RouteNavigate } from "@builder.io/qwik-city";
import { Card } from "../components/ui/card/card";
import { Avatar } from "~/components/ui";
// import { cn } from "@qwik-ui/utils";
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


export const mappedRepos = (repositories:Repo[],nav:RouteNavigate) => {
  return repositories.map((repo: Repo) => (
  
    <>
      <Card.Root key={repo.full_name} >
        <Card.Header>
          <Card.Title>{repo.name}</Card.Title>
          <Card.Description>{repo.description}</Card.Description>
        </Card.Header>
        <Card.Content onClick$={() => nav(repo.html_url)}>
          <div class=" flex items-center space-x-4 rounded-md border p-4">
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">{repo.language}</p>
            </div>
          </div>
          <Label key={repo.full_name}>
              <h1>Last Updated: {new Date(repo.updated_at).toDateString()}</h1>
              <h1>Stargazers: {repo.stargazers_count}</h1>
              <h1>Forks: {repo.forks_count}</h1>
            </Label>
        </Card.Content>
        
      </Card.Root>
    </>
  ));
};

export const mappedMembers = (members: [Member],nav:RouteNavigate) => {
  return members.map((member: Member) => (
    <>
      <div class="flex items-center gap-4">
        <Avatar.Root key={member.login}>
          <Avatar.Image
            src={member.avatar_url}
            onClick$={() => nav(member.html_url)}
          />
        </Avatar.Root>
        <Link
          href={member.html_url}
          onClick$={(e) => {
            e.preventDefault();
            nav(member.html_url);
          }}
          class="text-[rgba(50,64,96,255)] underline hover:text-[rgba(245,165,159,255)]"
        >
          {member.login}
        </Link>
      </div>
    </>
  ));
};

export default component$(() => {
  const getRepos = useGetRepos();
  const getMembers = useGetMembers();
  const nav = useNavigate();

  return (
    <div>
    <div class="flex flex-col items-center justify-center gap-4 my-8">
      <div class="flex gap-8 items-center">
      <Link href="https://www.kunaico.com/">
        <svg width={384} height={384} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32">
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333333" flood-opacity="0.3"/>
          </filter>
          <g filter="url(#shadow)">
            <path d="M0 49.7437C0 37.8131 24.3559 33.1154 37.3081 26.1326C56.6701 15.6933 73.4510 -1.2683 81.4502 6.5217C91.0218 15.8382 68.6915 37.6423 68.6915 49.6563C68.6915 61.6699 91.0218 83.4740 81.4502 92.7904C73.4510 100.5805 56.6701 83.6186 37.3081 73.1791C24.3559 66.1965 0 61.4988 0 49.5684V49.7437Z" fill="#E85A51"></path>
            <path d="M19.8643 10.7988L58.8037 49.7003L19.8643 88.6023V10.7988ZM15.3860 0V99.4100L65.1399 49.7047L15.3860 0Z" fill="#fff" class="transition-[fill] duration-[500ms] group-data-[mobile-nav]:fill-[#2F3652]"></path>
          </g>
        </svg>
      </Link>

      </div>
      <Label class="text-4xl font-bold text-center text-[#324060]">Kunai Open Source</Label>
    </div>
    <h2 class="text-[#324060] text-center max-w-2xl mx-auto mb-8">At Kunai, we're dedicated to advancing web development through our open source projects, including contributions to Qwik - a revolutionary framework for building instant web applications. Our Qwik Design System provides developers with a comprehensive set of UI components and tools to create beautiful, consistent interfaces. Additionally, we've developed the Builder Plugin SEO to help optimize content for search engines, making web applications more discoverable and effective.</h2>
    <h2 class="text-[#324060] text-2xl font-bold text-center mb-8">Projects</h2>

<div class="flex flex-wrap items-center justify-center gap-4 mb-8">

<Button class="flex items-center gap-2">
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
<Link href="https://qwik.design">Qwik Design System</Link>
</Button>

<Button>
<Link href="https://github.com/kunai-consulting/builder-plugin-seo">Builder plugin SEO</Link>
</Button>

</div>
      <h2 class="text-[#324060] text-2xl font-bold text-center">Repositories</h2>
      <div class="grid grid-cols-3 gap-4 p-4">
        {mappedRepos(getRepos.value,nav)}
      </div>
      <h2 class="text-[#324060] text-2xl font-bold pl-4">Contributors</h2>
      <div class="grid grid-cols-2 gap-4 p-4">
      {mappedMembers(getMembers.value,nav)}
      </div>
    </div>
  );
});
