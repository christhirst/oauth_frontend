<script>
	import { page } from '$app/stores';
	export let title;
	export let description;
	export let type;

	$: url = $page.url.href;
</script>

<svelte:head
	><title>{title}</title><meta
		name={description}
		content="IAM"
	/>{@html `<script type="application/ld+json">
"@context":"http://", "@type": "${type}","url":"${$page.url.href}",
	</script>`}</svelte:head
>
