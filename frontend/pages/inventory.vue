<template>
	<v-container>
		<TitleComponent title="Inventory" />
		<v-data-table
			:headers="headers"
			:items="inventory"
		>
		<template v-slot:top>
	<v-toolbar flat>
		<v-divider class="mx-4" inset vertical></v-divider>
		<v-spacer></v-spacer>
		<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title>
			<span class="text-h5">{{ formTitle }}</span>
			</v-card-title>

			<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.sku"
					label="SKU"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.name"
					label="Name"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.count"
					label="Count"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.price"
					label="Price"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.lastIncoming"
					label="Last incoming receipt"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4" sm="6">
					<v-text-field
					v-model="editedItem.lastPurchase"
					label="Last purchase"
					></v-text-field>
				</v-col>
				</v-row>
			</v-container>
			</v-card-text>

			<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="blue-darken-1" variant="text" @click="close">
				Cancel
			</v-btn>
			<v-btn color="blue-darken-1" variant="text" @click="save">
				Save
			</v-btn>
			</v-card-actions>
		</v-card>
		</v-dialog>
		<v-dialog v-model="dialogDelete" max-width="500px">
		<v-card>
			<v-card-title class="text-h5"
			>Are you sure you want to delete this item?</v-card-title
			>
			<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="blue-darken-1" variant="text" @click="closeDelete"
				>Cancel</v-btn
			>
			<v-btn
				color="blue-darken-1"
				variant="text"
				@click="deleteItemConfirm"
				>OK</v-btn
			>
			<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
		</v-dialog>
	</v-toolbar>
	</template>
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon class="me-2" size="small" @click="editItem(item)">
				mdi-pencil
			</v-icon>
			<v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="getItems"> Reset </v-btn>
		</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import { useInventoryStore } from '~/store/inventory';

	export default {
		data: () => ({
			dialog: false,
			dialogDelete: false,
			headers: [
				{
				title: 'SKU',
				align: 'start',
				sortable: false,
				key: 'sku',
				},
				{ title: 'Name', key: 'name' },
				{ title: 'Count', key: 'count' },
				{ title: 'Price', key: 'price' },
				{ title: 'Last incoming receipt', key: 'lastIncoming' },
				{ title: 'Last purchase', key: 'lastPurchase' },
				{ title: 'Actions', key: 'actions', sortable: false },
			],
			inventory: [],
			editedIndex: -1,
			editedItem: {
				sku: '',
				name: '',
				count: 0,
				price: 0,
				lastIncoming: '',
				lastPurchase: '',
			},
			defaultItem: {
				sku: '',
				name: '',
				count: 0,
				price: 0,
				lastIncoming: '',
				lastPurchase: '',
			},
			}),

			computed: {
				formTitle() {
					return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
				},
			},

			watch: {
			dialog(val) {
				val || this.close()
			},
			dialogDelete(val) {
				val || this.closeDelete()
			},
		},

		async created() {
			await this.getItems()
		},

		methods: {
			async getItems() {
				const { getInventory } = useInventoryStore();
				const { inventory } = storeToRefs(useInventoryStore());

				await getInventory();
				this.inventory = inventory;
			},

			editItem(item) {
				this.editedIndex = this.inventory.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem(item) {
				this.editedIndex = this.inventory.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogDelete = true
			},

			deleteItemConfirm() {
				this.inventory.splice(this.editedIndex, 1)
				this.closeDelete()
			},

			close() {
				this.dialog = false
				this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
				})
			},

			closeDelete() {
				this.dialogDelete = false
				this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
				})
			},

			save() {
				if (this.editedIndex > -1) {
				Object.assign(this.inventory[this.editedIndex], this.editedItem)
				} else {
				this.inventory.push(this.editedItem)
				}
				this.close()
			},
		},
	}
</script>