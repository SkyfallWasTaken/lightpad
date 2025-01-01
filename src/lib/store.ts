import { writable } from 'svelte/store';
import type { Project, Child } from './code';
import { stripIndents } from 'common-tags';

export const project = writable<Project>({
	name: 'High Seas Demo',
	isOwner: true,
	children: [
		{
			name: 'README.md',
			type: 'file',
			language: 'markdown',
			content: stripIndents`
			# Welcome to Lightpad!

			This is a place where you can paste code snippets and share them with the world.

			## Features

			- Markdown support
			- Syntax highlighting
			- Authenticated pastes with GitHub login
			- File icons (using the \`vscode-icons\` icon pack)
			- Multi-file support

			\`\`\`ts
			const message = "And code blocks too!"
			console.log(message)
			\`\`\`

			Why not give it a try? This paste is editable (for yourself).
			`
		},
		{
			name: 'demo',
			type: 'folder',
			children: [
				{
					name: 'index.html',
					type: 'file',
					language: 'html',
					content: '<h1>Goodbye world</h1>'
				},
				{
					name: 'App.svelte',
					type: 'file',
					language: 'html',
					content: '<h1>Goodbye world</h1>'
				},
				{
					name: 'styles.css',
					type: 'file',
					language: 'css',
					content: 'h1 { color: red }'
				},
				{
					name: 'main.js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
			]
		}
	]
});

export function getChildFromPath(project: Project, path: string): Child | undefined {
	if (!path) return undefined;

	const segments = path.split('/').filter(Boolean);
	let current: Child[] = project.children;

	for (const segment of segments) {
		const found = current.find((child) => child.name === segment);
		if (!found) return undefined;

		if (found.type === 'folder') {
			current = found.children || [];
		} else {
			// If we found a file but still have more segments, path is invalid
			if (segments.indexOf(segment) < segments.length - 1) return undefined;
			return found;
		}
	}

	// If we've gone through all segments and ended up here,
	// return the last folder we found
	return current[current.length - 1];
}
