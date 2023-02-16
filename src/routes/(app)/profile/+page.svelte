<script lang="ts">
	import type { PageServerLoad } from './$types';

	export let data: PageServerLoad;
	const profilDAta = JSON.stringify(data.openidFields);

	const items = Object.entries(data.openidFields).map(([key, value]) => {
		return Object.assign(value, { id: key });
	});
</script>

<div class="container">
	<h1>Profile</h1>
	<ul>
		{#each Object.entries(data.openidFields) as [key, value]}
			<li>{key}: {value}</li>
		{/each}
	</ul>
</div>
