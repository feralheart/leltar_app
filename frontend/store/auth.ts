
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
			if (username === 'dummyEmail' && password === 'dummyPassword') {
				console.log('if');
				const token = useCookie('token');
				token.value = 'dummyToken';
				this.authenticated = true;
			} else {
				console.log('else');
				this.authenticated = false;
			}
		},
		logUserOut() {
			const token = useCookie('token');
			this.authenticated = false;
			token.value = null;
		},
	},
});
