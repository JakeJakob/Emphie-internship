import { defineConfig } from "tsup";

export default defineConfig(async () => {
  return [
    {
      entry: ["src/main.ts"],
      clean: true,
      minify: true,
    },
  ];
});
