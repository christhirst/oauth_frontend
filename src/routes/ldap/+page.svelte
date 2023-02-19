<script lang="ts">
	let clientname: string;
	$: console.log(clientname);
</script>

<form method="POST">
	<label for=""
		>Clientname
		<input type="text" name="clientname" bind:value={clientname} /></label
	>
	<label for=""
		>Clientname
		<input type="text" name="name" /></label
	>
	<input type="submit" />
</form>
