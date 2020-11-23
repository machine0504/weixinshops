<template>
	<view class="content">
		<view class="upload-img" @click="isShow">
			<image src="../../../../static/imgs/uploadimg.png" mode=""></image>
		</view>
		<view class="wrap" v-if="show">
			<view class="item" v-for="(item,index) in topimg" :key="index">
				<image :src="item" mode="aspectFill" class="img1" @click="seeImg(index)"></image>
				<image src="../../../../static/imgs/delete.png" mode="" class="img2" @click="deleteImg(index,item)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {previewImg} from '../../../../common/previewimg.js'
	export default{
		data(){
			return{
				show:false,
				topimg:[],
				seeimg:[],
				imgcode:[]
			}
		},
		methods:{
			//上传图片
			isShow(){
				this.show=true
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res)=> {
						// this.topimg.push(...res.tempFiles)
						// console.log(this.topimg)
						uni.uploadFile({
							url:'http://192.168.0.8:5200/uploadimg',
							filePath:res.tempFiles[0].path,
							name:'file',
							success:res=>{
								console.log(JSON.parse(res.data))
								this.topimg.push(JSON.parse(res.data).img)
								this.imgcode.push(JSON.parse(res.data).code)
							}
						})
				    },
					fail: (err) => {
						console.log(err)
					}
				});
			},
			//删除图片
			async deleteImg(e,item){
				this.topimg.splice(e,1)
				const res = await this.myRequest({
					url: '/deletfile',
					method: 'POST',
					data: {
						code: this.imgcode[e],
						type:item.substring(item.length-4)
					}
				});
				console.log(res)
			},
			//预览图片
			seeImg(index){
				this.seeimg=[]
				for(let i in this.topimg){
					this.seeimg.push(this.topimg[i])
				}
				let imglist=this.seeimg
				previewImg(index,imglist)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: auto;
		margin-bottom: 20rpx;
		.upload-img{
			width: 40%;
			background-color: rgba($color: #cccccc, $alpha: 0.3);
			margin-left: 5%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			image{
				width: 50%;
				height: 100rpx;
			}
		}
		.wrap{
			width: 95%;
			height: auto;
			margin-left: 5%;
			display: flex;
			flex-wrap: wrap;
			.item{
				width: 23%;
				height: 150rpx;
				margin-top: 20rpx;
				margin-right: 15rpx;
				position: relative;
				.img1{
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
				.img2{
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					top: 5%;
					left: 70%;
				}
			}
		}
	}
</style>
