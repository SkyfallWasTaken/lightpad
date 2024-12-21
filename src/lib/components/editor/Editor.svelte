<script lang="ts">
	import { onMount } from 'svelte';
	import type { Child } from '$lib/code';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-markdown';
	import 'prismjs/components/prism-json';
	import 'prismjs/themes/prism.css';
	import '../../../prism-mocha.css';

	Prism.plugins.autoloader.languages_path =
		'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/';
	import 'prismjs/plugins/autoloader/prism-autoloader.min.js';

	let el: HTMLElement;
	let loaded = false;

	// Map file extensions to Prism language identifiers
	const languageMap: Record<string, string> = {
		ts: 'typescript',
		js: 'javascript',
		svelte: 'svelte',
		css: 'css',
		md: 'markdown',
		json: 'json'
	};

	onMount(async () => {
		const { CodeJar } = await import('codejar');

		// Force Prism to highlight with the correct language
		const highlight = (editor: HTMLElement) => {
			const lang = languageMap[child.language] || child.language;
			editor.className = `language-${lang}`;
			Prism.highlightElement(editor);
		};

		const jar = new CodeJar(el, highlight);
		loaded = true;
	});

	export let child: Child & { type: 'file' };
</script>

<code bind:this={el} class="line-numbers language-{child.language}"></code>
{#if !loaded}
	<pre><code>{child.content}</code></pre>
{/if}
