import { writable } from 'svelte/store';
import type { Project } from './code';

export const project = writable<Project>({
	name: null,
	children: [
		{
			name: 'index.html',
			type: 'file',
			language: 'html',
			content: ''
		}
	]
});
