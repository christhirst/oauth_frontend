<script lang="ts">
	import type { PageServerLoad } from './$types';

	export let data: PageServerLoad;
	$: clientsList = data;
	console.log(clientsList);

	const profilDAta = JSON.stringify(data.ldap);

	const items = Object.entries(data.ldap).map(([key, value]) => {
		return Object.assign(value, { id: key });
	});
</script>

<div class="container">
	<ul>
		{#each Object.entries(data.ldap) as [k, v]}
			{k}:
			{#each Object.entries(v) as [key, value]}
				{#if key === 'groups'}
					<li>{key}:</li>
					<ul>
						{#each value as k}
							<li>{k}</li>
						{/each}
					</ul>
				{:else}<li>{key}: {value}</li>{/if}
			{/each}
		{/each}
	</ul>
</div>
