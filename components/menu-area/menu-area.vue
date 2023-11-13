<template>
<view class="menu ">
    <area-header :title="title" @moreClick="onMenuMoreClick" />
    <scroll-view class="list" enable-flex scroll-x>
        <template v-for="item in menuList" :key="item.id">
            <view class="item">
                <menu-item :itemData="item" />
            </view>
        </template>
    </scroll-view>
</view>
</template>

<script setup>
const props = defineProps({
	title:{
		type:String,
		default:'默认标题'
	},
	menuList:{
	    type:Array,
	    default:[]
	}
})
const onMenuMoreClick=()=>{
	uni.navigateTo({
		url:'/pages/detail-menu/detail-menu'
	})
}
</script>

<style lang="scss">
.menu .list .item{
    width: 200rpx;
    flex-shrink: 0;
    margin-right: 15rpx;
    
}
.menu .list .item:nth-child(1){
    margin-left: 20rpx;
}
.menu .list .item:last-child{
    padding-right: 20rpx;
}

.menu .list{
    display: flex;
    align-items: flex-start;
}
:deep(.uni-scroll-view-content){
	display: flex;
}
</style>