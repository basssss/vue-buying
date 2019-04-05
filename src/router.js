import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import FoodsList from './components/foods/FoodsList.vue'
import FoodInfo from './components/foods/FoodInfo.vue'
import FastFoodList from './components/fastfood/FastFoodList.vue'
import BrandInfo from './components/fastfood/BrandInfo.vue'
import GoodsInfo from './components/subcomponents/goods/goodsInfo.vue'
import ConfirmOrder from './components/ConfirmOrder.vue'


// 创建路由对象
const router = new VueRouter({
	routes: [  //配置路由规则
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/search', component: SearchContainer},
		{ path: '/home/foodlist', component: FoodsList},
		{ path: '/home/foodinfo/:id', component: FoodInfo},
		{ path: '/home/fastfoodlist', component: FastFoodList},
		{ path: '/home/photoInfo/:id', component: BrandInfo},
		{ path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'}, //给这个路由命名
		{ path: '/home/confirmOrder/:shop_id', component: ConfirmOrder, name: 'confirmorder'}
	],
	linkActiveClass: 'mui-active'  //覆盖默认的路由高亮的类，默认的类叫做router-link-active
})

// 把路由对象暴露出去
export default router