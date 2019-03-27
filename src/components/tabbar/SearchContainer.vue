<template>
	<div class="search-container">
		<mtheader></mtheader>

		<h3>SearchContainer</h3>

		<tabbar></tabbar>
	</div>
</template>
<script>
	import mtheader from '../subcomponents/header.vue'
	import tabbar from '../subcomponents/tabbar.vue'
	
	export default {
		components: {
			mtheader,
			tabbar
		}
	}
</script>
<style lang="scss" scoped>
	.search-container {
		padding-top: .6827rem;
		padding-bottom: .8534rem;
	}
</style>