import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'codemirror',
			'@codemirror/commands',
			'@codemirror/language',
			'@codemirror/state',
			'@codemirror/view',
			'@codemirror/language-data',
			'@codemirror/lang-markdown',
			'@lezer/highlight'
		]
	}
});
