export const load = async ({ fetch }) => {
	const res = await fetch('http://');
	const allPosts = await res.json();
	const posts = allPosts(0, 10);
	return { posts };
};
