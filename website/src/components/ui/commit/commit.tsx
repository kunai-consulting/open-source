import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Commit as CommitType } from "~/types";
import { repoNames } from "~/types/consts";

interface CommitProps {
  repoKey: string;
  repoCommits: CommitType[];
}

export const Commit = component$<CommitProps>(({ repoKey, repoCommits }) => {
  return (
    <div key={repoKey} class="mb-6">
      <h3 class="text-xl font-bold text-[#324060] mb-3 text-center break-words">
        {repoNames[repoKey as keyof typeof repoNames]}
      </h3>
      {repoCommits.slice(0, 5).map((commit: CommitType) => (
        <Link
          href={commit.html_url}
          class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-[#E8E9EC] text-[#324060] hover:text-[#F5A59F] transition-colors mb-2"
          key={commit?.sha}
        >
          <div class="font-bold flex flex-wrap justify-between gap-2">
            <span class="break-words">
              {commit.commit?.author?.date
                ? new Date(commit.commit.author.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric", 
                    year: "numeric",
                  })
                : ""}
            </span>
            <span class="break-words">{commit.author?.login || "Unknown"}</span>
          </div>
          <div class="text-sm break-words">{commit.commit?.message || ""}</div>
        </Link>
      ))}
    </div>
  );
});
