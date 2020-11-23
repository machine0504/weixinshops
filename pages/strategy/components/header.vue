<template>
	<view class="content">
		<view class="header-img">
			<view class="wrap">
				<text class="txt1" @click="selectCity">{{city}}</text>
				<image src="../../../static/imgs/sta2.png" mode="" @click="selectCity"></image>
			</view>
			<text class="txt2">TRAVEL</text>
		</view>
		<view class="airplane">
			<image src="../../../static/imgs/sta3.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			city:{
				type:String
			}
		},
		methods: {
			selectCity(){
				uni.navigateTo({
					url:'/pages/strategy/selectcity/selectcity'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: auto;
		.header-img{
			width: 100%;
			height: 400rpx;
			background-image: url(../../../static/imgs/sta1.jpg);
			background-position: center;
			background-size: 100%;
			background-repeat: no-repeat;
			position: relative;
			.wrap{
				width: 100%;
				height: 60rpx;
				align-items: center;
				display: flex;
				position: absolute;
				top: 40%;
				.txt1{
					font-size: 46rpx;
					font-weight: bold;
					margin-left: 10%;
				}
				image{
					width: 48rpx;
					height: 48rpx;
					margin-left: 5%;
				}
			}
			.txt2{
				font-size: 32rpx;
				position: absolute;
				left: 10%;
				top: 58%;
			}
		}
		.airplane{
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 90%;
				height: 200rpx;
			}
		}
	}
</style>
