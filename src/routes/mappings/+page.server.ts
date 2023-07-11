import { object, string, number, date, InferType } from 'yup';
import { invalidateAll } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { OIDC_URL } from '$env/static/private';
const url = OIDC_URL ;

export const load: PageServerLoad = async ({ fetch, depends, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	type typeMap = {
		[key: string]: string;
	};

	const response = await fetch('/api/mappings');
	const data: typeMap = await response.json();
	console.log(data);
	if (response.ok) {
		return {
			mapping: data
		};
	}
	console.log(response.body);
	const errorJSON = await response.json();
	//throw error(response.status, errorJSON.message);
};

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();
	}
};
