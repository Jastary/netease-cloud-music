import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// //常规使用组件的方法，需要先注册然后在使用:用常规方法使用组件时，每次使用组价都要调用一次app.use()方法
//解决：可以自定义一个插件，用来遍历引入的组件并且循环调用app.use()方法
// // 1.按需引入组件
// import { Button } from 'vant'
// // 2. 引入组件样式
// import 'vant/lib/index.css';


//引入自定义的插件
import getVants from './plugins'

const app = createApp(App)
app.use(store)
app.use(router).mount('#app')

//使用插件循环调用app.use()方法
getVants(app)

// // 3.使用组件
// app.use(Button)
