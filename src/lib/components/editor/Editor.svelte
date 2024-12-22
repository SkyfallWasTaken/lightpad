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

	onMount(async () => {
		const { CodeJar } = await import('codejar');

		// Force Prism to highlight with the correct language
		const highlight = (editor: HTMLElement) => {
			console.time('highlight');
			editor.className = `language-${child.language} line-numbers`;
			Prism.highlightElement(editor);
			console.timeEnd('highlight');
		};

		const jar = new CodeJar(el, highlight);
		loaded = true;
	});

	export let child: Child & { type: 'file' };
</script>

<pre bind:this={el} class="language-{child.language}"></pre>
{#if !loaded}
	<pre><code>{child.content}</code></pre>
{/if}
