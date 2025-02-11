import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const KunaiLogo = component$(() => {
  return (
    <div class="flex gap-6 items-center justify-center">
      <Link href="https://www.kunaico.com/" class="bg-[#324060] rounded-full p-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-105">
        <svg width={384} height={384} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32">
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#333333" flood-opacity="0.3" />
          </filter>
          <g filter="url(#shadow)" transform="translate(24 14)">
            <path d="M0 49.7437C0 37.8131 24.3559 33.1154 37.3081 26.1326C56.6701 15.6933 73.4510 -1.2683 81.4502 6.5217C91.0218 15.8382 68.6915 37.6423 68.6915 49.6563C68.6915 61.6699 91.0218 83.4740 81.4502 92.7904C73.4510 100.5805 56.6701 83.6186 37.3081 73.1791C24.3559 66.1965 0 61.4988 0 49.5684V49.7437Z" fill="#E85A51"></path>
            <path d="M19.8643 10.7988L58.8037 49.7003L19.8643 88.6023V10.7988ZM15.3860 0V99.4100L65.1399 49.7047L15.3860 0Z" fill="#fff" class="transition-[fill] duration-[500ms] group-data-[mobile-nav]:fill-[#2F3652]"></path>
          </g>
        </svg>
      </Link>
    </div>
  );
});
