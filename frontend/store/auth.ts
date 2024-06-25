
import { defineStore } from 'pinia';

interface UserPayloadInterface {
	username: string;
	password: string;
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authenticated: false,
	}),
	actions: {
		async authenticateUser({ username, password }: UserPayloadInterface) {
			const token = useCookie('token');
			console.log(username, password);
			
			// Dummy data for dev purposes
			if (username === 'thisEmail@exi.st' && password === 'Abcd1234') {
				token.value = 'q4zWs5tvJGd5fMyojoCodd7qPBB7XhSa';
				console.log(token);
				this.authenticated = true;
			}
		},
		logUserOut() {
			const token = useCookie('token');
			this.authenticated = false;
			token.value = null;
		},
	},
});
