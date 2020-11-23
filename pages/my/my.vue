<template>
	<view class="content">
		<view class="">
			wd
		</view>
		<view class="loading" :class="{active:ishow}">
			<image src="../../static/imgs/loading.gif" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ishow:false
			}
		},
		methods: {
			
		},
		onLoad() {
			let timer=setTimeout(()=>{
					this.ishow=true
					clearTimeout(timer)
			},2000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		.content{
			width: 100%;
			height: auto;
			.loading{
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 99;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				image{
					width: 100%;
					height: 40%;
				}
			}
			.active{
				display: none;
			}
		}
	}
</style>
