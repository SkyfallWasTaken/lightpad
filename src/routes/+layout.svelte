<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import '../app.pcss';
	import '@fontsource/fira-mono';
	let { children } = $props();
</script>

<main class="mocha flex h-full w-full flex-col bg-base font-mono text-text">
	<Header />
	<div class="flex-1">
		{@render children()}
	</div>
</main>
