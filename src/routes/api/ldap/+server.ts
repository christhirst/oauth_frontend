import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const response = await fetch('http://localhost:8180/api/ldap');

	if (response.ok) {
		const resJSON = await response.json();
		console.log(resJSON);
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
export const POST: RequestHandler = async ({ fetch, request, locals, params }) => {
	console.log('testing');
	console.log(params);
	const form = await request.formData();

	const response = await fetch(`http://localhost:8180/api/ldap/${params}`, {
		method: 'POST',
		headers: { 'Content-Type': 'applicaton/json' },
		body: JSON.stringify({})
	});
	return response;
};

export const DELETE: RequestHandler = async ({ fetch, locals, params }) => {
	const response = await fetch(`http://localhost:8180/api/ldap/${params}`);

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
