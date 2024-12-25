<script lang="ts">
	import type { Child } from '$lib/code';
	import { EditorView, basicSetup } from 'codemirror';
	import { languages } from '@codemirror/language-data';
	import { indentWithTab } from '@codemirror/commands';
	import { keymap } from '@codemirror/view';
	import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
	import type { Extension } from '@codemirror/state';

	import { catppuccinMocha } from '$lib/editor/mocha';

	const { child } = $props<{ child: Child & { type: 'file' } }>();

	let language: Extension | undefined = $state();

	async function loadLanguage() {
		language = (
			await languages
				.find((lang) => lang.name.toLowerCase() === child.language.toLowerCase())
				?.load()
		)?.extension;
	}

	let el: HTMLElement;

	$effect(() => {
		if (child.language) {
			loadLanguage();
		}
	});

	$effect(() => {
		if (el && language) {
			const editor = new EditorView({
				doc: child.content,
				extensions: [
					basicSetup,
					language,
					catppuccinMocha,
					//oneDark,
					keymap.of([{ key: 'Tab', run: acceptCompletion }, indentWithTab]),

					EditorView.theme({
						'.cm-scroller': {
							overflow: 'auto'
						},
						'.cm-content, .cm-gutter': {
							fontFamily: 'Fira Mono, Menlo, Monaco, Lucida Console, monospace'
						},
						'.cm-content': {
							minHeight: '100%'
						}
					}),
					EditorView.updateListener.of(function (e) {
						if (e.docChanged) {
							child.content = e.state.doc.toString();
						}
					})
				],
				parent: el
			});

			return () => editor.destroy();
		}
	});
</script>

<div bind:this={el} class="h-full w-full"></div>
