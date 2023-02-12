export const load = async ({ fetch, params: { id } }) => {
	const res = await fetch(`http://${id}`);
	const allPosts = await res.json();
	const posts = allPosts(0, 10);
	return { posts };
};
