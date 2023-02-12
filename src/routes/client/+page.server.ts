import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);
		const clientName = formData.get('clientname');
		console.log(clientName);
		return { message: '' };
	}
};
