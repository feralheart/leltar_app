<template>
	<v-card class="elevation-12">
		<v-toolbar>
			<v-toolbar-title>Login form</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<v-form ref="form" @submit.prevent="login()">
				<v-text-field
					v-model="email"
					name="email"
					label="Email"
					type="text"
					required>
				</v-text-field>
				<v-text-field
					v-model="password"
					name="password"
					label="Password"
					type="password"
					required>
				</v-text-field>
				<v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>
<script>
	import { useAuthStore } from '~/store/auth';

	export default {
		name: "Login",
		data() {
			return {
				email: "",
				password: "",
			};
		},
		methods: {
			async login() {
				const router = useRouter()
				const { authenticateUser } = useAuthStore();
				await authenticateUser({ username: this.email, password: this.password });
				const { authenticated } = storeToRefs(useAuthStore());
				if (authenticated.value === true) {
					this.$snackbar.add({
						type: 'success',
						text: 'Successfully logged in'
					})

					router.push('/inventory');
				} else {
					this.$snackbar.add({
						type: 'error',
						text: 'E-mail or password incorrect'
					})
				}
			},
		},
	};
</script>