import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	// get the user from the token
	const user = locals.user;
	console.log('locals');
	console.log(locals);
	return {
		user
	};
};
