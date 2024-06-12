<template>
	<v-app class="main-wrapper">
		<HeaderComponent />
		<v-main>
			<v-container>
				<slot />
			</v-container>
		</v-main>
		<FooterComponent />
	</v-app>
</template>
<script>
	export default {
		name: 'DefaultLayout'
	}
</script>
