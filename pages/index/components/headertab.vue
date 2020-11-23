<template>
	<view class="content">
		<view class="header">
			<view class="item" v-for="(item,index) in headtab" :key="index">
				<image :src="item.imageurl" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		<view class="tab">
			<view class="item" v-for="(item,index) in tab" :key="index">
				<text class="a">{{item.text1}}</text>
				<text class="b">{{item.text2}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headtab:[],
			tab:[]
		};
	},
	created() {
		this.getHeadtab()
	},
	methods: {
		async getHeadtab() {
			const res = await this.myRequest({
				url: '/index/swiper'
			});
			this.headtab=res.data[0].data.headtab
			this.tab=res.data[0].data.tab
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: auto;
	.header{
		width: 100%;
		height: 140rpx;
		display: flex;
		.item{
			width: 20%;
			height: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
			}
			text{
				font-size: 28rpx;
			}
		}
	}
	.tab{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 25%;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.a{
				font-size: 38rpx;
			}
			.b{
				font-size: 24rpx;
				color: #cccccc;
			}
		}
	}
}
</style>