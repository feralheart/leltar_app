<template>
	<v-carousel height="758" show-arrows="hover" cycle hide-delimiter-background>
	  <v-carousel-item v-for="(product, i) in inventory" :key="i">
		<v-card
			class="mx-auto"
			max-width="500"
		>
			<v-img
			with="100%"
			:src=product.thumbnail
			cover
			></v-img>

			<v-card-title>
				{{ product.name }}
			</v-card-title>

			<v-card-subtitle>
				{{ product.price }} Euro
			</v-card-subtitle>

		</v-card>
	  </v-carousel-item>
	</v-carousel>
  </template>
<script>
import { useInventoryStore } from '~/store/inventory';

export default {
	data() {
		return {
			inventory: []
		}
	},
	methods: {
		async getItems() {
			const { getInventory } = useInventoryStore();
			const { inventory } = storeToRefs(useInventoryStore());

			await getInventory();
			this.inventory = inventory;
			console.log(inventory)
		},
	},
	created() {
		this.getItems()
	}

}
</script>
