import { Issuer, generators } from 'openid-client';
import { redirect, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit';
import { OIDC_URL, CLIENT_NAME, CLIENT_SECRET } from '$env/static/private';
import { resolveBaseUrl } from 'vite';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('OIDC_URL:');
	console.log(OIDC_URL);
	const urls = OIDC_URL;
	const redirect_uri = event.url.origin;
	console.log('redirect_uri:');
	console.log(redirect_uri);

	const client_id = CLIENT_NAME;
	const client_secret = CLIENT_SECRET;

	const { locals, cookies, isDataRequest, url } = event;

	const sub: string | undefined = event.cookies.get('sub');

	const code = event.cookies.get('code');

	if (sub) {
		locals.user = { name: sub };
	} else {
		locals.user = undefined;
	}

	locals.code = code;
	if (!sub) {
		console.log('sub:');
		console.log(sub);
		console.log('code:');
		console.log(code);

		const googleIssuer = await Issuer.discover(OIDC_URL);
		//console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);

		const client = new googleIssuer.Client({
			client_id: client_id,
			client_secret: client_secret,
			redirect_uris: [redirect_uri],
			response_types: ['code']
			// id_token_signed_response_alg (default "RS256")
			// token_endpoint_auth_method (default "client_secret_basic")
		}); // => Client
		const qqq = event.cookies.get('some');
		const code_verifier = generators.codeVerifier();
		// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
		// it should be httpOnly (not readable by javascript) and encrypted.

		const qsqq = event.cookies.get('code_challenge');

		const code_challenge = generators.codeChallenge(code_verifier);
		event.cookies.set('code_challenge', code_challenge, { secure: false, httpOnly: false });
		const urlRedirect = client.authorizationUrl({
			scope: 'openid email profile',
			resource: 'https://my.api.example.com/resource/32178',
			code_challenge,
			code_challenge_method: 'S256'
		});

		const { locals, cookies, isDataRequest, url } = event;

		//&& event.route.id?.startsWith('/(app)')
		if (!qqq) {
			if (urlRedirect.startsWith('https://localhost')) {
				const re = /https/gi;
				const newurl = urlRedirect.replace(re, 'http');
				console.log('Redirect: ' + newurl);
				event.cookies.set('some', 'value', { secure: false, httpOnly: false });
				throw redirect(302, newurl + '&state=test');
			} else {
				console.log('Redirect: ' + urlRedirect);
				event.cookies.set('some', 'value', { secure: false, httpOnly: false });
				throw redirect(302, urlRedirect + '&state=test');
			}
		}
		if (qqq && !sub) {
			console.log('+++++');
			const params = client.callbackParams(event.request.url);
			console.log(event.request.url);
			const id: string | undefined = params.code ?? '';
			event.cookies.set('code', id, { secure: false, httpOnly: false });
			console.log(id);
			console.log('!!!!!!');
			console.log(params);
			const openidFields = JSON.parse(Buffer.from(id.split('.')[1], 'base64').toString());
			const sub = openidFields.sub;
			locals.user = sub;
			console.log(sub);

			const gro = ['testgroup1, testgroup2'];
			locals.groups = openidFields.groups;
			locals.groups = gro;
			console.log(locals.groups);
			try {
				const tokenSet = await client.callback(redirect_uri, params, {
					state: 'test'
				});
			} catch (e) {
				console.log(e);
			}
			/*
		console.log('####!!###');
		console.log(tokenSet.access_token);
		console.log('received and validated tokens %j', tokenSet);
		console.log('validated ID Token claims %j', tokenSet.claims()); */
			event.cookies.set('sub', sub, { secure: false, httpOnly: false });
			event.cookies.delete('some');
		}
	}
	//const userinfo = await client.userinfo(access_token);
	//console.log('userinfo %j', userinfo);

	const access = event.cookies.get('access') == 'true';

	const response = await resolve(event);

	return response;
};

/* export const handleError: HandleServerError = ({ error, event }) => {
	//console.log(error, event);

	return {
		message: 'Unexpected error.',
		code: 'UNEXPECTED'
	};
};
 */
