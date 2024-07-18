import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@shadcn": path.resolve(__dirname, "./src/components/shadcn"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@stores": path.resolve(__dirname, "./src/stores"),
			"@types": path.resolve(__dirname, "./src/types/index.ts"),
			"@utils": path.resolve(__dirname, "./src/utils/index.ts"),
			"@index.css": path.resolve(__dirname, "./src/index.css"),
		},
	},
});
