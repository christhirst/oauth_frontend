export const auth = async function getSession(event, resolve) {
	//console.log('getSessions');
	const user = 'test'; //event.cookies.get('sub');
	console.log('openid');
	const response = await resolve(event);

	return response;
};
