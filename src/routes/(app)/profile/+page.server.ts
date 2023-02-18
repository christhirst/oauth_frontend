export const load: PageServerLoad = async ({ locals, fetch }) => {
	// get the user from the token

	/* if (!locals.user) {
		throw redirect(302, '/');
	} */

	const response = await fetch('/api/userinfo');
	//depends('app:clients');
	/* if (response.ok) {
		return {
			clients: response.json()
		};
	} */
	/* const errorJSON = await response.json();
	throw error(response.status, errorJSON.message); */

	const id = locals.code;
	//console.log(locals);
	const openidFields = JSON.parse(Buffer.from(id.split('.')[1], 'base64').toString());
	return {
		openidFields
	};
};
