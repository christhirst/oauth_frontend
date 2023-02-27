import { object, string, number, date, InferType } from 'yup';
import { invalidateAll } from '$app/navigation';
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
	create: async ({ request, fetch }) => {
		const formData = await request.formData();

		type ldap = {
			Hostname: string;
			Port: number;
			Bindusername: string;
			Bindpassword: string;
			Starttls: string;
			Filter: string;
			Basedn: string;
			Uid: string;
			SyncMode: string;
			Mapping: string;
			Frequence: string;
			SCIM: string;
			SPN: string;
			IPRange: string;
		};

		const ii: ldap = {
			Hostname: 'Hostname',
			Port: 'Port',
			Bindusername: 'Bindusername',
			Bindpassword: 'Bindpassword',
			Starttls: 'Starttls',
			Filter: 'Filter',
			Basedn: 'Basedn',
			Uid: 'Uid',
			SyncMode: 'SyncMode',
			Mapping: 'Mapping',
			Frequence: 'Frequence',
			SCIM: 'SCIM',
			SPN: 'SPN',
			IPRange: 'IPRange'
		};

		const Hostname = formData.get(ii.Hostname);
		const Port: number = formData.get(ii.Port);
		const Bindusername = formData.get(ii.Bindusername);
		const Bindpassword = formData.get(ii.Bindpassword);
		const Starttls = formData.get(ii.Starttls);
		const Filter = formData.get(ii.Filter);
		const Basedn = formData.get(ii.Basedn);
		const Uid = formData.get(ii.Uid);
		const SyncMode = formData.get(ii.SyncMode);
		const Mapping = formData.get(ii.Mapping);
		const Frequence = formData.get(ii.Frequence);
		const SCIM = formData.get(ii.SCIM);
		const SPN = formData.get(ii.SPN);
		const IPRange = formData.get(ii.IPRange);

		const ldapSchema = object({
			Hostname: string().required(),
			Port: number().required(),
			Bindusername: string().required()
		});

		try {
			const result = await ldapSchema.validate(
				{ Hostname, Port, Bindusername },
				{ abortEarly: false }
			);
			console.log({ result });

			const clientLink = `http://localhost:8180/api/ldap/atesssswwwwwstsss`;

			const headers = new Headers({
				'content-type': 'application/json'
			});

			const data = {
				Hostname: Hostname,
				Port: Number(Port), // your integer value
				Bindusername: Bindusername
			};

			const res = await fetch(clientLink, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
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
	delete: async ({ request, fetch }) => {
		const formData = await request.formData();
		const ldapname = formData.get('id');
		console.log('+++++');
		console.log(ldapname);

		await fetch(`http://localhost:8180/api/ldap/${ldapname}`, {
			method: 'DELETE',
			body: JSON.stringify({
				foo: ''
			})
		});
	}
};
