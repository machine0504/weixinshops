<template>
	<view class="content">
		<view class="img-list" v-if="imglist.length>0">
			<view class="img-item" v-for="(item,index) in imglist" :key="index">
				<view class="head-img">
					<image :src="item.imglist[0]" mode="aspectFill"></image>
				</view>
				<view class="head-title">{{item.title}}</view>
				<view class="head-desc">{{item.descripe}}</view>
				<view class="head-map">
					<image :src="item.userinfo.avatarUrl" mode="aspectFill"></image>
					<text>{{item.address}}</text>
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
		console.log(this.imglist)
	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: auto;
		margin-bottom: 100rpx;
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
					overflow: hidden; /*自动隐藏文字*/
					text-overflow: ellipsis; /*文字隐藏后添加省略号*/
					white-space: nowrap; /*强制不换行*/
				}
				.head-desc{
					width: 100%;
					height: 60rpx;
					line-height: 50rpx;
					font-size: 32rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis; /*文字隐藏后添加省略号*/
					white-space: nowrap; /*强制不换行*/
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
