
<script>
	export default {
		onLaunch:function () {
			console.log('App Launch')
			console.log(uni.getWindowInfo());
			const {screenHeight,screenWidth,statusBarHeight}  =uni.getWindowInfo()
			this.globalData.deviceHeight = screenHeight
			this.globalData.deviceWidth = screenWidth
			this.globalData.screenStatusHeight = statusBarHeight
			this.globalData.contentHeight = this.resetContentHeight()
			
			this.requestFail()
			this.initAudio()
			uni.onWindowResize(this.resetDeviceSize)
			
		},
		onShow: function() {
			console.log('App Show') 
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			deviceHeight:0,
			deviceWidth:0,
			screenStatusHeight:0,
			contentHeight:0,
			audioContext:null
		},
		methods:{
			requestFail(){
				uni.addInterceptor('request', {
				  fail(err) {
				    uni.showToast({
				    	title:"请检查网络",
						icon:"error"
				    })
				  }, 
				})
			},
			resetContentHeight(){
				// #ifndef H5
				const app = getApp()
				return app.globalData.deviceHeight - app.globalData.screenStatusHeight - 44
				// #endif
				// #ifdef H5
				const height = window.document.body.clientHeight - 44
				return height
				// #endif
			},
			resetDeviceSize(){
				const {screenHeight,screenWidth,statusBarHeight}  =uni.getWindowInfo()
				this.globalData.deviceHeight = screenHeight
				this.globalData.deviceWidth = screenWidth
				this.globalData.screenStatusHeight = statusBarHeight
				this.globalData.contentHeight = this.resetContentHeight()
			},
			initAudio(){
				const audio =  uni.createInnerAudioContext()
				// // #ifndef H5
				// const audio =  uni.getBackgroundAudioManager()
				// // #endif
				this.globalData.audioContext = audio

				
				
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */

	::-webkit-scrollbar {
		    display: none;
		    width: 0 !important;
		    height: 0 !important;
		    -webkit-appearance: none;
		    background: transparent;
		    color: transparent;
		  }
		  page{
		      background-color: rgb(250, 250, 250) !important;
		      box-sizing: border-box;
			  
		  }
	@media screen and (min-width:960px) {
		:root{
			font-size: 38px !important;
		}
	}
</style>
