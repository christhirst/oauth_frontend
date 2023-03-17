import { request } from '@playwright/test';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OIDC_URL } from '$env/static/private';
const url = OIDC_URL + '/oauth/clients';
export const GET: RequestHandler = async ({ fetch, locals }) => {
	const response = await fetch(url + '/oauth/idps');

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};

export const POST: RequestHandler = async ({ fetch, request, locals, params }) => {
	const form = await request.formData();

	const response = await fetch(url + `/${params}`, {
		method: 'POST',
		headers: {},
		body: JSON.stringify({})
	});
	return response;
};

export const DELETE: RequestHandler = async ({ fetch, locals, params }) => {
	const response = await fetch(url + `/${params}`);

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
