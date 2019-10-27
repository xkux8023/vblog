### vue3.0 响应式原理

原理： 发布订阅，在 get 中收集依赖（订阅），在 set 中派发更新（发布）；

- 1.) 2.0 默认会递归
- 2.) 数组改变 length 无效
- 3.) 对象不存在的属性不能被拦截

```js{4}
let toProxy = new WeakMap()     // 弱引用映射表，放置的是原对象：代理过的对象
let toRaw = new WeakMap()       // 被代理过的对象：原对象

// 判断是否是对象
function isObject(val) {
  return typeof val === 'object' && val !== null
}

// 对象是否具有某个属性
function hasOwn(target, key) {
  return target.hasOwnProperty(key)
}

// 响应式的核心方法
function reactive(target) {
  return createReactiveObject(target)
}

// 创建响应式对象
function createReactiveObject(target) {
  if (!isObject) return target            // 如果当前不是对象，直接返回即可
  let proxy = toProxy.get(target)
  if (proxy) return proxy                 // 如果已经代理过，就将代理过的结果返回即可
  if (toRaw.has(target)) return target    // 防止代理过的对象再次被代理

  let baseHandler = {
    get (target, key, receiver) {
      // proxy +  refelect 反射
      let result = Reflect.get(target, key, receiver)   // 等价于  let result = target[key]
      console.log('获取')
      // 收集依赖 订阅  把当前的 key 和 这个 effect 对应起来
      track(target, key)  // 如果目标上的 key 变化了，重新让数组中的 effect 执行即可
      return isObject(result) ? reactive(result) : result   // 此处按需递归
    },
    set (target, key, value, receiver) {
      // 识别是改属性 还是 新增属性
      let hadKey = hasOwn(target, key)
      let ordVal = target[key]
      let res = Reflect.set(target, key, value, receiver)

      if (!hadKey) {
        trigger(target, 'add', key)
        console.log('新增属性')
      } else if (ordVal !== value) {
        trigger(target, 'set', key)
        console.log('修改属性')
      }

      // 如果设置没成功，或者这个对象不可以被更改 writeable
      return res
    },
    deleteProperty (target, key) {
      let res = Reflect.deleteProperty(target, key)
      console.log('删除')
      return res
    }

  }
  let observed = new Proxy(target, baseHandler)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}

// 栈 先进后出 {name: [effect]}
let activeEffectStacks = []           // 栈型结果
let targetsMap = new WeakMap()
function track(target, key) {
  let effect = activeEffectStacks[activeEffectStacks.length - 1]  // 取栈顶的 effect
  if (effect) {   // 有对应关系 才创建关联
    let depsMap = targetsMap.get(target)
    if (!depsMap) {
      targetsMap.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, deps = new Set())
    }
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

function trigger(target, type, key) {
  let depsMap = targetsMap.get(target)
  if (depsMap) {
    let deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => {
        effect()
      })
    }
  }
}

// 响应式  副作用
function effect(fn) {
  // 把传入进来的函数 fn 变成响应式的函数
  let effect = createReactiveEffect(fn)
  effect() // 默认先执行一次
}

function createReactiveEffect(fn) {
  let effect = function() {             // 这个就是创建的响应式的 effect
    return run(effect, fn)              // 1.让 fn 执行， 2.把这个effect存入栈中
  }
  return effect
}

function run (effect, fn) {         // 运行 fn 并将 effect 存起来
  try {
    activeEffectStacks.push(effect)
    fn()  // 利用了  js 是单线程
  } finally {
    activeEffectStacks.pop()
  }
}

// 依赖收集 发布订阅
let obj = reactive({name: 'cy'})
effect(() => {          // effect 会执行两次，默认先执行一次，之后依赖的数据变化了，会再次执行
  console.log(obj.name) // 此处会调用 get  方法，出发收集依赖，也就是 订阅
})
obj.name = 'yong'
```

