<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	export let data: LayoutData;
	console.log('data');
	console.log(data.locals.user?.name);
	//let userRead;
	$: user = data.locals.user?.name || 'Unlogged';
	console.log(user);
</script>

<Navbar {user} />
<svelte:head>
	<title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

{#if user}
	<button
		on:click={async () => {
			let myArray = ['siteTheme', 'sub', 'code', 'code_challenge'];

			myArray.forEach((element) => {
				document.cookie = element + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			});
			invalidateAll();
		}}
	>
		Logout
	</button>
{/if}

<slot />
<Footer />
