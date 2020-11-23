<template>
	<view class="content">
		<text>分类</text>
		<view class="tag">
			<view class="item" v-for="(item,index) in tag" :key="index" :class="{back:index===num}" @click="swtich(index,item.title)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag:[{
					title:'景点'
				},{
					title:'美食'
				},{
					title:'网红打卡'
				}],
				num:0,
				type:'景点'
			}
		},
		components:{
			
		},
		methods: {
			swtich(index,item){
				this.num=index
				this.type=item
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: auto;
		text{
			font-size: 48rpx;
			margin-left: 5%;
		}
		.tag{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			margin-left: 5%;
			.item{
				width: auto;
				height: 60rpx;
				padding: 10rpx 20rpx;
				text-align: center;
				line-height: 60rpx;
				border: 1px solid #777777;
				border-radius: 10rpx;
				font-size: 32rpx;
				margin-right: 5%;
				color: #cccccc;
			}
			.back{
				color: #fff;
				background: #ffd330;
			}
		}
	}
</style>
