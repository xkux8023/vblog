### vuex 状态管理的工作原理


`Vue.use` 的方法来安装插件，内部会调用插件自身提供的 `install` 方法：
```js
Vue.use(Vuex)
```
`Vuex`插件提供的 `install` 方法如下：
```js
let Vue
export default install(_Vue) {
  // 用 Vue.mixin 方法将 vuexInit 方法混进 beforeCreate 钩子中
  Vue.mixin({ beforeCreate: vueInit })

  // 并用 Vue 保存 Vue 对象。
  Vue = _Vue
}
```
在使用 `Vuex` 的时候，需要将 `store` 传入到 `Vue` 实力中去
```js
new Vue({
  el: '#app',
  store       // 将 store 放入 Vue 创建时的 option  中
})
```
vuexInit 的实现：
```js
// 通过这步的操作， 可以在任意的一个 vm 中通过 this.$store 来访问 Store 的实例
function vuexInit () {
  const options = this.$options
  if (options.store) {
    //  如果是 根节点
    this.$store = option.store
  } else {
    // 如果非 根节点
    this.$store = options.parent.$store
  }
}
```
在 Store 的构造函数中对 state 数据进行【响应式化】
```js
constructor () {
  this._vm = new Vue({
    data: {
      $$state: this.state
    }
  })
}
```

commit 方法： 用来触发 mutation
```js
commit (type, payload, _options) {
  // 从 _mutations 中取出对应的 mutation，循环执行其中的某一个 mutation
  const entry = this._mutations[type]
  entry.forEach(function commitIterator (handler) {
    handler(payload)
  })
}
```

dispatch 方法： 用来触发 action, 可以包含异步状态
```js
dispatch (type, payload) {
  // 从 _actions 中取出对应的 action, 将其执行，如有多个则用 Promise.all 进行包装
  const entry = this._actions[type]
  return entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload)
}
```
