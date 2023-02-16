import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	// get the user from the token
	const user = locals.user;
	console.log('locals');
	console.log(locals);
	//console.log(locals);
	return {
		locals
	};
};
