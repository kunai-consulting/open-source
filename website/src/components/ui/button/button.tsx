import { component$, type PropsOf, Slot } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[50px] text-sm font-medium transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      look: {
        primary:
          "border-[#324060] bg-[#324060] text-[rgba(233,90,81,255)] shadow-sm hover:bg-[#324060]/90 active:shadow-base active:press",
        secondary:
          "border-[#324060] bg-[#324060] text-[rgba(233,90,81,255)] shadow-sm hover:bg-[#324060]/90 active:shadow-base active:press",
        alert:
          "border-[#324060] bg-[#324060] text-[rgba(233,90,81,255)] shadow-sm hover:bg-[#324060]/90 active:shadow-base active:press",
        outline:
          "border border-[#324060] bg-background text-[rgba(233,90,81,255)] shadow-sm hover:bg-accent active:shadow-base active:press",
        ghost: "text-[rgba(233,90,81,255)] hover:bg-accent",
        link: "text-[rgba(233,90,81,255)] hover:bg-transparent hover:text-[rgba(233,90,81,0.8)] hover:underline hover:underline-offset-2",
      },
      size: {
        sm: "h-8 px-2 py-1.5 text-sm mx-2",
        md: "h-12 px-4 py-3 text-base mx-2",
        lg: " h-16 px-8 py-4 text-lg mx-2",
        icon: "h-10 w-10 mx-2",
      },
    },
    defaultVariants: {
      look: "primary",
      size: "md",
    },
  },
);

type ButtonProps = PropsOf<"button"> & VariantProps<typeof buttonVariants>;

export const Button = component$<ButtonProps>(({ size, look, ...props }) => {
  return (
    <button {...props} class={cn(buttonVariants({ size, look }), props.class)}>
      <Slot />
    </button>
  );
});
