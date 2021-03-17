### stack

#### 基于数组的 Stack
```js
class Stack {
    constructor () {
        this.items = []
    }

    push (element) {
        this.items.push(element)
    }
    pop () {
        this.items.pop()
    }
    peek () {
        return this.items[this.items.length-1]
    }
    isEmpty () {
        this.items.length === 0
    }
    clear () {
        this.items = []
    }
    size () {
        return this.items.length
    }
}
```

#### 基于对象的 Stack

```js
class Stack {
    constructor () {
        this.count = 0
        this.items = {}
    }
    push (element) {
        this.count++
        this.items[this.count] = element
    }
    pop () {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
    peek () {
        if (this.isEmpty) {
            return undefined
        }
        return this.items[this.count-1]
    }
    isEmpty () {
        return this.count === 0
    }
    clear () {
        this.count = 0
        this.items = {}
    }
    size () {
        return this.count
    }

    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            objString += `,${this.items[i]}`
        }
        return objString
    }
}
```
