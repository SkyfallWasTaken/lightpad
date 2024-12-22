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

export function generateUniqueId(name: string, parentPath: string = ''): string {
	const safeName = name.replace(/[^a-zA-Z0-9-]/g, '-');
	const safePath = parentPath.replace(/[^a-zA-Z0-9-]/g, '-');
	return `${safePath}${safePath ? '-' : ''}${safeName}`;
}
