### getter-setter


``` js{4}
function convert(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": ${internalValue}`)
      },
      set (newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
      }
    })
  })
}
```

####  Proxy 写一个观察者模式的最简单实现

``` js{4}

<!-- 先定义了一个Set集合 -->
const queuedObservers  = new Set()

<!-- 所有观察者函数都放进这个集合 -->
const observe = fn => queuedObservers.add(fn)

<!-- Proxy 拦截操作 -->
const observable = obj => new Proxy(obj, {set})

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach(observer => observer())
  return result
}

const person = observable({
  name: 'chenyong',
  age: 20
})

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print)
person.name = '李四'
// 输出
// 李四, 20

```
