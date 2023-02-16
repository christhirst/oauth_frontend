<script lang="ts">
	import type { PageServerLoad } from './$types';
	export async function load({ session }) {
		//console.log(session.user);
		return { props: { user: 'session.user' } };
	}

	export let data: PageServerLoad;
	console.log('datas');
	console.log(data);
</script>

<h1>test</h1>
<div class="container">
	<ul>
		{#each data.locals.groups as group}
			<li><a href={group}>{group}</a></li>
		{/each}
	</ul>
</div>
<!-- <style>
	li {
		margin-bottom: 0.5em;
	}
</style> -->
