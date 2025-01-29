import { component$ } from "@builder.io/qwik";
import { routeLoader$, RouteNavigate } from "@builder.io/qwik-city";
import { Card } from "../components/ui/card/card";
import { Avatar } from "~/components/ui";
import { cn } from "@qwik-ui/utils";
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

export const mappedRepos = (repositories: [Repo],nav:RouteNavigate) => {
  return repositories.map((repo: Repo) => (
    
    <Card.Root key={repo.full_name} class={cn("w-[380px]")}>
      <Card.Header>
        <Card.Title>{repo.name}</Card.Title>
        <Card.Description>{repo.description}</Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-4" onClick$={() => nav(repo.html_url)}>
        <div class=" flex items-center space-x-4 rounded-md border p-4">
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">{repo.language}</p>
          </div>
          {/* <Switch /> */}
        </div>
        <Label key={repo.full_name}>
            <h1>Last Updated: {repo.updated_at.toLocaleString()}</h1>
            <h1>Stargazers: {repo.stargazers_count}</h1>
            <h1>Forks: {repo.forks_count}</h1>
          </Label>
      </Card.Content>
      
    </Card.Root>
  ));
};

export const mappedMembers = (members: [Member],nav:RouteNavigate) => {
  return members.map((member: Member) => (
    <>
      <Avatar.Root key={member.login}>
        <Avatar.Image
          src={member.avatar_url}
          onClick$={() => nav(member.html_url)}
        />
      </Avatar.Root>
      <h3>{member.login}</h3>
    </>
  ));
};

export default component$(() => {
  const getRepos = useGetRepos();
  const getMembers = useGetMembers();
  const nav = useNavigate();

  return (
    <div>
    <Label>Kunai Open Source</Label>
    <h2>brief description of kunais commitment to open source</h2>
      <Label>Repositories</Label>
      {mappedRepos(getRepos.value,nav)}
      <Label>Contributors</Label>
      {mappedMembers(getMembers.value,nav)}
      <h1>
      <Label>Projects</Label>
      </h1>

      <>

      <Button>
      <Link href="https://qwik.dev">Qwik</Link>
      </Button>

<Button>
<Link href="https://qwik.design">Qwik Design System</Link>
</Button>

   <Button>
   <Link href="https://github.com/kunai-consulting/builder-plugin-seo">Builder plugin SEO</Link>
   </Button>


      </>
    </div>
  );
});
