<script context="module" lang="ts">
	import { ArrowLeft, Folder, FolderOpen } from 'lucide-svelte';
	import JS from '$lib/components/editor/icons/JS.svelte';
	import Svelte from '$lib/components/editor/icons/Svelte.svelte';

	export const icons = {
		svelte: Svelte,
		folder: Folder,
		folderOpen: FolderOpen,
		js: JS,
		highlight: ArrowLeft
	};
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

{#each treeItems as { name, icon, children }, i}
	{@const itemId = `${parentPath}${parentPath ? '/' : ''}${name}`}
	{@const hasChildren = !!children?.length}
	{@const currentPath = `${parentPath}${parentPath ? '/' : ''}${name}`}

	<li class={level !== 1 ? 'pl-4' : ''}>
		<button
			class="focus:bg-magnum-200 flex items-center gap-1 rounded-md p-1"
			use:melt={$item({
				id: itemId,
				hasChildren
			})}
		>
			<!-- Add icon. -->
			{#if icon === 'folder' && hasChildren && $isExpanded(itemId)}
				<svelte:component this={icons['folderOpen']} class="h-4 w-4" />
			{:else}
				<svelte:component this={icons[icon]} class="h-4 w-4" />
			{/if}

			<span class="select-none">{name}</span>

			<!-- Selected icon. -->
			{#if $isSelected(itemId)}
				<svelte:component this={icons['highlight']} class="h-4 w-4" />
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
