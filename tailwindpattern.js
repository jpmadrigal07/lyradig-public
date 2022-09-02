const container = cn("flex flex-col min-h-lg mb-12 transition-opacity");

const buttons = cn(
  "inline-grid row-gap-5 col-gap-10 grid-rows-5 grid-flow-col",
  "sm:grid sm:grid-cols-3"
);

const character = cn(
  "hidden row-span-5 h-48 place-self-end origin-center",
  "animation-once animation-ease-out animation-0.8s animation-fill-forwards",
  "sm:block sm:animation-lightspeedin"
);
