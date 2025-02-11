import { component$, type PropsOf, Slot } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";


export const Title = component$<PropsOf<"h2">>((props) => {
  return (
    <h2
      {...props}
      class={cn("text-[#324060] text-2xl font-bold text-center mb-6", props.class)}
    >
      <Slot />
    </h2>
  );
});
