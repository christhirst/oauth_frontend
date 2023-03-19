<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	export let user;
	const navs = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Clients',
			href: '/clients'
		},
		/* {
			title: 'Identityproviders',
			href: '/identityproviders'
		}, */
		{
			title: 'Ldap',
			href: '/ldap'
		},
		{
			title: 'Mappings',
			href: '/mappings'
		},
		/* {
			title: 'Sync',
			href: '/sync'
		}, */
		/* 	{
			title: 'User',
			href: '/user'
		}, */
		/* 	{
			title: 'Groups',
			href: '/groups'
		}, */
		{
			title: 'Profile',
			href: '/profile'
		}
	];

	let currentTheme = '';
	onMount(() => {
		// currentTheme = document.documentElement.dataset.theme;
		const userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const hasUserSetDarkModeManually = document.documentElement.dataset.theme == 'dark';
		if (!hasUserSetDarkModeManually) {
			setTheme(userPrefersDarkMode ? 'dark' : 'light');
		}
	});
	const setTheme = (theme: string) => {
		document.documentElement.dataset.theme = theme;
		document.cookie = `siteTheme=${theme};max-age=31536000;path="/"`;
		currentTheme = theme;
	};

	$: url = $page.url.href;
	$: routeId = $page.url.pathname;
</script>

<nav>
	<div class="container">
		<a class="logo" href="/">
			<h1>Edison</h1>
		</a>
		<ul>
			{#each navs as { title, href }}
				<li>
					{#if title != 'Profile'}
						<a {href} class:active={href === '/' ? routeId === '/' : url.includes(href)} {title}
							>{title}</a
						>
					{:else if title == 'Profile'}{title}: {#if user}
							<a {href} class:active={href === '/' ? routeId === '/' : url.includes(href)}>{user}</a
							>
						{:else}Unlogged{/if}
					{/if}
				</li>
			{/each}
			<li class="relative">
				{#if currentTheme == 'light'}
					<a class="moon" href={'#'} on:click={() => setTheme('dark')} />
				{:else}
					<a class="sun" href={'#'} on:click={() => setTheme('light')} />
				{/if}
			</li>
		</ul>
	</div>
</nav>

<!-- {#if data.user}
<p>Logged in as {data.user}</p>
{/if} -->
<style>
	nav {
		padding: 0.5em;
		background-color: dodgerblue;
		color: white;
	}

	.container {
		display: flex;
		align-items: center;
	}

	ul {
		display: flex;
		margin: 0;
		margin-left: auto;
		list-style: none;
		font-size: 1em;
	}

	li {
		margin-right: 20px;
	}

	a {
		text-decoration: none;
		color: white;
	}
	.active {
		color: white;
	}
</style>
