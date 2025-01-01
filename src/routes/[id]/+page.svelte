<script lang="ts">
	import PasteView from '$lib/views/PasteView.svelte';
	import type { PageData } from './$types';
	import { project } from '$lib/store';

	let { data }: { data: PageData } = $props();
	project.set(data.project);
</script>

<PasteView />
