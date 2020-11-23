<template>
	<view class="content">
		<view class="header">
			<view class="search">
				<image src="../../../static/imgs/search.png" mode=""></image>
				<input type="text" value="" placeholder="发现你感兴趣的城市" @focus="showData" @input="searchCity" v-model="keywords"/>
				<image src="../../../static/imgs/clear.png" mode="" v-if="clearshow" @click="deleteKey"></image>
			</view>
		</view>
		<view class="wrap" v-if="pageshow">
			<view class="city">
				<text>当前定位城市</text>
				<image src="../../../static/imgs/address.png" mode=""></image>
				<text @click="clickCity">{{nowcity}}</text>
			</view>
			<view class="hotcity">
				<text>热门城市</text>
				<view class="searchlist">
					<text v-for="(item,index) in hotSelectCity" :key="index" @click="selectHotCity(item.name)">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="searchlist" v-else>
			<view class="item" v-for="(item,index) in hotcitylist" :key="index" @click="checkCity(item)">
				<view class="wrap">
					<image src="../../../static/imgs/address.png" mode=""></image>
				</view>
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {address} from '../../../common/getlocation.js'
	var QQMapWX = require('../../../common/qqmap-wx-jssdk.js');
	var qqmapsdk = new QQMapWX({
		key: 'CWUBZ-627RK-ZDIJR-APUZX-IGZQS-PNFWB'
	});
	export default {
		data() {
			return {
				clearshow:false,
				pageshow:true,
				nowcity:'',
				hotcitylist:[],
				hotSelectCity:[
					{name:'成都市'},
					{name:'达州市'},
					{name:'重庆市'},
					{name:'三亚市'},
					{name:'大理白族自治州'}
				],
				keywords:'',
				route:false
			}
		},
		methods: {
			showData(){
				this.clearshow=true
				this.pageshow=false
			},
			//获取定位
			getlocation(){
				address().then(res=>{
					this.nowcity=res.result.ad_info.city
				}).catch(err=>{
					this.nowcity='北京市'
				})
			},
			//获取当前城市定位
			clickCity(){
				this.$store.commit('citymuta',this.nowcity)
				uni.switchTab({
					url:`/pages/strategy/strategy`
				})
			},
			//选中热门城市
			selectHotCity(city){
				if(!this.route){
					this.$store.commit('citymuta',city)
				}
				else{
					this.$store.commit('pulishmuta',city)
				}
				uni.navigateBack({
					delta:1
				})
			},
			//实时搜索城市
			searchCity(e){
				qqmapsdk.getSuggestion({
					keyword:e.detail.value,
					//分类
					// filter:'category=景点',
					success:res=>{
						let city=res.data.map(item=>{
							return item.title
						})
						let firstcity=res.data[0].city
						this.hotcitylist=[firstcity,...city]
					},
					fail:err=>{
						console.log(err)
					}
				})
			},
			//选中搜索城市地名
			checkCity(e){
				if(!this.route){
					this.$store.commit('citymuta',e)
				}
				else{
					this.$store.commit('pulishmuta',e)
				}
				uni.navigateBack({
					delta:1
				})
			},
			deleteKey(){
				this.keywords=''
				this.hotcitylist=[]
			}
		},
		created() {
			this.getlocation()
		},
		//判断路由
		onLoad() {
			let pages=getCurrentPages()
			let prevpage=pages[pages.length-2]
			console.log(prevpage.route)
			if(prevpage.route==='pages/strategy/publish/publish'){
				this.route=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		.content{
			width: 100%;
			height: auto;
			.header{
				width: 100%;
				height: 200rpx;
				background: linear-gradient(to top, #ccffff 10%, #ffcc00 100%);
				display: flex;
				justify-content: center;
				align-items: center;
				.search{
					width: 80%;
					height:80rpx;
					background-color: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					image{
						width:10%;
						height: 50rpx;
					}
					input{
						width: 80%;
						height: 60rpx;
					}
				}
			}
			.wrap{
				width: 100%;
				height: auto;
				.city{
					margin: 40rpx 0;
					width: 100%;
					height: 100rpx;
					background: rgba($color: #cccccc, $alpha: 0.3);
					display: flex;
					align-items: center;
					text{
						font-size: 32rpx;
						margin-left: 20rpx;
					}
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
				.hotcity{
					width: 100%;
					height: auto;
					text{
						font-size: 40rpx;
						color: #C0C0C0;
						margin-left: 20rpx;
					}
					.searchlist{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin-top: 40rpx;
						text{
							font-size: 32rpx;
							margin-left: 20rpx;
							margin-bottom: 40rpx;
							color: #000000;
						}
					}
				}
			}
			.searchlist{
				width: 100%;
				height: auto;
				.item{
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #C0C0C0;
					.wrap{
						width: 20%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 60rpx;
							height: 60rpx;
						}
					}
					text{
						font-size: 34rpx;
						color: #F0AD4E;
						width: 80%;
					}
				}
			}
		}
	}
</style>
