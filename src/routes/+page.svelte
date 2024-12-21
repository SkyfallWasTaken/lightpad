<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { type TreeView } from '@melt-ui/svelte';

	import Editor from '$lib/components/editor/Editor.svelte';
	import Tree from '$lib/components/editor/FileTree.svelte';

	const ctx = createTreeView({
		// defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree },
		states: { selectedItem }
	} = ctx;

	$effect(() => {
		console.log($selectedItem);
	});
</script>

<div class="h-full">
	<PaneGroup direction="horizontal" class="h-full">
		<Pane minSize={20}>
			<ul class="overflow-hidden px-4 pb-4 pt-2" {...$tree}>
				<Tree />
			</ul>
		</Pane>
		<PaneResizer
			class="relative flex w-[1px] items-center justify-center border-r border-surface0 px-[7px] focus:border-surface1"
		/>
		<Pane defaultSize={80}>
			{#if $selectedItem}
				<Editor child={props[$selectedItem]} />
			{/if}
		</Pane>
	</PaneGroup>
</div>
