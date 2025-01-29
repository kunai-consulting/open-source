import { component$ } from "@builder.io/qwik";
import { routeLoader$, RouteNavigate } from "@builder.io/qwik-city";
import { Card } from "../components/ui/card/card";
import { Avatar } from "~/components/ui";
import { cn } from "@qwik-ui/utils";
import { useNavigate } from "@builder.io/qwik-city";


export interface Repo {
  full_name: string;
  name: string;
  url: string;
  language: string;
  description: string;
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

export const mappedRepos = (repositories: [Repo]) => {
  return repositories.map((repo: Repo) => (
    <Card.Root key={repo.full_name} class={cn("w-[380px]")}>
      <Card.Header>
        <Card.Title>{repo.name}</Card.Title>
        <Card.Description>{repo.description}</Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class=" flex items-center space-x-4 rounded-md border p-4">
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">{repo.language}</p>
          </div>
          {/* <Switch /> */}
        </div>
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
    <>
    <title>Qwik Open Source</title>
      <h1>Repositories</h1>
      {mappedRepos(getRepos.value)}
      <h1>Contributors</h1>
      {mappedMembers(getMembers.value,nav)}
    </>
  );
});
