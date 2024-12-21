<script lang="ts">
	import { project } from '$lib/store';
</script>

<nav class="w-full bg-crust py-2">
	<div class="flex items-center px-3 tracking-tighter">
		<div>
			<a href="/">Lightpad</a>
			<input
				type="text"
				bind:value={$project.name}
				placeholder="File"
				class="ml-2 rounded-md bg-surface0 px-3 py-1 text-sm text-text focus:border-mauve focus:ring-lavender"
			/>
		</div>
		<div class="ml-auto">
			<a href="/about">About</a>
		</div>
	</div>
</nav>
