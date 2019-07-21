### call 、 apply 、 bind 手写


#### call

```js{4}
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError')
  }
  context = context || window
  context.fn = this
  let args = [...arguments].slice(1)
  const result = context.fn(args)
  delete context.fn
  return result
}

```

- context 为可选参数，如果不传的话默认上下文为 window
- context 创建一个 fn 属性，将值设置为需要调用的函数
- 因为 call 可以传入多个参数作为调用函数的参数，所以需要将参数剥离开来
- 然后调用函数并将对象上的函数删除



#### apply

```js{4}
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

```



#### bind

```js{4}
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

```
