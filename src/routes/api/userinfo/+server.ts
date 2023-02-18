import { request } from '@playwright/test';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	const response = await fetch('http://localhost:8280/oauth/userinfo');
	const accessToken =
		'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwOTAyMjEyLTZjNmMtNDUyYi1iNGIzLTJkMDA0MTFhNjczMyIsInR5cCI6IkpXVCJ9.eyJmb28iOiJjbiIsIm5vbmNlIjoiY29kZSIsImdyb3VwcyI6WyIiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODI4MCIsInN1YiI6ImR3aWdodCIsImF1ZCI6WyJjbGllbnRuYW1lMyJdLCJleHAiOjE2NzY2NjU1MDMsIm5iZiI6MTY3NjU3OTEwMSwiaWF0IjoxNjc2NTc5MTAzLCJqdGkiOiIxIn0.RnTzphSAbXyO-IRFPf_MrdYsTxvLTmRR6GTVxnARQ-HCDYUAsJpVjMoBk0JvvbZs_tsseruF1vJY6qYycX2iNkY-9ehCzuNcB_uAE1nVdZWT7AeCkJAtCve3qq2xW7QbDeAK-UHue12tsXPeXS-Safi_iLKWHkl1MokqjAnmpL0oVC5jfKoG-UKzMOpxHnMrN4KjljW8JjFrJlH7hDJw8_mG2p1g_fNUJZ3EMRCBacCUUmG-Vi-Br7fu491FgNlHwybZTFPD7cr2I10m73JkQ2ZB1cAoIg2GEbQ2fp-UzljB1RncMCvGo1ieckbkxgtxEb3JMUsKd0-_rkSh74Ciow';
	response.headers.set('Authorization', 'Bearer ' + accessToken);
	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}
	throw error(response.status, response.statusText);
};
