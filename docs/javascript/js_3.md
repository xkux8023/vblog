### Promise


#### 1. `Promise` 的声明

``` js{4}
class Promise {
  constructor (executor) {          // 构造器
    let resolve = () => {}          // 成功
    let reject = () => {}           // 失败
    executor(resolve, reject)       // 立即执行
  }
}
```


#### 2. `Promise` 的基本状态

- `Promise`存在三个状态：`pending、fulfilled、rejected`, 初始状态为 `pending`
- 成功则 `resolve(value)`, 将状态变为 `fulfilled`
- 失败则 `reject(reason)`, 将状态变为 `rejected`
- 若是`executor`函数报错, 直接执行 `reject()`

```js{4}
class Promise {
  constructor (executor) {          // 构造器
    this.state = 'pending'          // 初始状态为等待状态
    this.value = undefined          // 成功的值
    this.reason = undefined         // 失败的原因
    let resolve = value => {        // 成功
      if (this.state === 'pending') {      // state改变,resolve调用就会失败
        this.state = 'fulfilled'            // resolve调用后，state转化为成功态
        this.value = value                  // 储存成功的值
      }
    }
    let reject = reason => {                // 失败
      if (this.state === 'pending') {       // state改变,reject调用就会失败
        this.state = 'rejected'             // reject调用后，state转化为失败态
        this.reason = reason                // 储存失败的原因
      }
    }
    try {
      executor(resolve, reject)       // 立即执行
    } catch (err) {
      reject(err)
    }
  }
}
```

#### 3. `.then()` 方法

- `.then(onFulfilled, onRejected)`方法两个参数：`onFulfilled`, `onRejected`
- 当状态`state`为`fulfilled`，则执行`onFulfilled`，传入`this.value`
- 当状态`state`为`rejected`，则执行`onRejected`，传入`this.reason`

```js{4}
class Promise {
  constructor (executor) {...}

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') onFulfilled(this.value)
    if (this.state === 'rejected') onFulfilled(this.reason)
  }
}
```

#### 4. 异步的实现

类似于发布订阅，先将 `then` 里的函数存到一个数组中,如下多个`then`的情况：

```js{4}
let p = new Promise()
p.then()
p.then()
```
成功或者失败时，`forEach` 调用它们：
```js{4}
class Promise {
  constructor (executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []        // 成功存放的数组
    this.onRejectedCallbacks = []        // 失败存放法数组

    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach( fn => fn() )
      }
    }

    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.reason = reason
        // 一旦reject执行，调用失败数组的函数
        this.onResolvedCallbacks.forEach( fn => fn() )
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then (onFulfilled, onRejected) {
    if (this.state === 'fulfilled') onFulfilled(this.value)
    if (this.state === 'rejected') onFulfilled(this.reason)

    // 当状态state为pending时
    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => onFulfilled(this.value))
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => onRejected(this.reason))
    }
  }
}
```

#### 5. 解决链式调用： `new Promise().then().then()`

1、为了达成链式，默认在第一个 `then` 里返回一个新的`promise`,成为`promise2`:

```js{4}
promise2 = new Promise((resolve, reject)=>{})
```
- 将这个promise2返回的值传递到下一个then中
- 如果返回一个普通的值，则将普通的值传递给下一个then中

2、当我们在第一个`then`中`return`了一个参数（参数未知，需判断）。这个`return`出来的新的`promise`就是`onFulfilled()`或`onRejected()`的值

3、`onFulfilled()`或`onRejected()`的值，即第一个`then`返回的值，叫做x，判断x的函数叫做`resolvePromise`:

- 如果是`promise`，则取它的结果，作为新的`promise2`成功的结果
- 如果是普通值，直接作为`promise2`成功的结果
- `resolvePromise`的参数有`promise2`（默认返回的`promise`）、`x`（我们自己`return`的对象）、`resolve`、`reject`
- `resolve`和`reject`是promise2的



```js{4}
class Promise {
  constructor (executor) {...}

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value)
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason)
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'pending') {
        this.onResolveeCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onResolveeCallbacks.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    return promise2
  }
}
```

#### 6. 完成`resolvePromise`函数

```js{4}
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    // 此时造成循环引用报错， 走 reject
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  // 防止多次调用的标记
  let called

  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then
      // 如果then是函数，就默认是promise了
      // 就让then执行 第一个参数是this,   后面是成功的回调 和 失败的回调
      if (typeof then === 'function') {
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return
          called = true
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          // 成功和失败只能调用一个
          if (called) return
          called = true
          reject(err)    // 失败了就失败了
        })
      } else {
        resolve(x)   // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return
      called = true
      // 取then出错了那就不要在继续执行了
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```



#### 7. 解决其他问题

1、`onFulfilled,onRejected`都是可选参数，如果他们不是函数，必须被忽略：
- `onFulfilled`返回一个普通的值，成功时直接等于 `value => value`
- `onRejected`返回一个普通的值，失败时如果直接等于 `value => value`，则会跑到下一个`then`中的`onFulfilled`中，所以直接扔出一个错误`reason => throw err`

2、`onFulfilled`或`onRejected`不能同步被调用，必须异步调用。我们就用`setTimeout`解决异步问题
- `onFulfilled`或`onRejected`报错，则直接返回`reject()`



```js{4}
class Promise {
  constructor (executor) {...}

  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    // 返回promise，完成链式
    return promise2
  }
}

```

### `Promise`完整代码


```js{4}
class Promise{
  constructor(executor){
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
    try{
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch(fn){
    return this.then(null,fn)
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  let called
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if(called)return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          if(called)return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if(called)return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
//resolve方法
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  })
}
//reject方法
Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  })
}
//race方法
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0i<promises.lengthi++){
      promises[i].then(resolve,reject)
    }
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
  let arr = []
  let i = 0
  function processData(index,data){
    arr[index] = data
    i++
    if(i == promises.length){
      resolve(arr)
    }
  }
  return new Promise((resolve,reject)=>{
    for(let i=0i<promises.lengthi++){
      promises[i].then(data=>{
        processData(i,data)
      },reject)
    }
  })
}

```