
# 外卖订餐

## 测试

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式

## 改造美食路由链接

## 美食页面制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 axios 获取数据
3. 渲染真实数据

## 实现美食列表，点击跳转到响应的美食店详情
1. 把列表中的每一项改造为 router-link，同时在跳转的时候应该提供唯一的id标识符
2. 创建美食店详情的组件页面 FoodInfo.vue
3. 在路由模块中，将美食点详情的路由地址和组件页面对应起来

## 实现美食详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的comment.vue 组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用`components`属性，将导入的comment组件注册为自己的子组件
4. 将注册子组件时候的注册名称，以标签形式在页面中引入

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用this.getComments()方法，重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，应该让老数据调用数组的concat方法，让老数据拼接上新数据

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空则Toast提示用户评论内容不能为空
4. 通过axios发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，重新刷新列表以查看最新的评论
 + 如果调用getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 应该当评论成功后，在客户端手动拼接一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到data中comments的开头，这样就能实现刷新评论列表的需求

## 改造速食简餐按钮为路由链接，并显示对应的组件页面

## 绘制速食简餐列表组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的速食简餐列表
### 制作顶部滑动条的坑：
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档发现这是一个JS组件，需要被初始化一下
 + 导入mui.js
 + 调用官方提供的方式去初始化
 ```
 mui('.mui-scroll-wrapper').scroll({
     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
 });
 ```
4. 我们在初始化滑动条的时候，导入mui.js，控制台报错：mui.min.js:1705 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
 + 经过合理的推测，可能是mui.js中用到了 'caller', 'callee', and 'arguments'，但是webpack打包好的bundle.js 中，默认是启用严格模式的，所以，这两者冲突了
 + 解决方案：
    1. 把mui.js中的非严格模式的代码改掉（这种不现实）
    2. 把webpack 打包时候的严格模式禁用掉
 + 选择第二种方案，移除严格模式，使用插件babel-plugin-transform-remove-strict-mode，https://www.npmjs.com/package/babel-plugin-transform-remove-strict-mode
 + npm install babel-plugin-transform-remove-strict-mode -D
 + .babelrc配置
```
{ "plugins": ["transform-remove-strict-mode"] }
```
但是这个插件不能与 @babel/plugin-transform-runtime 一起使用，否则不起作用
5. 滑动滚动条，报警告[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive
    + 这是谷歌浏览器自带的效果 ，解决方案https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action
```
* {
    touch-action:pan-y;
}
```
6. 刚进入页面顶部滑动条不能滑动，刷新一下才能滑动不能切换了
    + 经过分析，如果要初始化滑动条，必须要等 DOM 元素加载完毕，所以，我们把初始化滑动条放到了 `mounted`生命周期函数中
    + 当组件中的 DOM 结构被渲染后并放到页面中后，会执行这个钩子函数
    + 如果要操作元素，最好在 mounted 里面，因为这时候的 DOM元素是最新的
7. 当滑动条调试ok后，tabbar无法正常工作了，这时候，我们需要把每个 tabbar 按钮的样式中 `nui-tab-item` 重新改一下名字，因为滚动条引入的min.js文件中的内容和
`nui-tab-item`的名字重复了，导致无法正常工作
8. 获取所有分类，并渲染分类列表

## 制作品牌图片列表区域（实现如偏列表的懒加载改造和样式美化）
1. 品牌图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件`lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染品牌图片列表数据

## 实现点击图片跳转到品牌介绍页面
1. 在改在 li 为router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现品牌介绍页面的布局和美化，同时获取数据渲染页面

## 实现品牌介绍中缩略图的功能
1. 使用 `vue-preview`  这个缩略图插件
2. 注意： 每个图片数据对象中必须有 w 和 h 属性

## 尝试在手机上去进行项目的预览和测试
1. 保证手机可以正常运行
2. 保证手机和开发项目的电脑处于同一个 WIFI 环境中，也就是说手机可以访问到电脑的IP
3. 打开自己的项目中 package.json文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的主机的 WIFI 的IP 地址设置为 --host 指令值
 - 如何查看自己电脑所处WIFI 的 IP，在 cmd 中运行`ipconfig`，查看无线网的IP地址
