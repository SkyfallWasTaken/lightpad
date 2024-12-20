<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
</script>

<div class="h-full">
	<PaneGroup direction="horizontal" class="h-full">
		<Pane>Pane 1</Pane>
		<PaneResizer
			class="relative flex w-[1px] items-center justify-center border-r border-surface0 px-[7px] focus:border-surface1"
		/>
		<Pane defaultSize={70}>Pane 2</Pane>
	</PaneGroup>
</div>
