import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: 'tests/setupTests.js',
		globals: true,
		coverage: {
			enabled: true, // Enable coverage reporting
			reporter: ['text', 'html'], // Generate text and HTML reports
			all: true, // Include all files, even those not directly tested
			include: ['tests/**/*.{js,jsx}', 'tests/unit/**/*.test.js'], // Specify which files to include
			exclude: ['tests/**/*.test.{js,jsx}', 'tests/setupTests.js'],
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
