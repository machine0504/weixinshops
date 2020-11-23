import Vue from 'vue'
import App from './App'
import {myRequest} from './static/js/request.js'
Vue.config.productionTip = false
Vue.prototype.myRequest=myRequest
App.mpType = 'app'
//引入vuex
import store from './pages/store/store.js'
Vue.prototype.$store=store
//引入confirm组件
import confirm from './components/confirm/confirm.vue'
Vue.component('u-confirm',confirm)
//引入tab切换的loading
import loader from './components/loading.vue'
Vue.component('load-list',loader)
//引入没有数据提示
import nodata from './components/nodata.vue'
Vue.component('no-data',nodata)
const app = new Vue({
    ...App,
	store
})
app.$mount()
