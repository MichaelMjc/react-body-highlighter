import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	server: {
		fs: {
			allow: [".."], // allow access to files one level up (react-body-highlight)
		},
		watch: {
			// Optional: ignore node_modules EXCEPT react-body-highlight
			ignored: ["!**/node_modules/react-body-highlight/**"],
		},
	},
	resolve: {
		alias: {
			"react-body-highlighter": path.resolve(__dirname, "../"), // point to actual src folder of the lib
		},
	},
	optimizeDeps: {
		include: ["react-body-highlighter"],
		exclude: [], // ensure it's not excluded
	},
});
