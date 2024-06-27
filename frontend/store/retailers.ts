
import { defineStore } from 'pinia';

export const useRetailerStore = defineStore('retailers', {
	state: () => ({
		retailers: [] as unknown[],
	}),
	actions: {
		async getRetailers() {
			const { data }: any = await useFetch('https://dummyjson.com/users', {
				method: 'get',
			});

			if (data.value) {
				const users = data?.value?.users;
				const retailerArray = [];
				for(const user of users) {
					const companyAddress = user.company.address;
					retailerArray.push({
						name: user.company.name,
						country: companyAddress.country,
						postalCode: companyAddress.postalCode,
						city: companyAddress.city,
						address: companyAddress.address,
						taxNum: `012124-${user.id}`,
						lastOrder: this.getRandomDate('2024-01-01', '2024-06-30')
					});
				}
				this.retailers = retailerArray;
			}
		},
		getRandomDate(from: string, to: string) {
			return new Date(new Date(from).getTime() + Math.random() * (new Date(to).getTime() - new Date(from).getTime())).toDateString()
		}
	},
});
