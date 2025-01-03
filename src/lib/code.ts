export interface Project {
	name: string;
	isOwner: boolean;
	children: Child[];
}

export interface BaseChild {
	name: string;
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
