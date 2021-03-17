### vue2.0 响应式原理

> 初始化以及挂载
- 在 `new Vue()` 之后， `Vue` 会调用 `_init()` 函数进行初始化（生命周期、事件、`props`、`data`、`computed`、`watch`）
- 最重要的就是通过 `Object.defineProperty 设置 setter 与 getter 函数`，用来实现[响应式]以及[依赖收集]
- 初始化之后调用 `$mount` 会挂载组件，如果是运行时编译，即不存在 `render function` 但是存在 `template` 的情况，需要进行[编译步骤]

> 编译

`compile` 编译可以分成 `parse`、`optimize` 、`generate`三个阶段，最终需要得到 `render function`

- `parse` 用正则等方式解析 `template` 模板中的 指令、`class`、`style` 等数据， 形成 `AST`
- `optimize` 主要作用是标记 `static` 静态节点, 后面当 `update` 更新界面时，会有一个 `patch` 的过程，`diff` 算法会直接跳过静态节点，减少比较的过程，优化了 `patch` 的性能
- `generate` 是将 `AST` 转化成 `render function` 字符串的过程，得到的结果是 `render` 的字符串以及 `staticRenderFns` 字符串

> 响应式

- 当 `render function` 被渲染的时候，因为会读取所需对象的值，所以会触发 `getter` 函数进行[依赖收集]，[依赖收集]的目的是将观察者 `Watcher` 对象存放到当前闭包中的订阅者 `Dep` 的 `subs`中。
- 在修改对象的值的时候，会触发对应的 `setter`, `setter` 通知之前[依赖收集]得到的 `Dep` 中的每一个 `Watcher`，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 `Watcher` 就会开始调用 `update` 跟新视图

### `Object.defineProperty`

```js
/*
*   obj: 目标对象
*   prop: 需要操作的目标对象的属性名
*   descriptor: 描述符
*   return value  传入对象
*/

Object.defineProperty(obj, prop, descriptor)
```
`descriptor` 的一些属性有如下：
- `enumerable`:     属性是否可枚举， 默认 `false`
- `configurable`:   属性是否可以被修改或者删除， 默认 `false`
- `get`:            获取属性的方法
- `set`:            设置属性的方法

```js
function cb(val) {
    console.log("视图更新啦~", val)
}

function observer(value) {
    if (!value || (typeof value !== 'object')) return
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    })
}
function defineReactive(obj, key, val) {
    // 一个 Dep 类对象
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // 将 Dep.target （即当前的 Watcher 对象存入 dep 的 subs 中）
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return
            // 在 set 的时候触发 dep 的 notify 来通知所有的 Watcher 对象更新视图
            dep.notify()
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data)
        // 新建一个 Watcher 观察者对象，这时候 Dep.target 会指向这个 Watcher 对象
        new Watcher()
        // 模拟 render 过程， 触发  test 属性的 get 函数
        console.log('render~', this._data.test)
    }
}

let o = new Vue({
    data: {
        test: "i am test"
    }
})
o._data.test = "hello, test"

let o = new Vue({
  data: {
    test: "i am test"
  }
})
o._data.test = "hello, test"
```

### 订阅者 Dep
订阅者 `Dep` 的主要作用是： 存放 `Watcher` 观察者对象

```js
class Dep {
  constructor () {
    this.subs = []        // 存放 `Watcher` 观察者对象的数组
  }
  addSub (sub) {
    this.subs.push(sub)   // 在 `subs`中添加一个 Watcher 对象
  }
  notify () {             // 通知所有的 Watcher 对象更新视图
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```

### 观察者 Watcher

```js
class Watcher {
  constructor () {
    Dep.target = this        // 在 new 一个 Watcher 对象时，将该对象赋值给 Dep.target, 在 get 中会用到
  }
  update () {
    console.log("视图更新啦")   // 更新视图的方法
  }

}
Dep.target = null
```


### 小结

【依赖收集】的前提条件有两个：
- 1. 触发 `get`  方法
- 2. 新建一个 `Watcher` 对象

这个在 `Vue` 的构造类中处理， 新建一个 `Watcher` 对象, 只需要 `new` 出来，这个 `Dep.target` 已经指向这个 `new` 出来的 `Watcher` 对象了。
