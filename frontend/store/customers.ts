
import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customers', {
	state: () => ({
		customers: [] as unknown[],
	}),
	actions: {
		async getCustomers() {
			const { data }: any = await useFetch('https://dummyjson.com/users', {
				method: 'get',
			});

			if (data.value) {
				const customers = data?.value?.users;
				const customerArray = [];
				for(const customer of customers) {
					customerArray.push({
						name: `${customer.firstName} ${customer.lastName}`,
						email: customer.email,
						loyaltyId: `IALC24${customer.id}`,
						lastPurchase: this.getRandomDate('2024-01-01', '2024-06-30')
					});
				}
				this.customers = customerArray;
			}
		},
		getRandomDate(from: string, to: string) {
			return new Date(new Date(from).getTime() + Math.random() * (new Date(to).getTime() - new Date(from).getTime())).toDateString()
		}
	},
});
