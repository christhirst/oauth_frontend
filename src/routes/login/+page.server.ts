export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		console.log(...formData);

		const email = formData.get('email');
		const password = formData.get('password');

		cookies.set('access', 'true');
		console.log(cookies);
	}
};
