import { writable } from 'svelte/store';
import type { Project, File } from './code';

export const project = writable<Project>({
    name: null,
    files: [
        {
            name: 'index.html',
            language: 'html',
            content: ''
        }
    ]
})