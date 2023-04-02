<script lang="ts">
	import type { PageServerLoad } from './$types';
	import Card from '../../components/Card.svelte';
	export let data: PageServerLoad;
	let value = ``;
	type typeMap = {
		[key: string]: string;
	};
	let mappings: typeMap;
	mappings = data.mapping;
	console.log('mappings');
	console.log(mappings);

	function identity(str: string) {
		let regex = /if\s/g;
		const aa = str.replace(regex, '<br>if ');
		let regex2 = /]/g;
		const q = aa.replace(regex2, ']<br>');
		return q;
	}
</script>

<textarea bind:value />
<div class="container">
	<ul>
		{#each Object.entries(mappings) as [k, v]}
			<Card>
				{k}:
				<li>{@html identity(v)}</li>
			</Card>
		{/each}
	</ul>
</div>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
