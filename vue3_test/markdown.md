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

## ref,定义响应式数据

- js 中操作数据 : xxx.value
- 模板中读取数据不需要 .value, 直接 {{ xxx }}
- 可传入基本类型和对象类型，基本数据类型依然依靠 `Object.defineProperty` 的 `getter/setter`，对象数据类型需要 `reactive`

``` js
import { ref } from 'vue'
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

## reactive,定义对象类型的响应式数据

- `const 代理对象 = reactive(源对象)`,接受对象（或数组），返回代理对象(Proxy 对象)

```js
import { reactive } from 'vue'
let job = reactive({
    type:'aaa',
    salary:'30'
})
let hobby = reactive(['aaa','bbb','ccc'])
changeInfo(){
    job.salary = '60'
    hobby[0] = 'AAA'
}
```

## 响应式原理

### Vue2.x

- 对象类型，通过 `Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）
- 数组类型，通过重写数组的一系列方法来实现的，(1.正常调用数组方法，2.更新界面)

存在问题：

- 新增、删除属性，界面不会更新,解决新增 `this.$set({ this.obj, 'name', 'aaa'})`，解决删除 `this.$delete({ this.obj, 'age' })` 或 Vue.set/Vue.delete
- 通过下标修改数组元素，界面不会更新 `this.$set({ this.arr, 0, 'newVal'})` 或者 `this.arr.splice(0,1,'newVal')`

### Vue3.x

#### Proxy

- 通过 Proxy(代理): 拦截对象中任意属性的变化，包括读写、添加、删除
- 通过 Reflect(映射): 对源对象的属性进行操作

```js
// Reflect(反射) 操作会返回 true/false (减少代码的 try/catch)
let person = {
  name:'张三',
  age:18
}
const p = new Proxy(person,{
  //读取p的某个属性时调用
  get(target,propName){
    console.log(`有人读取了p身上的${propName}属性`)
    return Reflect.get(target,propName)
  },
  //修改p的某个属性、或给p新增属性时调用
  set(target,propName,value){
    console.log(`有人修改了p身上的${propName}属性，Vue 去更新界面`)
    Reflect.set(target,propName,value)
  },
  //删除p的某个属性时调用
  deleteProperty(target,propName){
    console.log(`有人删除了p身上的${propName}属性，Vue 去更新界面了`)
    return Reflect.deleteProperty(target,propName)
  }
})
```

#### reactive 和 ref 对比

-
