### 回文检查
双端队列解法
```js
function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aSting.length === 0)) {
        return false
    }

    const deque = new Deque()
    const lowerString = aString.toLocaleLowerCase().split(' ').join('')
    let isEqual = true
    let firstChar, lastChar
    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i))
    }
    while (deque.size() > 1 && isEquel) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()
        if (firstChar !== lastChar) {
            isEquel = false
        }
    }
    return isEquel
}


console.log('a', palindromeChecker('a'))            // true
console.log('aa', palindromeChecker('aa'))          // true
console.log('kayak', palindromeChecker('kayak'))    // true
console.log('level', palindromeChecker('level'))    // true
console.log('levell', palindromeChecker('levell'))  // false
```
