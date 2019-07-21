### vue-router 的简单实现


#### 1.hash 路由

hash 路由 主要是通过监听 url 中的 hash 变化来进行路由跳转.


- 1.1 初始化 class
```js{4}
class Router {
  constructor () {
    this.routes = {}        // 以键值对的形式储存路由
    this.currentUrl = ''    // 当前路由的URL
  }
}
```
- 1.2 实现路由hash储存与执行

1. 将路由的 hash 以及对应的 callback 函数储存
2. 触发路由 hash 变化后,执行对应的 callback 函数

```js{4}
class Router {
  constructor () {
    this.routes = {}
    this.currentUrl = ''
  }
  // 将path路径与对应的callback函数储存
  route (path, callback) {
    this.routes[path] = callback || function () {}
  }

  // 刷新
  refresh () {
    // 获取当前URL中的hash路径
    this.currentUrl = location.hash.slice(1) || '/'
    // 执行当前hash路径的callback函数
    this.routes[this.currentUrl]()
  }
}
```

- 1.3 实现路由hash储存与执行

在实例化 Class 的时候监听上面的事件

```js{4}
class Router {
  constructor () {
    this.routes = {}
    this.currentUrl = ''
    this.refresh = this.fresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route (path, callback) {
    this.routes[path] = callback || function () {}
  }


  refresh () {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}
```

- 1.4 实现后退功能

用数组 history 来储存过往的hash路由
用指针 currentIndex 来随着后退和前进功能移动来指向不同的hash路由


```js{4}
class Router {
  constructor () {
    this.routes = {}
    this.currentUrl = ''

    // 默认不是后退操作
    this.isBack = false

    this.history = []     // 记录出现过的hash
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1
    this.backOff = this.backOff.bind(this)

    this.refresh = this.fresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route (path, callback) {
    this.routes[path] = callback || function () {}
  }

  refresh () {
    this.currentUrl = location.hash.slice(1) || '/'
    if (!this.isBack) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1)
        this.history = this.history.slice(0, this.currentIndex + 1)
      this.history.push(this.currentUrl)
      this.currentIndex++
    }
    this.routes[this.currentUrl]()
    console.log('指针:', this.currentIndex, 'history:', this.history)
    this.isBack = false
  }

  // 后退功能
  backOff () {
    this.isBack = true  // 后退操作设置为true

    // 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1)

    // 随着后退, location.hash 也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]()
  }
}
```
