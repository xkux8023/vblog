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

#### instanceof 的原理是什么？

- 首先获取 “类型“ 的原型
- 然后获取 ”对象“ 的原型
- 然后一直循环判断 ”对象“ 的原型是否等于 ”类型“ 的原型，直到 ”对象“ 的原型为 null，因为原型链最终为null
```js
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while(true) {
    if (left === null || left === undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}
```

#### new 的原理是什么？
- 新生成一个对象
- 链接到原型
- 绑定this
- 返回新对象

```js
function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```
