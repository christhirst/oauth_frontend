import { Issuer, generators } from 'openid-client';
import type { OpenIDCallbackChecks } from 'openid-client';

import { redirect, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit';
import { OIDC_URL, CLIENT_NAME, CLIENT_SECRET } from '$env/static/private';
import { resolveBaseUrl } from 'vite';
import { string } from 'yup';

export const handle: Handle = async ({ event, resolve }) => {
	const urls = OIDC_URL + '/oauth/.well-known/openid-configuration';
	console.log(urls);
	const redirect_uri = event.url.origin;
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
		const googleIssuer = await Issuer.discover(urls);
		console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);
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
			//resource: 'https://my.api.example.com/resource/32178',
			code_challenge,
			code_challenge_method: 'S256'
		});

		const { locals, cookies, isDataRequest, url } = event;
		if (!qqq) {
			if (urlRedirect.startsWith('https://localhost')) {
				const re = /https/gi;
				const newurl = urlRedirect.replace(re, 'http');
				event.cookies.set('some', 'value', { secure: false, httpOnly: false });
				throw redirect(302, newurl + '&state=test2' + '&nonce=code2');
			} else {
				event.cookies.set('some', 'value', { secure: false, httpOnly: false });
				throw redirect(302, urlRedirect + '&state=test2' + '&nonce=code3');
			}
		}
		if (qqq && !sub) {
			const params = client.callbackParams(event.request.url);	
			const id: string = params.code ?? '';		
			
			//const openidFields = JSON.parse(Buffer.from(id, 'base64').toString());
			console.log(params);
			let userinfo;
			const checks: OpenIDCallbackChecks = { state: 'test2', nonce: 'code3' };

			try {
				const tokenSet = await client.callback(redirect_uri, params, checks, { code_verifier });
				console.log('----------------');
				console.log(tokenSet);
				//const openidFields = JSON.parse(Buffer.from(tokenSet.id_token, 'base64').toString());
				console.log(tokenSet.claims().sub);
				console.log(tokenSet.claims().groups);
				console.log(JSON.stringify(tokenSet.claims())); 
				const openidFields = JSON.stringify(tokenSet.claims())
				locals.user = tokenSet.claims().sub;
				locals.openidFields = tokenSet.id_token;
				event.cookies.set('code', tokenSet.id_token, { secure: false, httpOnly: false });	
			console.log(sub);
				//const userinfo = await console.log(client.userinfo(tokenSet.access_token));
			} catch (e) {
				console.log(e);
			}
			//console.log(userinfo);
			/*
		console.log('####!!###');
		console.log(tokenSet.access_token);
		console.log('received and validated tokens %j', tokenSet);
		console.log('validated ID Token claims %j', tokenSet.claims()); */
			event.cookies.set('sub', locals.user, { secure: false, httpOnly: false });
			event.cookies.delete('some');
		}
	}
	//const userinfo = await client.userinfo(tokenSet);
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