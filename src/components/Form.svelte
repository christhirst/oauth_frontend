<script>
	import { enhance, applyAction } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let form;
	export let name;
	export let typ;
</script>

<div class="container">
	<h2>Add</h2>
	<form
		action="?/create"
		method="POST"
		use:enhance={({ form }) => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					form.reset();
				}
				if (result.type === 'invalid') {
					await applyAction(result);
				}
				update;
			};
		}}
	>
		{#each Object.entries(typ) as [key, value]}
			<div class="form-group">
				<label class="col-md-3 control-label" for="client_name">{value}</label>
				<div class="col-md-9">
					<input
						id={key}
						name={key}
						type="text"
						placeholder={key}
						class="form-control"
						value={form?.name || ''}
						class:error={form?.errors?.name}
					/>
					{#if form?.errors?.name}
						<p class="red">{form?.errors?.name}</p>
					{/if}
					<!-- <div class="error">error</div> -->
				</div>
			</div>
		{/each}
		<div class="form-group">
			<div class="col-md-12">
				<Button type="submit">Submit</Button>

				{#if form?.error}
					<Alert message={form?.message} />
				{/if}
			</div>
		</div>
	</form>
</div>

<style>
	.container {
		width: 100%;
		padding: 2em 0;
	}
	h2 {
		font-weight: 500;
		font-size: 2em;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.75em 1em;
		border-radius: 0.25em;
		border: 1px solid #999;
	}
	.form-group {
		margin-bottom: 1.5em;
	}
	label {
		display: block;
		padding-bottom: 0.5em;
	}
	.success {
		color: lightgreen;
	}
	.error {
		font-weight: bold;
		font-size: 12px;
		color: red;
	}
	.red {
		color: red;
	}
</style>
