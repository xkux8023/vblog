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