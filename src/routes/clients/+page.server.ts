import { object, string, number, date, InferType } from 'yup';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import { invalidateAll } from '$app/navigation';

//console.log('$env/dynamic/private', API_KEY);
//let ee = API_KEY;
export const load: PageServerLoad = async ({ fetch, depends, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	const response = await fetch('/api/clients');
	//depends('app:clients');
	if (response.ok) {
		return {
			clients: response.json()
		};
	}
	const errorJSON = await response.json();
	throw error(response.status, errorJSON.message);
};

export const actions = {
	create: async ({ request }) => {
		type client = {
			Clientname: string;
			ClientSecret: string;
			ApplicationType: string;
		};

		const ii: client = {
			Clientname: 'Clientname',
			ClientSecret: 'ClientSecret',
			ApplicationType: 'ApplicationType'
		};

		const formData = await request.formData();
		const client_name = formData.get(ii.Clientname);
		const client_secret = formData.get(ii.ClientSecret);
		const application_type = formData.get(ii.ApplicationType);
		console.log(client_name);
		const clientSchema = object({
			client_name: string().required(),
			client_secret: string().required(),
			application_type: string().required()
		});

		try {
			const result = await clientSchema.validate(
				{ client_name, client_secret, application_type },
				{ abortEarly: false }
			);
			console.log({ result });

			const clientLink = `http://localhost:8280/oauth/clients`;

			const res = await fetch(clientLink, {
				method: 'POST',
				body: JSON.stringify({
					client_name: client_name,
					client_secret: client_secret,
					application_type: application_type
				})
			});

			if (res.status != 200) {
				return;
			}
			invalidateAll;
			return {
				success: true,
				message: 'Success'
			};
		} catch (error) {
			console.log({ error });
			const errors = error.inner.reduce((acc, err) => {
				return { ...acc, [err.path]: err.message };
			}, {});

			return {
				errors,
				name,
				email,
				message
			};
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		console.log(id);

		await fetch(`http://localhost:8280/oauth/clients/${id}`, {
			method: 'DELETE',
			body: JSON.stringify({
				foo: ''
			})
		});
	}
};
