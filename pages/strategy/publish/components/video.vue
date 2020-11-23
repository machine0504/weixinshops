<template>
	<view class="content">
		<view class="upload-img" @click="isShow"><image src="../../../../static/imgs/uploadvideo.png" mode=""></image></view>
		<view class="wrap">
			<view class="test" v-if="show">
				<video
					:src="video"
					controls
					objectFit="cover"
					poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592308909894&di=25dab631a53cf9abf628cdac94715eb7&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2316304964%2C4074978335%26fm%3D214%26gp%3D0.jpg"
				></video>
				<image src="../../../../static/imgs/delete.png" mode="" class="img2" @click="deleteVideo"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			video: ''
		};
	},
	methods: {
		//上传视频
		isShow() {
			uni.showLoading({
				title:'上传中'
			})
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				maxDuration:20,
			}).then(res=>{
				console.log(res)
				this.video=res[1].tempFilePath;
				this.show = true;
				uni.hideLoading()
			}).catch(err=>{
				console.log((err))
			})
		},
		//删除视频
		deleteVideo(){
			this.video=''
			this.show=false
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: auto;
	margin-bottom: 90rpx;
	.upload-img {
		width: 40%;
		background-color: rgba($color: #cccccc, $alpha: 0.3);
		margin-left: 5%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		image {
			width: 50%;
			height: 100rpx;
		}
	}
	.wrap {
		width: 100%;
		height: auto;
		.test {
			width: 100%;
			height: auto;
			margin: 0 8rpx;
			border-radius: 5rpx;
			position: relative;
			video{
				width: 100%;
				height: 400rpx;
				border-radius: 5rpx;
			}
			image{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				top: 6rpx;
				right: 6rpx;
			}
		}
	}
}
</style>
