<script lang="ts">
	import type { PageServerLoad } from './$types';
	import Card from '../../components/Card.svelte';
	import Button from '../../components/Button.svelte';
	import Form from '../../components/Form.svelte';

	interface ldaps {
		Hostname: string;
		Port: number;
		Bindusername: string;
		Bindpassword: string;
		Starttls: boolean;
		Filter: string;
		Basedn: string;
		Uid: string;
		SyncMode: string;
		Mapping: boolean;
		Frequence: number;
		SCIM: boolean;
		SPN: string;
		IPRange: string;
	}

	type ldap = {
		Hostname: string;
		Port: string;
		Bindusername: string;
		Bindpassword: string;
		Starttls: string;
		Filter: string;
		Basedn: string;
		Uid: string;
		SyncMode: string;
		Mapping: string;
		Frequence: string;
		SCIM: string;
		SPN: string;
		IPRange: string;
	};

	const ldapEntry: ldap = {
		Hostname: 'Hostname',
		Port: 'Port',
		Bindusername: 'Bindusername',
		Bindpassword: 'Bindpassword',
		Starttls: 'Starttls',
		Filter: 'Filter',
		Basedn: 'Basedn',
		Uid: 'Uid',
		SyncMode: 'SyncMode',
		Mapping: 'Mapping',
		Frequence: 'Frequence',
		SCIM: 'SCIM',
		SPN: 'SPN',
		IPRange: 'IPRange'
	};

	type typeMap = {
		[key: string]: ldap;
	};
	export let data: PageServerLoad;
	const ee: typeMap = data.ldap;
	$: ldapList = data.ldap;
</script>

<ul>
	<div class="clients">
		<Form name="Client" typ={ldapEntry} />
	</div>

	<div class="container">
		<ul>
			{#each Object.entries(ee) as [k, v]}
				<Card>
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

					<input type="hidden" name="id" value="ww" />
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" hidden value={k} />
						<Button
							id={k}
							aria-label="Remove tweet"
							class="btn remove"
							title="Remove"
							type="submit"
						>
							<div class="circle" />
							delete - {k}
						</Button>
					</form>
				</Card>
			{/each}
		</ul>
	</div>
	<ul>
		<div class="container">
			{#if ldapList && ldapList.length > 0}
				<h2>Client list</h2>
				<ul>
					<div class="grid">
						{#each Object.entries(data.ldap) as [k, v]}
							<Card>
								<li>
									{k} :
								</li>
								<input type="hidden" name="id" value="ww" />
							</Card>
						{/each}
					</div>
				</ul>
			{/if}
		</div>
	</ul>
</ul>

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
