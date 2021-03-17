### Queue

```js
class Queue {
    constructor () {
        this.count = 0
        this.lowestCount = 0  // 队首的指针维护
        this.items = {}
    }
    // 入队
    enqueue (element) {
        this.items[this.count] = element
        this.count++
    }
    // 出队
    dequeue () {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }
    peek () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }
    isEmpty () {
        return this.count - this.lowestCount === 0
    }
    size () {
        return this.count - this.lowestCount
    }
    clear () {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount+1; i < this.count; i++) {
            objString += `,${this.items[i]}`
        }
        return objString
    }
}
```
### 双端队列 Deque
```js
class Deque {
    constructor () {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }
    // 队首入队
    addFront (element) {
        if (this.isEmpty) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else {
            for (let i = this.count; i > 0; i--) {
               this.items[i] = this.items[i-1]
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }
    // 队尾入队
    addBack (element) {
        this.items[this.count] = element
        this.count++
    }
    // 队首出队
    removeFront () {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }
    // 队尾出队
    removeBack () {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.count-1]
        delete this.items[this.count-1]
        this.count--
        return result
    }
    peek () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }
    isEmpty () {
        return this.count - this.lowestCount === 0
    }
    size () {
        return this.count - this.lowestCount
    }
    clear () {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount+1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}
```
