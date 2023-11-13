<template>
	<view class="header">
		<view class="title">
			{{title}}
		</view>
		<view class="more" v-if="hasMore" @tap="moreClick">
			 <text class="text">更多</text>
			 <u-icon name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	title:{
		type:String,
		default:'标题'
	},
	 hasMore:{
	    type:Boolean,
		default:true
	}
})
const emits = defineEmits(['moreClick'])
const moreClick=()=>{
	emits('moreClick')
}
</script>
<style lang="scss">
	.header{
	    display: flex;
	    justify-content: space-between;
	    padding: 20rpx ;
	    align-items: center;
	
	}
	.header .title{
	    font-size: 36rpx;
	    font-weight: 700;
	    color: black;
	}
	
	.header .more{
	    font-size: 25rpx;
	    color: #888888;
		display: flex;
		align-items: center;
	}

</style>