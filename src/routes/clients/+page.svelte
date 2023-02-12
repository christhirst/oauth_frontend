<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import Button from '../../components/Button.svelte';
	import Form from '../../components/Form.svelte';
	import Meta from '../../components/Meta.svelte';
	import Card from '../../components/Card.svelte';

	export let data: PageData;

	$: clientsList = data.clients;
	const filterClients = () => {
		clientsList = clientsList.filter((client) => {
			client.id != 'my';
			client.cl;
		});
	};
	//export let form;

	let clientname = '';
</script>

<Meta title="IAM" description="iam server" type="test" />

<ul>
	<div class="clients">
		<Form />
	</div>

	<div class="container">
		{#if clientsList && clientsList.length > 0}
			<h2>Client list</h2>
			<ul>
				<div class="grid">
					{#each clientsList as product}
						<Card>
							<li>
								{product.client_name} : {product.id}
							</li>
							<input type="hidden" name="id" value="ww" />
							<form method="POST" action="?/delete">
								<input type="hidden" name="id" hidden value={product.client_name} />
								<Button
									id={product.client_name}
									aria-label="Remove tweet"
									class="btn remove"
									title="Remove"
									type="submit"
								>
									<div class="circle" />
									delete - {product.client_name}
								</Button>
							</form>
						</Card>
					{/each}
				</div>
			</ul>
		{/if}
	</div>
</ul>

<!-- <Button
	on:click={() => {
		invalidate('app:clients');
	}}>Rerun</Button
>
 -->
<style>
	.grid {
		display: list-item;
		grid-template-columns: repeat(3, 1fr);
		gap: 2;
		flex: 1;
	}

	.clients {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2;
		flex: 1;
	}

	ul {
		list-style: none;
		padding: 20;
		margin: 2.5rem;
		display: flex;
	}

	@media (max-width: 600px) {
		ul {
			flex-direction: column;
		}
	}

	li {
		padding: 0.5rem;
		flex: 1 1 50%;
		min-width: 200px;
	}
</style>
