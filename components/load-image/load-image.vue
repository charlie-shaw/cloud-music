<template>
	<view class="load-image">
		<image class="image" :class="isLoading && 'loading'" :mode="mode" @load="imageLoad" :src="src"></image>
		<u-loading-icon size="60rpx" v-if="isLoading"></u-loading-icon>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
	src:{
		type:String,
		default:''
	},
	mode:{
		type:String,
		default:"widthFix"
	}
})
const isLoading = ref(true)
const imageLoad = ()=>{
	isLoading.value = false
}
</script>

<style lang="scss">
.image{
	width: 100%;
	display: block;
}
.loading{
	opacity: 0;
}
</style>