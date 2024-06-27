
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
	state: () => ({
		users: [] as unknown[],
	}),
	actions: {
		async getUsers() {
			const { data }: any = await useFetch('https://jsonplaceholder.typicode.com/users', {
				method: 'get',
			});

			if (data.value) {
				const users = data.value;
				const userArray = [];
				for(const user of users) {
					userArray.push({
						name: user.name,
						email: user.email,
						lastLogin: this.getRandomDate('2024-05-01', '2024-06-30')
					});
				}
				this.users = userArray;
			}
		},
		getRandomDate(from: string, to: string) {
			return new Date(new Date(from).getTime() + Math.random() * (new Date(to).getTime() - new Date(from).getTime())).toDateString()
		}
	},
});
