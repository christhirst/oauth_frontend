import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const response = await fetch('http://localhost:8180/ldap');

	if (response.ok) {
		const resJSON = await response.json();
		console.log(resJSON);
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
