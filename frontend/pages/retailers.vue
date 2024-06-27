<template>
	<v-container>
		<TitleComponent title="Retailers" />
		<v-data-table
			:headers="headers"
			:items="retailers"
		>
		<template v-slot:top>
	<v-toolbar flat>
		<v-divider class="mx-4" inset vertical></v-divider>
		<v-spacer></v-spacer>
		<v-dialog v-model="dialog" max-width="500px">
			<template v-slot:activator="{ props }">
				<v-btn class="mb-2" color="primary" dark v-bind="props">
				New Item
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
				<span class="text-h5">{{ formTitle }}</span>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" md="12" sm="12">
								<v-text-field
									v-model="editedItem.name"
									label="Name">
								</v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<v-text-field
									v-model="editedItem.taxNum"
									label="Tax Number">
								</v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<v-text-field
									v-model="editedItem.country"
									label="Country">
								</v-text-field>
							</v-col>
							<v-col cols="3" md="6" sm="12">
								<v-text-field
									v-model="editedItem.postalCode"
									label="Postal Code">
								</v-text-field>
							</v-col>
							<v-col cols="3" md="6" sm="12">
								<v-text-field
									v-model="editedItem.city"
									label="City">
								</v-text-field>
							</v-col>
							<v-col cols="12" md="12" sm="12">
								<v-text-field
									v-model="editedItem.address"
									label="Address">
								</v-text-field>
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
				<v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue-darken-1" variant="text" @click="closeDelete"
					>Cancel
				</v-btn>
				<v-btn
					color="blue-darken-1"
					variant="text"
					@click="deleteItemConfirm"
					>OK
				</v-btn>
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
			<v-icon size="small" @click="deleteItem(item)">
				mdi-delete
			</v-icon>
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
	import { useRetailerStore } from '~/store/retailers';

	export default {
		data: () => ({
			dialog: false,
			dialogDelete: false,
			headers: [
				{ title: 'Name', key: 'name' },
				{ title: 'Country', key: 'country' },
				{ title: 'Postal Code', key: 'postalCode' },
				{ title: 'City', key: 'city' },
				{ title: 'Address', key: 'address' },
				{ title: 'Tax Numer', key: 'taxNum' },
				{ title: 'Last Order', key: 'lastOrder' },
				{ title: 'Actions', key: 'actions', sortable: false },
			],
			retailers: [],
			editedIndex: -1,
			editedItem: {
				name: '',
				country: '',
				postalCode: '',
				city: '',
				address: '',
				taxNum: ''
			},
			defaultItem: {
				name: '',
				country: '',
				postalCode: '',
				city: '',
				address: '',
				taxNum: ''
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
				const { getRetailers } = useRetailerStore();
				const { retailers } = storeToRefs(useRetailerStore());

				await getRetailers();
				this.retailers = retailers;
			},

			editItem(item) {
				this.editedIndex = this.retailers.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem(item) {
				this.editedIndex = this.retailers.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogDelete = true
			},

			deleteItemConfirm() {
				this.retailers.splice(this.editedIndex, 1)
				this.$snackbar.add({
					type: 'success',
					text: 'Item deleted successfully'
				})
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
				Object.assign(this.retailers[this.editedIndex], this.editedItem)
				} else {
				this.retailers.push(this.editedItem)
				}
				this.$snackbar.add({
					type: 'success',
					text: 'Item saved successfully'
				})
				this.close()
			},
		},
	}
</script>