
import { defineStore } from 'pinia';

export const usePurchaseStore = defineStore('purchases', {
	state: () => ({
		purchases: [] as unknown[],
	}),
	actions: {
		async getPurchases() {
			const { data }: any = await useFetch('https://dummyjson.com/carts', {
				method: 'get',
			});

			if (data.value) {
				const purchases = data?.value?.carts;
				console.log(purchases)
				const purchaseArray = [];
				for(const purchase of purchases) {
					purchaseArray.push({
						id: purchase.id,
						products: purchase.products,
						total: purchase.total,
						totalDiscounted: purchase.discountedTotal,
						loyaltyId: `IALC24${purchase.userId}`,
						totalProducts: purchase.totalProducts,
						totalQuantity: purchase.totalQuantity,
						purchase: this.getRandomDate('2024-06-25 07:00', '2024-06-30 17:00')
					});
				}
				this.purchases = purchaseArray;
			}
		},
		getRandomDate(from: string, to: string) {
			return new Date(new Date(from).getTime() + Math.random() * (new Date(to).getTime() - new Date(from).getTime())).toDateString()
		}
	},
});
