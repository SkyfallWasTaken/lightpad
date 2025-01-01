import { writable } from 'svelte/store';
import type { Project, Child } from './code';

export const project = writable<Project>({
	name: "Lorem",
	isOwner: true,
	children: [
		{
			name: 'index.html',
			icon: 'svelte',
			type: 'file',
			language: 'html',
			content: '<h1>Hello world</h1>'
		},
		{
			name: "src",
			icon: 'folder',
			type: 'folder',
			children: [
				{
					name: 'index.html',
					icon: 'svelte',
					type: 'file',
					language: 'html',
					content: '<h1>Goodbye world</h1>'
				},
				{
					name: 'App.svelte',
					icon: 'svelte',
					type: 'file',
					language: 'html',
					content: '<h1>Goodbye world</h1>'
				},
				{
					name: 'styles.css',
					icon: 'svelte',
					type: 'file',
					language: 'css',
					content: 'h1 { color: red }'
				},
				{
					name: 'main.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main2.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main3.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main4.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main5.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main6.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main7.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main8.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main9.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main10.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main11.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main12.js',
					icon: 'js',
					type: 'file',
					language: 'javascript',
					content: 'console.log("Hello world")'
				},
				{
					name: 'main13.js',
					icon: 'js',
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
		const found = current.find(child => child.name === segment);
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