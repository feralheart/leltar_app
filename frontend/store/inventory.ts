
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
	state: () => ({
		inventory: [] as unknown[],
	}),
	actions: {
		async getInventory() {
			const { data }: any = await useFetch('https://dummyjson.com/products', {
				method: 'get',
			});

			if (data.value) {
				this.inventory = data?.value?.product;
				const products = data?.value?.products;
				const inventory = [];
				for(const product of products) {
					inventory.push({
						sku: product.sku,
						name: product.title,
						count: product.stock,
						price: product.price,
						thumbnail: product.thumbnail,
						lastIncoming: this.getRandomDate('2024-01-31', '2024-06-30'),
						lastPurchase: this.getRandomDate('2023-01-31', '2024-06-30')
					});
				}
				this.inventory = inventory;
			}
		},
		getRandomDate(from: string, to: string) {
			return new Date(new Date(from).getTime() + Math.random() * (new Date(to).getTime() - new Date(from).getTime())).toDateString()
		}
	},
});
