<template>
	<view class="mask" v-if="show">
		<view class="confirm-wrap">
			<view class="message">请登录后在操作</view>
			<view class="handle">
				<button class="btn" plain="true" @click="reset">取消</button>
				<button class="active" plain="true" @click="getUserInfo">登录</button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'Confirm',
	data() {
		return {
			show: false,
		};
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		isShow(nval, oval) {
			this.show = nval;
		}
	},
	created() {
		this.show = this.isShow;
	},
	methods: {
		reset() {
			this.show = false;
			this.$emit('noshow', this.show);
		},
		//登录
		getUserInfo() {
			let app={
				appid:'wx8e0e2a88e974b63c',
				secret:'01c6b5501d6b3a67bfcd25ebcc9e60f2'
			}
			uni.login({
				provider: 'weixin',
				success: loginRes=> {
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: infoRes=> {
							//用户数据
							this.$emit('userinfo',JSON.stringify(infoRes.userInfo))
							this.show = false;
							this.$emit('noshow', this.show);
							uni.showToast({
								title:'登录成功',
								icon:'none'
							})
							uni.request({
								url:'https://api.weixin.qq.com/sns/jscode2session?appid='+app.appid+'&secret='+app.secret+'&js_code='+loginRes.code+'&grant_type=authorization_code',
								data: {},
								method:'GET',
								success:res=>{
									//用户登录凭证
									this.$emit('openid',res.data.openid)
								}
							})
						}
					});
				}
			});
		}
	}
};
</script>
<style scoped>
.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 900;
	left: 0px;
	top: 0px;
	background: rgba(0, 0, 0, 0.2);
}
.confirm-wrap {
	width: 80%;
	max-width: 400px;
	/* height: 150px; */
	/* height: 40%;
  max-height: 150px; */
	height: auto;
	background-color: #2e3846;
	position: absolute;
	z-index: 1;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
}
.confirm-wrap .message {
	text-align: center;
	font-size: 18px;
	margin: 30px 15px 0;
	font-weight: bold;
	color: #ffffff;
	word-break: break-all;
}
.confirm-wrap .handle {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 25px;
	box-sizing: border-box;
	margin-bottom: 25px;
}
.confirm-wrap .handle .btn {
	background-color: #cfd8dc;
	font-size: 16px;
	cursor: pointer;
	color: #ffffff;
	width: 30%;
	height: 45px;
	border-radius: 5px;
	text-align: center;
	line-height: 45px;
}
.confirm-wrap .handle .active {
	background-color: #4caf50;
	font-size: 16px;
	cursor: pointer;
	color: #ffffff;
	width: 30%;
	height: 45px;
	border-radius: 5px;
	text-align: center;
	line-height: 45px;
}
</style>
