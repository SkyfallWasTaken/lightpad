import { writable } from 'svelte/store';
import type { Project, Child } from './code';

export const project = writable<Project>({
	name: null,
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
				}
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