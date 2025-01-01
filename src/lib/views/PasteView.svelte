<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext, onMount } from 'svelte';

	import Editor from '$lib/components/editor/Editor.svelte';
	import Tree from '$lib/components/editor/FileTree.svelte';
	import { getChildFromPath, project } from '$lib/store';

	const ctx = createTreeView({
		// defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree },
		states: { selectedItem }
	} = ctx;

	$: fileName = $selectedItem?.getAttribute('data-id') ?? '';
	$: selectedFile = getChildFromPath($project, fileName);

	onMount(() => {
		const firstItemId = $project.children[0].name;
		selectedItem.set(document.querySelector(`[data-id="${firstItemId}"]`));
	});
</script>

<div class="h-full">
	<PaneGroup direction="horizontal" style="max-height: calc(100vh - 48px);">
		<Pane minSize={20} class="bg-mantle" style="overflow-y: auto;">
			<ul class="px-4 pb-4 pt-2" {...$tree}>
				<Tree />
			</ul>
		</Pane>
		<PaneResizer
			class="relative flex w-[1px] items-center justify-center border-r border-surface0 bg-mantle px-[7px] focus:border-surface1"
		/>
		<Pane defaultSize={80} style="overflow-y: auto;">
			{#if selectedFile && selectedFile.type === 'file'}
				<Editor child={selectedFile} />
			{/if}
		</Pane>
	</PaneGroup>
</div>
