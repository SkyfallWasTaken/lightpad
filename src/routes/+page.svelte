<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext } from 'svelte';

	import type { TreeItem } from '$lib/components/editor/FileTree.svelte';
	import Tree from '$lib/components/editor/FileTree.svelte';

	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;

	const treeItems: TreeItem[] = [
		{ title: 'index.svelte', icon: 'svelte' },
		{
			title: 'lib',
			icon: 'folder',
			children: [
				{
					title: 'tree',
					icon: 'folder',
					children: [
						{
							title: 'Tree.svelte',
							icon: 'svelte'
						},
						{
							title: 'TreeView.svelte',
							icon: 'svelte'
						}
					]
				},
				{
					title: 'icons',
					icon: 'folder',
					children: [
						{ title: 'JS.svelte', icon: 'svelte' },
						{ title: 'Svelte.svelte', icon: 'svelte' }
					]
				},
				{
					title: 'index.js',
					icon: 'js'
				}
			]
		},
		{
			title: 'routes',
			icon: 'folder',
			children: [
				{
					title: 'contents',
					icon: 'folder',
					children: [
						{
							title: '+layout.svelte',
							icon: 'svelte'
						},
						{
							title: '+page.svelte',
							icon: 'svelte'
						}
					]
				}
			]
		}
	];
</script>

<div class="h-full">
	<PaneGroup direction="horizontal" class="h-full">
		<Pane minSize={20}>
			<ul class="overflow-hidden px-4 pb-4 pt-2" {...$tree}>
				<Tree {treeItems} />
			</ul>
		</Pane>
		<PaneResizer
			class="relative flex w-[1px] items-center justify-center border-r border-surface0 px-[7px] focus:border-surface1"
		/>
		<Pane defaultSize={80}>Pane 2</Pane>
	</PaneGroup>
</div>
