### 进制转换

将十进制转换成2~36的任意进制
```js
function baseConverter(decNumber, base) {
    const remStack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = decNumber  // 缓存一个副本
    let rem
    let baseString = ''

    if (!(base >= 2 && base <= 36)) {
        return ''
    }

    while (number > 0) {
        rem = Math.floor(number % base)
        rem.push(rem)
        number = Math.floor(number / base)
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]
    }

    return baseString
}
```
