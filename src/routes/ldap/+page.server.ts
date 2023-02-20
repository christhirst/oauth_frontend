import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, depends, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	const response = await fetch('/api/ldap');
	//depends('app:clients');
	if (response.ok) {
		return {
			ldap: response.json()
		};
	}
	const errorJSON = await response.json();
	throw error(response.status, errorJSON.message);
};
