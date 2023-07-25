import { invalidate } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch,  locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	const response = await fetch('/api/sync');

	//depends('app:clients');
	if (response.ok) {
		return {
			sync: response.json()
		};
	}
	const errorJSON = await response.json();
	throw error(response.status, errorJSON.message);
};
