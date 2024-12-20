import { writable } from 'svelte/store';
import type { Project, Item } from './code';

export const project = writable<Project>({
    name: null,
    Item: [
        {
            name: 'index.html',
            language: 'html',
            content: ''
        }
    ]
})