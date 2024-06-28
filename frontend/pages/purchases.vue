<template>
	<v-container>
		<TitleComponent title="Purchases" />
		<v-data-table
			:expanded="expanded"
			:headers="headers"
			:items="purchases"
			show-expand
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
				</v-toolbar>
			</template>
			<template v-slot:expanded-row="{ columns, item }">
				<tr>
					<td :colspan="columns.length">
						<v-data-table
							:headers="expandedHeaders"
							:items="item.products"
						>
						</v-data-table>
					</td>
				</tr>
			</template>
			<template v-slot:no-data>
				<v-btn color="primary" @click="getItems"> 
					Reset 
				</v-btn>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import { usePurchaseStore } from '~/store/purchases';

	export default {
		data: () => ({
			expanded: [],
			expandedHeaders: [
				{ title: 'Name', key: 'title' },
				{ title: 'Price', key: 'price' },
				{ title: 'Quentity', key: 'quantity' },
				{ title: 'Total', key: 'total' },
			],
			headers: [
				{ title: 'Purchase time', key: 'purchase' },
				{ title: 'Customer Card Id', key: 'loyaltyId' },
				{ title: 'Total', key: 'total' },
				{ title: 'Products', key: 'totalProducts' },
				{ title: 'Product Sum', key: 'totalQuantity' },
			],
			purchases: [],
		}),
		async created() {
			await this.getItems()
		},
		methods: {
			async getItems() {
				const { getPurchases } = usePurchaseStore();
				const { purchases } = storeToRefs(usePurchaseStore());

				await getPurchases();
				this.purchases = purchases;
			},
		},
	}
</script>