//源数据
let person = {
  name:'张三',
  age:18
}

//模拟Vue2中实现响应式
/* let p = {
  name:'张三',
  age:18
}
Object.defineProperty(p,'name',{
  configurable:true,
  get(){ //有人读取name时调用
    return person.name
  },
  set(value){ //有人修改name时调用
    console.log('有人修改了name属性，我发现了，我要去更新界面！')
    person.name = value
  }
})
Object.defineProperty(p,'age',{
  get(){ //有人读取age时调用
    return person.age
  },
  set(value){ //有人修改age时调用
    console.log('有人修改了age属性，我发现了，我要去更新界面！')
    person.age = value
  }
}) */


//模拟Vue3中实现响应式
//#region
const p = new Proxy(person,{
  //有人读取p的某个属性时调用
  get(target,propName){
    console.log(`有人读取了p身上的${propName}属性`)
    return Reflect.get(target,propName)
  },
  //有人修改p的某个属性、或给p追加某个属性时调用
  set(target,propName,value){
    console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`)
    Reflect.set(target,propName,value)
  },
  //有人删除p的某个属性时调用
  deleteProperty(target,propName){
    console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
    return Reflect.deleteProperty(target,propName)
  }
})
//#endregion

let obj = {a:1,b:2}
//通过Object.defineProperty去操作
//#region
/* try {
  Object.defineProperty(obj,'c',{
    get(){
      return 3
    }
  })
  Object.defineProperty(obj,'c',{
    get(){
      return 4
    }
  })
} catch (error) {
  console.log(error)
} */
//#endregion

//通过Reflect.defineProperty去操作
//#region
/* const x1 = Reflect.defineProperty(obj,'c',{
  get(){
    return 3
  }
})
console.log(x1)

const x2 = Reflect.defineProperty(obj,'c',{
  get(){
    return 4
  }
})
if(x2){
  console.log('某某某操作成功了！')
}else{
  console.log('某某某操作失败了！')
} */
//#endregion

// console.log('@@@')
