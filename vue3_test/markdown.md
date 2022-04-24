## vite

- 开发环境无需打包，可快速冷启动
- 按需编译
- 轻量热重载

## 分析工程结构

- vue3 中的模板结构可以没有跟标签
- main.js

```js
//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
//挂载
app.mount('#app')
```

## setup (新的配置项，值为函数)

- 数据，方法等均需要配置在 setup 中
- 若返回一个对象，则对象中的属性、方法可以直接在模板中使用
- setup 不能是一个 async 函数

## ref

``` js
import {ref} from 'vue'
export default {
    setup(){
        let name = ref('张三');     // name 为引用对象（RefImpl） get/set
        let job = ref({             // job 为 RefImpl， type\salary 为 Proxy
            type:'前端工程师',
            salary:'30K'
        })
        changeInfo(){
            name.value = '李四'
            job.value.salary = '60k'
        }
        return {
            name,
            changeName,
        }
    }
}
 ```
