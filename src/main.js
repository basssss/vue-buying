// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入解决浮点数计算精度问题
import calc from 'calculatorjs'

// 每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

//在FoodsList中已经把所有商店的信息存到了本地，这里把本地数据取出来
var shop = JSON.parse(localStorage.getItem('shop') || '[]')
console.log('进入main.js====================') 

const store = new Vuex.Store({
	state: {  //this.$store.state.xxx
		car: car, //每家店购物车信息 {shop_id: 商店id,allPrice: 该店购物车中商品总价, allMarketPrice: 该店购物车中商品总售价, allCount: 该店所有商品数量, goodInfo:[{},{}]}
		shop: shop  //存储所有商店信息
	},
	mutations: {  //this.$store.commit('方法名称', 按需传递唯一的参数)
		addToCar(state, addGoodInfo){

			console.log('调用了addToCar')
			// 假设购物车中没有找到对应的商品
			let good_flag = false
			// 假设购物车中没有该店的商品
			let shop_flag = false
			state.car.some( shop_item => {
				if(shop_item.shop_id === addGoodInfo.shop_id) { //如果购物车中已经有这家店的商品
					shop_flag = true
					shop_item.goodInfo.some( good_item => {
						if(good_item.good_id === addGoodInfo.good_id){ //如果该商品已存在
							good_flag = true
							good_item.count++
							return true 
						} //end if
					})
					if (!good_flag) { //购物车中没有该商品
						shop_item.goodInfo.push(addGoodInfo)
					}
					shop_item.allCount++
					shop_item.allPrice = calc.add(shop_item.allPrice, addGoodInfo.sell_price)
					shop_item.allMarketPrice = calc.add(shop_item.allMarketPrice, addGoodInfo.market_price)
					return true
				}//endif
			})
			if (!shop_flag) { //购物车中没有该店的商品
				state.car.push({shop_id: addGoodInfo.shop_id, allPrice: addGoodInfo.sell_price,allMarketPrice: addGoodInfo.market_price, allCount: addGoodInfo.count, goodInfo:[addGoodInfo]})
			}
			// 当更新car之后，把car数组，存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		reduceFromCar(state, reduceGoodInfo){
			console.log('调用了reduceFromCar')
			state.car.some( shop_item => {
				if(shop_item.shop_id === reduceGoodInfo.shop_id) { //从购物车中找到要删除商品的这家店
					shop_item.goodInfo.some( good_item => {
						if(good_item.good_id === reduceGoodInfo.good_id){ //找到该商品
							good_item.count--
							if(good_item.count === 0) {  //如果该商品数量为0，则将其从购物车移除
								let goodIndex = shop_item.goodInfo.findIndex( item => item.good_id === reduceGoodInfo.good_id)
								shop_item.goodInfo.splice(goodIndex, 1)
							}
							return true 
						} //end if
					})
					shop_item.allCount--
					if( shop_item.allCount === 0 ){ //如果该商店购物车中没有商品，则该商店移除
						let shopIndex = state.car.findIndex( item => item.shop_id === shop_item.shop_id)
						state.car.splice(shopIndex, 1)
					}
					return true
				}//endif
			})
			// 当更新car之后，把car数组，存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		clearCar(state, shop_id){ //根据shop_id找到商店，并将其移除
			let shopIndex = state.car.findIndex( item => item.shop_id === shop_id)
			state.car.splice(shopIndex, 1)
			// 当更新car之后，把car数组，存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters:{ //this.$store.getters.xxx
		getPerShopCount: (state) => (shop_id) => {//根据shop_id找到对应商店中加入购物车的商品数量
			var shop = state.car.find( item => { 
				return item.shop_id === parseInt(shop_id)
			})
			// 购物车中有该店，返回该店商品总数，否则返回0
			return shop ? shop.allCount : 0
		},
		getPerGoodCount: (state) => (good_id) => {//根据good_id找到对应商品加入购物车的数量
			let good
			state.car.some( item => {
				good = item.goodInfo.find( item => {
					return item.good_id === good_id
				})
				if(good) return true
			})
			// 如果购物车找到该商品，返回商品数量，否则返回0
			return good ? good.count : 0
		},
		getPerShopGoods: (state) => (shop_id) => {  //根据shop_id找到对应商店，并返回该店所有商品信息
			var shop = state.car.find( item => { 
				return item.shop_id === parseInt(shop_id)
			})
			return shop ? shop.goodInfo : []
		},
		getDiscount: (state) => (shop_id) => { //根据shop_id找到对应商店，并返回购物车中商品减了多少元
			// 传入的shop_id不是 NaN时才执行
			let discount = 0 
			if(!isNaN(parseInt(shop_id))) {
				let shop = state.car.find( item => item.shop_id === parseInt(shop_id))
				if(shop){
					shop.goodInfo.forEach( item => {
						if(item.market_price) { //如果商品有市场价
							discount = calc.add(calc.mul(calc.sub(item.market_price, item.sell_price), item.count), discount)
						}
					})
				}
			}
			return discount
		},
		getAllPrice: (state) => (shop_id) => {  //根据shop_id找到对应商店，并返回购物车中商品总价
			var shop = state.car.find( item => { 
				return item.shop_id === parseInt(shop_id)
			})
			return shop ? shop.allPrice : 0
		},
		getAllMarketPrice: (state) => (shop_id) => {  //根据shop_id找到对应商店，并返回购物车中商品总的市场价
			var shop = state.car.find( item => { 
				return item.shop_id === parseInt(shop_id)
			})
			return shop ? shop.allMarketPrice : 0
		}
	}
})

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
	router,  //挂载路由对象到vm实例
	store  //挂载 store 状态管理对象
})

