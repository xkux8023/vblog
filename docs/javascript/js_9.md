### 面试题盲猜

#### 盒模型

`box-sizing` 有两个值: `content-box` (W3C标准盒模型), `border-box` (怪异模型)

```html
  <style>
    .test {
      box-sizing: content-box;
      border: 5px solid #f00;
      padding:5px;
      width: 100px;
      height: 100px;
    }

  </style>
  <div class="test"></div>
<!--
content-box的计算公式会把宽高的定义指向 content, 而 border和 padding 另外计算,
也就是说 content + padding + border = 120px(盒子实际大小)

而border-box的计算公式是总的大小涵盖这三者, content 会缩小,来让给另外两者
content(80px) + padding(5*2px) + border(5*2px) = 100px
-->

```

#### css 选择器有哪些？ 哪些属性可以继承？

css 选择符：id 选择器，class 类选择器， 标签选择器， 相邻选择器， 子选择器， 通配符选择器， 属性选择器， 伪类选择器

可继承的属性：font-size, color, font-family
不可继承的样式： border, padding, margin, width, height
优先级（就近原则）： !important > [id > class > tag]
!important 比内联优先级高




#### javascript 的原型 与 闭包

每个 JavaScript 对象都有 `__proto__` 属性，这个属性指向了原型；
原型链就是多个对象通过 `__proto__` 的方式连接了起来

- `Object` 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
- `Function` 是所有函数的爸爸， 所有函数都可以通过 `__proto__` 找到它
- 函数的 `prototype` 是一个对象
- 对象的的 `__proto__` 属性指向原型， `__proto__` 将对象和原型连接起来组成了原型链


闭包的定义：函数 A 内部有一个函数 B，函数 B 可以访问函数 A 中的变量，那么函数 B 就是闭包
在 JavaScript 中， 闭包存在的意义就是让我们可以间接访问函数内部的变量

```js
function A() {
  let a = 1
  window.B = function() {
    console.log(a)
  }
}
A()
B()     // 1
```


#### 原型如何实现继承？ Class 如何实现继承？ Class 的本质是什么？

class 只是语法糖，本质上还是函数
``` js{4}
class Person {}
Person instanceof Function
```
- Class 继承
- 组合继承
- 寄生组合继承
```js
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child, // 这一步是关键，将构造函数设置为 Child，这样既解决了无用的父类属性问题，还能正确找到子类的构造函数
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue(1)           // 1
child instanceof Parent     // true
```


#### map, filter, reduce 的作用与区别 ？

- map 生成一个新的数组，遍历原数组，将每个元素出来做一些变换然后放入到新数组中

 `['1','2','3'].map(parseInt)` 输出什么,为什么?

```js
/*
* map 有三个参数：数组元素，元素的索引，原数组本身
* parseInt 有两个参数： 元素本身，以及 进制
* ['1','2','3'].map(parseInt) 等价于如下：
*/

['1','2','3'].map((item, index, array) => {
  return parseInt(item, index)
})
// parseInt('1', 0)    => 1
// parseInt('2', 1)    => NaN
// parseInt('3', 2)    => NaN
```

- filter 也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组
```js
let array = [1,2,4,6]
let newArray = array.filter(item => item != 6)
console.log(newArray)   // [1,2,4]
```

> reduce 接受两个参数：回调函数 与 初始值

```js
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum) // 6
```

> Event Loop 执行顺序

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 开始下一轮 Event Loop，执行宏任务中的异步代码，如 setTimeout 中的回调函数

