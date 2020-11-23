<template>
	<view class="content">
		<view class="search">
			<view class="search-a"><image src="../../../static/imgs/扫一扫.png" mode=""></image></view>
			<view class="search-b">
				<image src="../../../static/imgs/search.svg" mode=""></image>
				<input type="text" value="" placeholder="请输入搜索内容" disabled />
			</view>
			<view class="search-c"><image src="../../../static/imgs/短信.png" mode=""></image></view>
		</view>
		<view class="swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in swiperData" :key="index">
					<image :src="item.imageurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperData: []
		};
	},
	created() {
		this.getSwiperImg()
	},
	methods: {
		async getSwiperImg() {
			const res = await this.myRequest({
				url: '/index/swiper'
			});
			this.swiperData=res.data[0].data.swiper
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: auto;
	.search {
		width: 100%;
		height: 112rpx;
		background: linear-gradient(to top, #ffe556 10%, #ffd300 100%);
		display: flex;
		align-items: center;
		.search-a,
		.search-c {
			width: 48rpx;
			height: 48rpx;
			margin-left: 32rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.search-b {
			width: 532rpx;
			height: 70rpx;
			background-color: #fff7d4;
			display: flex;
			align-items: center;
			margin-left: 32rpx;
			border-top-left-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			border-bottom-right-radius: 50rpx;
			image {
				width: 48rpx;
				height: 48rpx;
			}
			input {
				color: #666666;
			}
		}
	}
	.swiper {
		width: 100%;
		height: 288rpx;
		swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
