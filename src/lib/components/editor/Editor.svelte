<script lang="ts">
	import type { Child } from '$lib/code';
	import { EditorView, basicSetup } from 'codemirror';
	import { languages } from '@codemirror/language-data';

	const { child } = $props<{ child: Child & { type: 'file' } }>();

	let language: any = $state(null);

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

<div bind:this={el}></div>
