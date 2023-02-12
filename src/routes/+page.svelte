<script context="module">
	export async function load({ session }) {
		//console.log(session.user);
		return { props: { user: 'session.user' } };
	}
</script>

<script lang="ts">
	export let data;
	const { posts } = data;
</script>

<div class="container">
	<!-- <ul>
		{#each posts as post}
			<li><a href={post.id}>{post.title}</a></li>
		{/each}
	</ul> -->
</div>

<style>
	li {
		margin-bottom: 0.5em;
	}
</style>
