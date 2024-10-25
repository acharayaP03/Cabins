import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: 'tests/setupTests.js',
		globals: true,
		ui: true,
		coverage: {
			provider: 'v8', // Use V8 to collect coverage
			reporter: ['text', 'html', 'json'], // Generate text and HTML reports
			include: ['tests/**/*.{js,jsx}', 'tests/unit/**/*.test.js'], // Specify which files to include
			exclude: ['tests/**/*.test.{js,jsx}', 'tests/setupTests.js'],
			reportsDirectory: './coverage',
		},
	},
	envDir: './', // Load environment variables from the root,
	define: {
		'import.meta.vitest': 'true', // Fix for potential import.meta issues in testing
	},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		port: 3000,
	},
});
