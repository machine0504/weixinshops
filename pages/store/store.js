import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//首页tab传输存储的值
const list={
	listing:[]
}
const tabload={
	load:''
}
const selectcity={
	city:''
}
const pulishcity={
	city:''
}
const state={
	list,
	tabload,
	selectcity,
	pulishcity
}
export default new Vuex.Store({
	state,
	//可以执行异步操作
	actions:{
		imgactions(imgactions,imgdata){
			imgactions.commit('imgmuta',imgdata)
		}
	},
	//同步操作
	mutations:{
		imgmuta(state,imgdata){
			state.list={
				listing:imgdata
			}
		},
		tabloading(state,tabloading){
			state.tabload={
				load:tabloading
			}
		},
		//城市选择界面
		citymuta(state,citydata){
			state.selectcity={
				city:citydata
			}
		},
		//攻略页面
		pulishmuta(state,citydata){
			state.pulishcity={
				city:citydata
			}
		}
	}
})