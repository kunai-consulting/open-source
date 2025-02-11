import { component$ } from "@builder.io/qwik";
import { RouteNavigate } from "@builder.io/qwik-city";
import { Card } from "../card/card";
import { Label } from "../label/label";
import type { Repo } from "~/types";

interface RepoCardProps {
  repo: Repo;
  nav: RouteNavigate;
}

export const RepoCard = component$<RepoCardProps>(({ repo, nav }) => {
  return (
    <Card.Root onClick$={() => nav(repo.html_url)} key={repo.full_name} class="bg-white shadow-lg hover:shadow-xl transition-shadow border border-[#E8E9EC]">
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
          <Card.Footer>
            <Card.Item>Last Updated:</Card.Item><Card.Value>{repo.updated_at ? new Date(repo.updated_at).toDateString() : ''}</Card.Value>
          </Card.Footer>
          <Card.Footer>
            <Card.Item>Stargazers:</Card.Item> <Card.Value>{repo.stargazers_count}</Card.Value>
          </Card.Footer>
          <Card.Footer>
            <Card.Item>Forks:</Card.Item> <Card.Value>{repo.forks_count}</Card.Value>
          </Card.Footer>
        </Label>
      </Card.Content>
    </Card.Root>
  );
});
