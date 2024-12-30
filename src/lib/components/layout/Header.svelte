<script lang="ts">
	import { project } from '$lib/store';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button } from 'bits-ui';

	import { page } from '$app/state';
	const session = page.data.session;
</script>

<nav class="w-full bg-crust py-2">
	<div class="flex items-center px-3 tracking-tighter">
		<div class="flex items-center gap-2">
			<a href="/" class="mr-2">Lightpad</a>
			<p class="text-sm">{$project.name}</p>
			<p class="text-sm text-overlay0">by @SkyfallWasTaken</p>
		</div>
		<div class="ml-auto flex items-center gap-2">
			{#if session}
				<Button.Root
					class="btn-small border-[1px] border-surface0 hover:bg-surface0"
					onclick={() => signOut()}>Sign out</Button.Root
				>
			{:else}
				<Button.Root class="btn-small bg-mauve text-surface0" onclick={() => signIn()}
					>Sign in</Button.Root
				>
			{/if}
			<Button.Root class="btn-small border-[1px] border-surface0 hover:bg-surface0"
				>About</Button.Root
			>
		</div>
	</div>
</nav>
