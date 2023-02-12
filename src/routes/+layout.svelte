<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	export let data: LayoutData;
	console.log('data');
	console.log(data.user);
	//console.log($page);
</script>

<Navbar user={data.user} />
<svelte:head>
	<title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

<!-- {#if data.user}
	<button
		on:click={async () => {
			const response = await fetch('/api/logout', { method: 'POST' });
			if (response.ok) {
				invalidateAll();
			}
		}}
	>
		Logout
	</button>
{/if} -->

<slot />
<Footer />
