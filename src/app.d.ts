// See https://kit.svelte.dev/docs/types#app
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
			gg?: {
				id: number;
				name: string;
			};
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
