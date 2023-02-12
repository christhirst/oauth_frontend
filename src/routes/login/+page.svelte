<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	let username = '';
	let password = '';

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});
		const resJSON = await response.json();
		if (response.ok) {
			//goto('/', { invalidateAll: true });
			invalidateAll();
		} else {
			alert(resJSON.message);
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<label for="username">Username</label><br />
	<div>
		<input bind:value={username} id="username" name="username" placeholder="Username" />
	</div>
	<label for="password">Password</label><br />
	<div>
		<input bind:value={password} id="password" name="password" placeholder="Password" />
	</div>
	<button type="submit">Login</button>
</form>
