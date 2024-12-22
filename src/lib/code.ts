export interface Project {
	name: string | null;
	children: Child[];
}

type Icon = 'svelte' | 'folder' | 'js';

export interface BaseChild {
	name: string;
	icon: Icon;
	type: 'file' | 'folder';
	children?: Child[];
}

export interface FileChild extends BaseChild {
	type: 'file';
	language: string;
	content: string;
}

export interface FolderChild extends BaseChild {
	type: 'folder';
}

export type Child = FileChild | FolderChild;
