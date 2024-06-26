<template>
    <header>
		<v-app-bar app>
			<v-toolbar-title>
				<p class="logo-font">
					Inventory app
				</p>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-tabs 
					active-class="nuxt-link-active"
					align-with-title
					v-if="!authenticated"
					right>
					<v-tab
						:nuxt="true"
						to="/">
						Home
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/login">
						Login
					</v-tab>
				</v-tabs>
				<v-tabs 
					active-class="nuxt-link-active"
					align-with-title
					right
					v-else>
					<v-tab
						:nuxt="true"
						to="/">
						Home
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/">
						Retailers
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/inventory">
						Inventory
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/">
						Costumers
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/">
						Users
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/">
						Purchases
					</v-tab>
					<v-tab
						:nuxt="true"
						to="/">
						Purchases
					</v-tab>
					<v-tab
						@click="logout()">
						Logout
					</v-tab>
				</v-tabs>
			</v-toolbar-items>
		</v-app-bar>
    </header>
</template>
<script setup>
	import { storeToRefs } from 'pinia';
	import { useAuthStore } from '~/store/auth';

	const router = useRouter();	
	const { authenticated } = storeToRefs(useAuthStore());
	const { logUserOut } = useAuthStore();
	const logout = () => {
		logUserOut();
		this.$snackbar.add({
			type: 'success',
			text: 'Successfully logged out'
		})
		router.push('/login');
	};
</script>