### 深浅拷贝

#### 浅拷贝:

Object.assign 会拷贝所有的属性值到新的对象中，但属性值是对象的话，拷贝的是地址，并不是深拷贝。

```js{4}
let a = { age: 1 }
let b = Object.assing({}, a)
a.age = 2
console.log(b.age)      // 1
```

还可以通过ES6的展开运算符 ... 来实现浅拷贝

```js{4}
let a = { age: 1 }
let b = { ...a }
a.age = 2
console.log(b.age)      // 1
```
#### 深拷贝: 推荐使用 lodash 的深拷贝函数。

```js{4}
function deepClone(obj) {
  funtion isObject(o) {
    return (typeof o === 'function || typeof o === 'object') && o !== null
  }
  if (!isObject(obj)) throw new Error('非对象')

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : {...obj}
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}


// test
let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```



