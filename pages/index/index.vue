<template>
	<view class="wrap">
		<search-swiper></search-swiper>
		<header-tab></header-tab>
		<a-scroll :class="{ is_fixed: isFixed }" id="boxFixed" @imgdata="getImgData"></a-scroll>
		<view class="" style="height: 140rpx;"></view>
		<!-- tab切换的loading -->
		<load-list v-if="tabloading"></load-list>
		<img-list :imglist="imgListData" v-if="!tabloading"></img-list>
		<!--没有数据的提示-->
		<!--<no-data></no-data>-->
		<!-- 上拉加载提示 -->
		<uni-load-more :status="loadstatus" color="#ffcc99"></uni-load-more>
		<view class="loading" v-if="ishow">
			<image src="../../static/imgs/loading.gif" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
import searchSwiper from './components/searchSwiper.vue';
import headerTab from './components/headertab.vue';
import aScroll from './components/scroll.vue';
import imgList from './components/imglist.vue';;
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
//引入导出state方法
import {mapState} from 'vuex'
export default {
	data() {
		return {
			isFixed: false,
			rect: '',
			menuTop: '',
			imgListData: [],
			ishow:true,
			pageNo:1,
			reachstate:true,
			pagetotal:0,
			tabloading:false,
			loadstatus:'noMore'
		};
	},
	components: {
		searchSwiper,
		headerTab,
		aScroll,
		imgList,
		uniLoadMore
	},
	onLoad() {
		//获取节点
		const query = wx.createSelectorQuery();
		query.select('#boxFixed').boundingClientRect();
		query.exec(res => {
			//console.log(res)
			this.menuTop = res[0].top;
		});
		let timer=setTimeout(()=>{
				this.ishow=false
				clearTimeout(timer)
		},3000)
	},
	//监听页面滚动
	onPageScroll(e) {
		//console.log(e)
		this.rect = e.scrollTop;
	},
	//计算属性
	computed: {
		/*vuex传值*/
		// //取出vuex仓库里的值
		// ...mapState(['list'])
		// //取出tab切换的值
		// count(){
		// 	this.imgListData=this.list.listing
		// },
		...mapState(['tabload']),
		countload(){
			this.tabloading=this.tabload.load
		},
		namepage() {
			if (this.rect > this.menuTop) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		}
	},
	created() {
		this.getImgList();
	},
	methods: {
		async getImgList() {
			const res = await this.myRequest({
				url: '/index/swiper'
			});
			let length=res.data[0].data.imglist.length
			let imglist=res.data[0].data.imglist
			if((length%6)===0){
				this.pagetotal=length/6
				this.imgListData=[]
				for(let i=0;i<this.pageNo*6;i++){
					this.imgListData.push(imglist[i])
				}
			}
			else{
				this.pagetotal=Math.ceil(length/6)
				if(this.pageNo===this.pagetotal){
					this.imgListData=[]
					for(let i=0;i<length;i++){
						this.imgListData.push(imglist[i])
					}
				}else{
					this.imgListData=[]
					for(let i=0;i<this.pageNo*6;i++){
						this.imgListData.push(imglist[i])
					}
				}
			}
		},
		getImgData(imgdata,state){
			this.imgListData=imgdata
			this.reachstate=state
		}
	},
	//上拉加载
	onReachBottom() {
		if(this.reachstate){
			this.pageNo++
			if(this.pageNo>this.pagetotal){
				uni.showToast({
					title:'没有更多啦',
					icon:'none'
				})
			}else{
				this.getImgList()
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		.wrap {
			width: 100%;
			height: auto;
			.ddd {
				width: 100%;
				height: 400rpx;
			}
			.is_fixed {
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
			}
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
					height: 50%;
				}
			}
		}
	}
</style>
