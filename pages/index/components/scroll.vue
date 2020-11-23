<template>
	<view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true" >
			<view>
				<block v-for="(item,index) in scrollData" :key="index">
					<view class="listcont" :class="{active:index===num}" @click="swtich(index)">
						<view>
							<text class="cont-a">{{item.title}}</text>
						</view>
						<view>
							<text class="cont-b" :class="{activeb:index===num}">{{item.label}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollData:[],
			num:0,
			imgdata:[],
			state:false
		};
	},
	created() {
		this.getScroll()
	},
	methods: {
		async getScroll() {
			const res = await this.myRequest({
				url: '/index/swiper'
			});
			this.scrollData=res.data[0].data.scroll
		},
		async swtich(index){
			this.num=index
			let tabloading=true
			this.$store.commit('tabloading',tabloading)
			const res=await this.myRequest({
				url:'/index/img'
			})
			if(res.data[0].type='success'){
				let tabloading=false
				this.$store.commit('tabloading',tabloading)	
			}
			// let tabloading=false
			// this.$store.commit('tabloading',tabloading)
			console.log(res.data[0].imgdata[index].imglist)
				this.imgdata=res.data[0].imgdata[index].imglist
			//第二种方法 vuex传值
			//this.$store.dispatch('imgactions',this.imgdata)
			//第一种方法 父子组件传值
			this.$emit('imgdata',this.imgdata,this.state)
		}
	}
};
</script>

<style lang="scss" scoped>
	.scroll{
		width: 100%;
		padding: 20rpx 0;
		white-space: nowrap;
		position: absolute;
		left: 0;
		right: 0;
		background: #FFFFFF;
		.active{
			background: linear-gradient(to right, #ccffff 10%, #ffcc00 100%);
			border-top-right-radius: 50rpx;
		}
		.listcont{
			width: 180rpx;
			display: inline-block;
			text-align: center;
			.cont-a{
				color: #292c33;
				font-size: 30rpx;
				font-weight: bold;
			}
			.activeb{
				color: #292c33 !important;
			}
			.cont-b{
				color: #9ea095;
				font-size: 24rpx;
			}
		}
	}
</style>
