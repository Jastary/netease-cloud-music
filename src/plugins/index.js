//定义插件遍历调用app.use方法
import { def } from "@vue/shared";
import { Button, Swipe, SwipeItem, Popup, Progress } from "vant";

//将引入将来的组件存入数组中
let plugins = [
    Swipe, SwipeItem, Button, Popup, Progress
]

//定义并且暴露方法，循环调用app.use()
export default function getVants(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}