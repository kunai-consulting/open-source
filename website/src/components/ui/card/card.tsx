import { component$, type PropsOf, Slot } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

const Root = component$<PropsOf<"div">>((props) => {
  return (
    <div
      {...props}
      class={cn("w-full max-w-[342px] bg-[rgba(215,233,217,255)] border-2 border-[rgb(50,64,96)] rounded-lg break-words",props.class)}
    >
      <Slot />
    </div>
  );
});

const Header = component$<PropsOf<"div">>((props) => {
  return (
    <div {...props} class={cn("flex flex-col space-y-1.5 p-6", props.class)}>
      <Slot />
    </div>
  );
});

const Title = component$<PropsOf<"h3">>((props) => {
  return (
    <h3
      {...props}
      class={cn("font-medium tracking-tight text-[rgb(233,90,81)] break-words whitespace-normal", props.class)}
    >
      <Slot />
    </h3>
  );
});

const Description = component$<PropsOf<"p">>((props) => {
  return (
    <p {...props} class={cn("text-sm text-muted-foreground break-words whitespace-normal", props.class)}>
      <Slot />
    </p>
  );
});

const Content = component$<PropsOf<"div">>((props) => {
  return (
    <div {...props} class={cn("p-6 pt-0", "grid gap-4 break-words",props.class)}>
      <Slot />
    </div>
  );
});

const Footer = component$<PropsOf<"div">>(({ ...props }) => {
  return (
    <div {...props} class={cn("flex items-center p-6 pt-0 break-words whitespace-normal", props.class)}>
      <Slot />
    </div>
  );
});

// Experimental API
const Image = component$<PropsOf<"img">>(({ ...props }) => {
  return <img {...props} class={cn("w-full object-cover", props.class)} />;
});

export const Card = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Footer,
  Image,
};
