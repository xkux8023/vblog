### Decorator修饰器语法

#### descriptor:

- `configurable` 控制是不是能删、能修改descriptor本身;
- `writable` 控制是不是能修改值;
- `enumerable` 控制是不是能枚举出属性;
- `value` 控制对应的值，方法只是一个value是函数的属性;
- `get` 和 `set` 控制访问的读和写逻辑;

```js{4}
function log(target) {
  // 获取一个对象的所有自身属性的描述符
  const desc = Object.getOwnPropertyDescriptors(target.prototype)
  for (const key of Object.keys(desc)) {
    if (key === 'constructor') continue
    const func = desc[key].value
    if ('function' === typeof func) {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log('before: ' + key)
          const ret = func.apply(this, args)
          console.log('after: ' + key)
        }
      })
    }
  }
}

function readonly(target, key, descriptor) {
  descriptor.writable = false
}

function validate(target, key, descriptor) {
  const func = descriptor.value
  descriptor.value = function(...args) {
    for (let num of args) {
      if ('number' !== typeof num) {
        throw new Error(`"${num}" is not a number!`)
      }
    }
    return func.apply(this, args)
  }
}

@log
class Numberic {
  @readonly PI = 3.1415926

  @validate
  add (...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}

// new Numberic().add(1, 2)
// new Numberic().PI = 100
// new Numberic().add(1, 'X')

```
