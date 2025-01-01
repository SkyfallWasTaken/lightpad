<script context="module" lang="ts">
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';
</script>

<script lang="ts">
	import { melt, type TreeView } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { project } from '$lib/store';

	export let level = 1;
	export let treeItems = $project.children;
	export let parentPath = '';

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');
</script>

{#each treeItems as { name, type, children }, i}
	{@const itemId = `${parentPath}${parentPath ? '/' : ''}${name}`}
	{@const hasChildren = !!children?.length}
	{@const currentPath = `${parentPath}${parentPath ? '/' : ''}${name}`}

	<li class={level !== 1 ? 'pl-4' : ''}>
		<button
			class="focus:bg-magnum-200 flex items-center gap-1.5 rounded-md p-1"
			use:melt={$item({
				id: itemId,
				hasChildren
			})}
		>
			<!-- Add icon. -->
			{#if type === 'folder' && $isExpanded(itemId)}
				<img
					src={`/icons/${getIconForOpenFolder(name)}`}
					class="h-4 w-4"
					alt={`Icon for ${name}`}
				/>
			{:else if type === 'folder'}
				<img src={`/icons/${getIconForFolder(name)}`} class="h-4 w-4" alt={`Icon for ${name}`} />
			{:else}
				<img src={`/icons/${getIconForFile(name)}`} class="h-4 w-4" alt={`Icon for ${name}`} />
			{/if}

			<span class="select-none">{name}</span>

			<!-- Selected icon. -->
			{#if $isSelected(itemId)}
				<ArrowLeft class="h-4 w-4" />
			{/if}
		</button>

		{#if hasChildren}
			{#if $isExpanded(itemId)}
				<ul {...$group({ id: itemId })} class="mt-1">
					<svelte:self treeItems={children} level={level + 1} parentPath={currentPath} />
				</ul>
			{/if}
		{/if}
	</li>
{/each}

<style>
	/* Remove docs' focus box-shadow styling. */
	li:focus {
		box-shadow: none !important;
	}
</style>
