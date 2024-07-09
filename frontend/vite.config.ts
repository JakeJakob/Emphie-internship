import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@types": path.resolve(__dirname, "./src/lib/types/index.ts"),
			"@components": path.resolve(__dirname, "./src/lib/components"),
			"@shadcn": path.resolve(__dirname, "./src/lib/components/shadcn"),
			"@index.css": path.resolve(__dirname, "./src/index.css"),
		},
	},
});
