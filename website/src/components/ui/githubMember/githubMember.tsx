import { component$ } from "@builder.io/qwik";
import { Link, RouteNavigate } from "@builder.io/qwik-city";
import { Avatar } from "~/components/ui";
import type { Member } from "~/types";

interface GithubMemberProps {
  member: Member;
  nav: RouteNavigate;
}

export const GithubMember = component$<GithubMemberProps>(({ member, nav }) => {
  return (
    <Link
      href={member.html_url}
      onClick$={(e) => {
        e.preventDefault();
        nav(member.html_url);
      }}
      class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-[#E8E9EC] text-[#324060] hover:text-[#F5A59F] transition-colors"
      key={member.login}
    >
      <Avatar.Root>
        <Avatar.Image src={member.avatar_url} class="cursor-pointer" />
      </Avatar.Root>
      <span>{member.login}</span>
    </Link>
  );
});
