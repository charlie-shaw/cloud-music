<template>
<!--pages/detail-menu/detail-menu.wxml-->

<view class="inner">
	<template v-for="item in songMenus" :key="item.cat" >
	    <song-menu-area :title="item.cat" :menuList="item.playlists" />
	</template>
	<view class="loading">
	  <!--  <van-loading wx:if="{{isLoading}}" size="24px">加载中...</van-loading> -->
	</view>
</view>

</template>

<script setup>
import { ref } from 'vue';
import {onLoad} from  '@dcloudio/uni-app'
import {getSongMenuTag,getSongMenuList} from '../../service/home.js'
const songMenus = ref([])
const isLoading=ref(true)
onLoad(()=>{
	fetchAllMenuList()
})
const fetchAllMenuList= async ()=>{
        const allPromise=[]
        const res = await getSongMenuTag()
        const tags=res.tags
        for(const tag of tags){
            allPromise.push(getSongMenuList(tag.name))
        }
        const results = await Promise.all(allPromise)
		songMenus.value = results
        if(songMenus.value.length>0) isLoading.value=false
    }
</script>

<style lang="scss">
.inner{
	padding: 20rpx;
}
</style>
