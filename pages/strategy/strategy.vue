<template>
	<view class="content">
		<view class="">
			<header-tab :city="mycity"></header-tab>
			<item-tab  @selectType="select"></item-tab>
			<img-list :imglist="imgdata"></img-list>
			<uni-fab 
				:pattern="pattern"
				:content="content"
				@trigger="trigger"
				horizontal='right'>
			</uni-fab>
		</view>
		<view class="loading" :class="{active:ishow}">
			<image src="../../static/imgs/loading.gif" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import headerTab from './components/header.vue'
	import itemTab from './components/item.vue'
	import imgList from './components/imglist.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import {address} from '../../common/getlocation.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				ishow:false,
				pattern:{
					buttonColor:'#ffd330'
				},
				content:[
					{
						iconPath:'../../static/imgs/search.png',
						selectedIconPath:'../../static/imgs/searchs.png',
						text:'查询',
						active:true
					},
					{
						iconPath:'../../static/imgs/chat.png',
						selectedIconPath:'../../static/imgs/chats.png',
						text:'发表',
						active:false
					}
				],
				mycity:'',
				imgdata:[]
			}
		},
		components:{
			headerTab,itemTab,imgList,uniFab
		},
		methods: {
			trigger(e){
				if(e.index===1){
					uni.navigateTo({
						url:'/pages/strategy/publish/publish'
					})
				}
			},
			//获取定位
			getAddress(){
				address().then(res=>{
					this.mycity=res.result.ad_info.city
				}).catch(err=>{
					this.mycity='北京市'
				})
			},
			async select(data){
				this.imgdata=[]
				const res = await this.myRequest({
					url: `/strategy/select?type=${data}`
				});
				res.data.forEach(v=>{
					this.imgdata.push(v.data)
				})
			}
		},
		onLoad(options) {
			let timer=setTimeout(()=>{
					this.ishow=true
					clearTimeout(timer)
			},2000)
			this.mycity=options.city
		},
		async created() {
			this.getAddress()
			const res = await this.myRequest({
				url: '/strategy/select?type=全部'
			});
			res.data.forEach(v=>{
				this.imgdata.push(v.data)
			})
		},
		computed:{
			...mapState(['selectcity']),
			countload(){
				this.mycity=this.selectcity.city
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
			overflow: scroll;
			overflow-x: hidden;
			.loading{
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 99;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				image{
					width: 100%;
					height: 40%;
				}
			}
			.active{
				display: none;
			}
		}
	}
</style>
