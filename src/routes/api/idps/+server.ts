import { request } from '@playwright/test';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const response = await fetch('http://localhost:8280/oauth/idps');

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

	const response = await fetch(`http://localhost:8280/oauth/idps/${params}`, {
		method: 'POST',
		headers: {},
		body: JSON.stringify({})
	});
	return response;
};

export const DELETE: RequestHandler = async ({ fetch, locals, params }) => {
	const response = await fetch(`http://localhost:8280/oauth/idps/${params}`);

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
