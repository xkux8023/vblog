### 属性描述符

从 ES5 开始，所有的属性都具备了属性描述符

``` js{4}
var myObject = { a: 2 }
Object.getOwnPropertyDescriptor(myObject, "a")

/**
*{value: 2, writable: true, enumerable: true, configurable: true}
*/
```
::: tip
特性： writable（可写）、 enumerable（可枚举） 和 configurable（可配置）。
:::


`Object.defineProperty(..)` 添加一个新属性或者修改一个已有属性（如果它是configurable）。

``` js{4}
var myObject = {}

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: true,
  enumerable: true,
  configurable: true
})

console.log(myObject.a) // 2
```

writable 决定是否可以修改属性的值。

``` js{4}
"use strict"
var myObject = {}

Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false,    // not writable (不可写)
  enumerable: true,
  configurable: true
})

myObject.a = 3 // TypeError
```

configurable 为 true，则可以使用 defineProperty(..) 方法来修改属性描述符：
``` js{4}
var myObject = { a: 2}
myObject.a = 3
console.log(myObject.a)     // 3

Object.defineProperty(myObject, "a", {
  value: 4,
  writable: true,
  enumerable: true,
  configurable: false  // 不可写配置
})

console.log(myObject.a)     // 4
myObject.a = 5
console.log(myObject.a)     // 5

Object.defineProperty(myObject, "a", {
  value: 4,
  writable: true,
  enumerable: true,
  configurable: true  // TypeError, configurable：false 不可逆
})

delete myObject.a
console.log(myObject.a)     // 5, configurable：false 时候，无法删除
```
::: danger
把 configurable 修改成false是单向操作，无法撤销！
:::


##### 1.对象常量

结合 `writable: false` 和 `configurable: false` 就可以创建一个真正的常量属性（不可修改、重定义或者删除）：

``` js{4}
var myObject = { a: 2}
Object.defineProperty(myObject, "FAVOURITE_NUMBER", {
  value: 24,
  writable: false,        // 不可写
  configurable: false     // 不可配置
})
```

##### 2.禁止扩展
禁止一个对象添加新属性并且保留已有属性，可以使用： Object.preventExtensions(..)

``` js{4}
var myObject = { a: 2}
Object.preventExtensions(myObject)

myObject.b = 3
console.log(myObject.b) // undefined

```

##### 3.密封： `Object.seal(..)`
##### 4.冻结： `Object.freeze(..)`
##### 5.枚举： `enumerable`
``` js{4}
var myObject = {}

Object.defineProperty(myObject, "a", {value: 24, enumerable: true})
Object.defineProperty(myObject, "b", {value: 3, enumerable: false})

("b" in myObject);    // true
myObject.hasOwnProperty("b");   // true

for (var k in myObject) {
  console.log(k, myObject[k])
}
// "a" 24
// "b" 的枚举属性 enumerable 为 false，所以不会打印出来

myObject.propertyIsEnumerable("a"); // true
myObject.propertyIsEnumerable("b"); // false

Object.keys(myObject);    // ["a"]
Object.getOwnPropertyNames(myObject);    // ["a", "b"]
```


#### 存在性


以在不访问属性值的情况下判断对象中是否存在这个属性：
``` js{4}
var myObject = { a: 2}

("a" in myObject);  // true
("b" in myObject);  // false

myObject.hasOwnProperty("a");   // true
myObject.hasOwnProperty("b");   // false
```

- `in` 操作符会检查属性是否在对象及其 `[[Prototype]]`原型链中。
- `hasOwnProperty(..)` 只会检查属性是否在 `myObject` 对象中，不会检查 `[[Prototype]]` 链。
- `Object.create(null)` 创建的对象 `myObject`，则可以通过一种强硬手段来判断： `Object.prototype.hasOwnProperty.call(myObject,"a")`
- `for.. in` 循环可以用来遍历对象的可枚举属性列表（包括`[[Prototype]]`链）
- `propertyIsEnumerable(..)`会检查给定的属性名是否直接存在于对象中（而非原型链上），并且满足 `enumerable: true`
- `Object.keys(..)`查找当前对象中（而非原型链上）的可枚举属性，返回一个数组
- `Object.getOwnPropertyNames(..)`查找当前对象中（而非原型链上）的所有属性，返回一个数组





1. `forEach(..)` 会遍历数组中的所有值并忽略回调函数的返回值。
2. `every(..)` 会一直运行直到回调函数返回`false`（或者“假”值）。
3. `some(..)` 会一直运行直到回调函数返回`true`（或者“真”值）。


> 给普通对象定义迭代器 `@@iterator` 来获取对象的内部属性：

```js{4}
myObject = { a: 2, b: 3}
Object.defineProperty(myObject, Symbol.iterator, {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

// 手动遍历 myObject
var it = myObject[Symbol.iterator]()
it.next()     // { value: 2, done: false}
it.next()     // { value: 3, done: false}
it.next()     // { value: undefined, done: true}

// 用 for...of 遍历 myObject
for (var v of myObject) {
  console.log(v)
}
// 2
// 3
```

