export const load: PageServerLoad = ({ locals }) => {
	// get the user from the token

	const id = locals.code;
	//console.log(locals);
	const openidFields = JSON.parse(Buffer.from(id.split('.')[1], 'base64').toString());
	return {
		openidFields
	};
};
