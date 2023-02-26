import { invalidate } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, depends, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	interface Firstr {
		Hostname: string;
		Port: number;
		Bindusername: string;
		Bindpassword: string;
		Starttls: boolean;
		Filter: string;
		Basedn: string;
		Uid: string;
		SyncMode: string;
		Mapping: boolean;
		Frequence: number;
		SCIM: boolean;
		SPN: string;
		IPRange: string;
	}
	type typeMap = {
		[key: string]: Firstr;
	};

	const response = await fetch('/api/ldap');
	const data: typeMap = await response.json();
	console.log(data);
	//depends('app:clients');
	if (response.ok) {
		return {
			ldap: data
		};
	}
	const errorJSON = await response.json();
	//throw error(response.status, errorJSON.message);
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const client_name = formData.get('client_name');
		const client_secret = formData.get('client_secret');
		const application_type = formData.get('application_type');

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
		console.log('+++++');
		console.log(id);

		await fetch(`http://localhost:8280/oauth/ldap/${id}`, {
			method: 'DELETE',
			body: JSON.stringify({
				foo: ''
			})
		});
	}
};
