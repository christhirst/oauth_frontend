<script lang="ts">
	export let size = 'medium';
</script>

<button on:click class:small={size === 'small'} class:medium={size === 'medium'} {...$$restProps}>
	<slot />
</button>

<style>
	button {
		padding: 0.375;
		border: none;
		border-radius: 0.25em;
		background-color: blue;
		color: white;
		font-size: 1em;
	}
	.small {
		padding: 1em 1.15em;
	}
	.medium {
		padding: 0.25em 0.5em;
	}
</style>
