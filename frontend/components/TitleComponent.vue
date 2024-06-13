<template>
	<h1 class="title text-left">
		{{ title }}
	</h1>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			}
		}
	}
</script>