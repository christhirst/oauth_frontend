<script context="module">
</script>

<script lang="ts">
	import type { PageServerLoad } from './$types';

	export let data: PageServerLoad;
	console.log("üüüüü")
	console.log(data)
	const profilDAta = JSON.stringify(data);
	console.log(data.openidFields)

	/* const items = Object.entries(data.openidFields).map(([key, value]) => {
		return Object.assign(value, { id: key });
	}); */
	//function classSwap
</script>

<div class="container">
	<h1>Profile</h1>
	<ul>
		{#each Object.entries(data.openidFields) as [key, value]}
			{#if key === 'groups'}
				<li>{key}:</li>
				<ul>
					{#each value as k}
						<li>{k}</li>
					{/each}
				</ul>
			{:else}<li>{key}: {value}</li>{/if}
		{/each}
	</ul>
</div>
