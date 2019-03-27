// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
// import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
// Vue.use(VueResource)


// 导入格式化时间插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})


import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)  //注意这里注册顺序不能反
// 在 main.js 中添加了这行代码之后，就能直接在组件的 methods 中使用 $http命令
Vue.prototype.$http = axios
// 设置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3005'

// 导入 MUI 的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'




// 按需导入Mint-UI中的组件
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);

// 懒加载按需导入不能显示图标，所以这里全部导入MintUI
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



// 1.3 导入自己的router.js路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'


const vmApp = new Vue({
	el: '#app',
	render: createElement => createElement(app),
	router  //挂载路由对象到vm实例
})

