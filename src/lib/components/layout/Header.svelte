<script lang="ts">
	import { project, pasteCreated } from '$lib/store';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Avatar, Button, Popover, Separator } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';

	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	const session = page.data.session;

	let profilePopupOpen = $state(false);
	let pending = $state(false);

	async function newPaste() {
		pending = true;
		const response = await fetch('/paste', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify($project)
		});
		if (response.ok) {
			pasteCreated.set(true);
			pending = false;
			const json = await response.json();
			await goto(`/${json.id}`);
		} else {
			pending = false;
			alert('Failed to create paste, please try again.');
		}
	}
</script>

<nav class="w-full bg-crust py-2">
	<div class="flex items-center px-3 tracking-tighter">
		<div class="flex items-center gap-2">
			<a href="/" class="mr-2">Lightpad</a>
			<button
				contenteditable
				spellcheck="false"
				onkeydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						// @ts-ignore
						event.target!.blur();
					}
				}}
				onblur={() => {
					$project.name = $project.name.trim() || 'Untitled';
				}}
				bind:textContent={$project.name}
				class="{$pasteCreated
					? 'pointer-events-none'
					: 'mr-2'} rounded px-1 text-sm hover:bg-surface0">{$project.name}</button
			>
			{#if $pasteCreated}
				<p class="text-sm text-overlay0">by @SkyfallWasTaken</p>
			{:else}
				<Button.Root
					class="btn-small border-[1px] border-surface0 bg-mauve text-black hover:bg-surface0 hover:text-text"
					onclick={newPaste}>Create New Paste</Button.Root
				>
			{/if}
		</div>
		<div class="ml-auto flex items-center gap-2">
			{#if session}
				<Popover.Root bind:open={profilePopupOpen}>
					<Popover.Trigger>
						<div class="flex items-center gap-1">
							<Avatar.Root>
								<Avatar.Image src={session.user?.image} alt={session.user?.name} />
								<Avatar.Fallback class="bg-indigo-300 p-2 text-surface0"
									>{session.user?.name?.slice(0, 2)}</Avatar.Fallback
								>
							</Avatar.Root>
							{#if profilePopupOpen}
								<ChevronUp />
							{:else}
								<ChevronDown />
							{/if}
						</div>
					</Popover.Trigger>
					<Popover.Content class="w-64 space-y-3 bg-base font-mono text-text ">
						<div>
							<div class="font-bold">{session.user?.name}</div>
							<div class="text-surface-700 text-sm">{session.user?.email}</div>
						</div>
						<Separator.Root />
						<Button.Root
							class="btn-small !text-md border-[1px] border-surface0 hover:bg-surface0"
							onclick={() => signOut()}>Sign out</Button.Root
						>
					</Popover.Content>
				</Popover.Root>
			{:else}
				<Button.Root
					class="btn-small border-[1px] border-surface0 hover:bg-surface0"
					onclick={() => signIn()}>Sign in</Button.Root
				>
			{/if}
			<!-- 			<Button.Root class="btn-small border-[1px] border-surface0 hover:bg-surface0"
				>About</Button.Root
			> -->
		</div>
	</div>
</nav>
