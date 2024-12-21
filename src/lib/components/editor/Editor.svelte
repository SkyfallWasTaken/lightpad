<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { html } from '@codemirror/lang-html';
	import type { Child } from '$lib/code';

	export let child: Child & { type: 'file' };
</script>

<CodeMirror bind:value={child.content} lang={html()} />
