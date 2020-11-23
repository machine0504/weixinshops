<template>
	<view class="content">
		<view class="img-list">
			<view class="img-item" v-for="(item,index) in imglist" :key="index">
				<view class="head-img">
					<image :src="item.img" mode="aspectFill"></image>
				</view>
				<view class="head-title">{{item.title}}</view>
				<view class="head-desc">{{item.desc}}</view>
				<view class="head-map">
					<image src="../../../static/imgs/map.svg" mode=""></image>
					<text>{{item.map}}</text>
				</view>
				<view class="head-price">
					<text class="price">￥{{item.price}}</text>
					<text class="num">{{item.num}}人已购</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	props:{
		imglist:{
			type:Array
		}
	},
	created() {

	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: auto;
		// margin-bottom: 100rpx;
		.img-list{
			width: 96%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 2%;
			.img-item{
				width: 48%;
				height: 650rpx;
				.head-img{
					width: 100%;
					height: 350rpx;
					border-radius: 10rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.head-title{
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 36rpx;
					color: #ffcc00;
				}
				.head-desc{
					width: 100%;
					height: 100rpx;
					line-height: 50rpx;
					font-size: 32rpx;
					font-weight: bold;
					overflow: hidden;
				}
				.head-map{
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					image{
						width: 48rpx;
						height: 48rpx;
					}
					text{
						font-size: 32rpx;
						margin-left: 24rpx;
						color: #ffcc00;
					}
				}
				.head-price{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					.price{
						color: #dd524d;
						font-size: 36rpx;
					}
					.num{
						color: #C0C0C0;
						font-size: 32rpx;
						margin-left: 24rpx;
					}
				}
			}
		}
	}
</style>
