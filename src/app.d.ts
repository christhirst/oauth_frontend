// See https://kit.svelte.dev/docs/types#app

import type { string } from 'yup';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
		}
		interface Locals {
			user?: {
				//id: number;
				name: string;
			};
			groups?: Array<string>;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
