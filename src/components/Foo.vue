<template>
	<div class="foo" @click="onHandleClick">
		<h1>Foo Component</h1>
		<h2>异步Ajax数据：</h2>
		<span>{{ msg }}</span>
	</div>
</template>

<script>
const fetchInitialData = ({ store }) => {
	store.dispatch('fetchBar')
}

export default {
	asyncData: fetchInitialData,

	methods: {
		onHandleClick() {
			alert('bar')
		}
	},

	mounted() {
		// 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
		// 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
		let store = this.$store
		fetchInitialData({ store })
		console.log(this.$route.query)
	},

	computed: {
		msg() {
			return this.$store.state.foo
		}
	}
}
</script>

<style>
.foo {
	background: yellowgreen;
}
</style>
