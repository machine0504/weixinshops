<template>
	<view class="content">
		<item-tab ref="item"></item-tab>
		<view class="address" @click="selectCity">
			<text class="where">当前位置</text>
			<image src="../../../static/imgs/address.png" mode=""></image>
			<text class="city">{{ address }}</text>
		</view>
		<view class="input-title">
			<input type="text" value="" placeholder="给旅行日记起个标题吧" v-model="title" />
			<textarea value="" placeholder="描述下你的旅行心得,帮助更多需要的人" v-model="descripe" />
		</view>
		<upload-img ref="uploadimg"></upload-img>
		<upload-video ref="uploadvideo"></upload-video>
		<u-confirm :isShow="show" @noshow="updateshow" @openid="updateid" @userinfo="updateuser"></u-confirm>
		<view class="bottom"><button type="primary" @click="submit">发布</button></view>
	</view>
</template>

<script>
import itemTab from './components/item.vue';
import uploadImg from './components/img.vue';
import uploadVideo from './components/video.vue';
import { address } from '../../../common/getlocation.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			address: '',
			title: '',
			descripe: '',
			show: false,
			openid: '',
			userinfo: {}
		};
	},
	components: {
		itemTab,
		uploadImg,
		uploadVideo
	},
	methods: {
		//获取定位
		getAddress() {
			address()
				.then(res => {
					this.address = res.result.ad_info.city;
				})
				.catch(err => {
					this.address = '北京市';
				});
		},
		//选择城市
		selectCity() {
			uni.navigateTo({
				url: '/pages/strategy/selectcity/selectcity'
			});
		},
		//上传数据
		async submit() {
			if (this.title === '') {
				uni.showToast({
					title: '标题不能为空',
					image: '../../../static/imgs/error.png'
				});
			} else if (this.descripe.length < 12) {
				uni.showToast({
					title: '旅行心得不能少于12个汉字',
					image: '../../../static/imgs/error.png'
				});
			} else if (this.$refs.uploadimg.topimg.length < 3) {
				uni.showToast({
					title: '上传图片不能少于三张',
					image: '../../../static/imgs/error.png'
				});
			} else {
				//登录判断
				if (this.openid !== '') {
					const res = await this.myRequest({
						url: '/publish/getUserInfo',
						method: 'POST',
						data: {
							openid: this.openid,
							userinfo: this.userinfo,
							type: this.$refs.item.type,
							title: this.title,
							descripe: this.descripe,
							imglist: this.$refs.uploadimg.topimg,
							video: this.$refs.uploadvideo.video,
							address: this.address
						}
					});
					if (res) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							success:()=>{
								uni.switchTab({
									url:'/pages/strategy/strategy'
								})
							}
						});
					} else {
						uni.showToast({
							title: '提交失败',
							image: '../../../static/imgs/error.png'
						});
					}
				} else {
					this.show = true;
				}
			}
			// console.log(this.$refs.item.type);
			// console.log(this.$refs.uploadimg.topimg);
			// console.log(this.$refs.uploadvideo.video);
		},
		//子传父，更新show
		updateshow(data) {
			this.show = data;
		},
		updateid(data) {
			this.openid = data;
		},
		updateuser(data) {
			this.userinfo = JSON.parse(data);
		}
	},
	async created() {
		await this.getAddress();
	},
	computed: {
		...mapState(['pulishcity']),
		count() {
			this.address = this.pulishcity.city;
		}
	},
	watch: {
		address(nval, oval) {
			this.address = nval;
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	height: 100%;
	.content {
		width: 100%;
		height: auto;
		.input-title {
			width: 100%;
			height: auto;
			input {
				width: 95%;
				margin-left: 5%;
				height: 100rpx;
			}
			textarea {
				width: 95%;
				margin-left: 5%;
				height: 300rpx;
			}
		}
		.address {
			width: 100%;
			height: 60rpx;
			background-color: rgba($color: #cccccc, $alpha: 0.5);
			display: flex;
			align-items: center;
			margin-top: 40rpx;
			.where {
				font-size: 28rpx;
				margin-left: 20rpx;
			}
			image {
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}
			.city {
				font-size: 28rpx;
				margin-left: 20rpx;
				color: green;
			}
		}
		.bottom {
			width: 100%;
			height: auto;
			position: fixed;
			left: 0;
			bottom: 0;
			button {
				width: 100%;
				height: 100%;
				background-color: #ffd330;
			}
		}
	}
}
</style>
