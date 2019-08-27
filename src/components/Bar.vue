<template>
	<div :class="flag?'bar':'black'" @click="toggleColor">
		<h1>Bar Component</h1>
	</div>
</template>
<script>
export default {
	data() {
		return {
			flag: true
		}
	},
	methods: {
		toggleColor() {
			this.flag = !this.flag
		}
	},
	mounted() {
		console.log(this.$route.params)
	}
}
</script>
<style>
.bar {
	background: bisque;
}
.black {
	background-color: whitesmoke;
}
</style>
