export const load: PageServerLoad = async ({ locals, fetch }) => {
	// get the user from the token

	/* if (!locals.user) {
		throw redirect(302, '/');
	} */

	//const response = await fetch('/api/userinfo');
	//depends('app:clients');
	/* if (response.ok) {
		return {
			clients: response.json()
		};
	} */
	/* const errorJSON = await response.json();
	throw error(response.status, errorJSON.message); */

	const id = locals.openidFields;
	console.log("sssss");
	console.log(locals);
	console.log(Buffer.from(locals["code"].split('.')[1], 'base64').toString());
	console.log("sssss");
	console.log(id);
	const openidFields = JSON.parse(Buffer.from(locals["code"].split('.')[1], 'base64').toString());
	return {
		openidFields
	};
};
