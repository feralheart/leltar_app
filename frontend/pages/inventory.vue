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
			<v-btn color="primary" @click="initialize"> Reset </v-btn>
		</template>
		</v-data-table>
	</v-container>
</template>

<script>
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

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        this.inventory = [
			{
				sku: 'ABCD1234',
				name: 'Csavarhúzó PZ2',
				count: 10,
				price: 150,
				lastIncoming: '2024-01-10',
				lastPurchase: '2024-03-10',
			},
			{
				sku: 'ABDE1531',
				name: 'Százas szög',
				count: 1000,
				price: 10,
				lastIncoming: '2024-01-13',
				lastPurchase: '2024-03-14',
			},
			{
				sku: 'A314g',
				name: 'Menetes csavar',
				count: 100,
				price: 6,
				lastIncoming: '2024-01-12',
				lastPurchase: '2024-02-15',
			},
			{
				sku: '134315',
				name: 'Menetes szár M8',
				count: 20,
				price: 1080,
				lastIncoming: '2024-03-15',
				lastPurchase: '2024-01-16',
			},
			{
				sku: '134316',
				name: 'Menetes szár M10',
				count: 10,
				price: 1090,
				lastIncoming: '2024-04-05',
				lastPurchase: '2024-05-12',
			},
			{
				sku: 'ABCD1235',
				name: 'Csavarhúzó PZ3',
				count: 10,
				price: 165,
				lastIncoming: '2024-05-05',
				lastPurchase: '2024-06-01',
			},
        ]
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