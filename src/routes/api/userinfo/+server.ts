import { request } from '@playwright/test';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const accessToken: string = locals.code;
	const response = await fetch('http://localhost:8280/oauth/userinfo', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + accessToken }
	});

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
