### LinkedList

```js

function defaultEquals(a, b) {
    return a === b
}

class Node {
    constructor (element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor (equalsFn = defaultEquals) {
        this.count = 0
        this.head = null
        this.equalsFn = equalsFn
    }

    push (element) {
        const node = new Node(element)
        let current
        if (this.head == null) {
            this.head = node

        } else {
            current = this.head
            while (current.next != null) {
                // 遍历到最后一项
                current = current.next
            }
            current.next = node
        }
        this.count++
    }
    insert (element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            if (index == 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                const previous = this.getElementAt(index-1)
                const current = previous.next
                node.next = current
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    getElementAt (index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            for (let i = 0; i < index && current != null; i++) {
                current = current.next
            }
            return current
        } else {
            return undefined
        }
    }
    remove (element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }
    removeAt (index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                let previous
                for (let i = 0; i < index; i++) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
    indexOf (element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    isEmpty () {
        return this.size() === 0
    }
    size () {
        return this.count
    }
    getHead () {
        return this.head
    }
    toString () {
        if (this.head == null) {
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString}, ${current.element}`
            current = current.next

        }
        return objString
    }
}
```

### 双向链表: DoublyLinkedList

```js
function defaultEquals(a, b) {
    return a === b
}

class Node {
    constructor (element) {
        this.element = element
        this.next = null
        this.prev = null
    }
}
class DoublyLinkedList {
    constructor (equalsFn = defaultEquals) {
        this.count = 0
        this.head = null
        this.tail = null
        this.equalsFn = equalsFn
    }

    push (element) {
        const node = new Node(element)
        let current
        if (this.head == null) {
            this.head = node
            this.tail = node
        } else {
            current = this.head
            while (current.next != null) {
                // 遍历到最后一项
                current = current.next
            }
            current.next = node
            this.tail = node
            node.prev = current
        }
        this.count++
    }
    insert (element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    this.head = node
                    current.prev = node
                }
            } else if (index === this.count) {
                current = this.tail
                current.next = node
                this.tail = node
                node.prev = current
            } else {
                const previous = this.getElementAt(index-1)
                const current = previous.next
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }
            this.count++
            return true
        }
        return false
    }
    getElementAt (index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            for (let i = 0; i < index && current != null; i++) {
                current = current.next
            }
            return current
        } else {
            return undefined
        }
    }
    remove (element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }
    removeAt (index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
                if (this.count === 1) {
                  this.tail = null
                } else {
                  this.head.prev = null
                }
            } else if (index === this.count - 1) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = null
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.element
        }
        return undefined
    }
    indexOf (element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    isEmpty () {
        return this.size() === 0
    }
    size () {
        return this.count
    }
    getHead () {
        return this.head
    }
    toString () {
        if (this.head == null) {
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString}, ${current.element}`
            current = current.next

        }
        return objString
    }
}
```
### StackLinkedList
```js
class StackLinkedList extends DoublyLinkedList {
  constructor () {
    this.items = new DoublyLinkedList()
  }
  push (element) {
    this.items.push(element)
  }
  pop () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.removeAt(this.size() - 1)
  }
  peek () {
    if (this.isEmpty) {
      return undefined
    }
    return this.items.getElementAt(this.size()-1).element
  }
  isEmpty () {
    return this.items.isEmpty()
  }
  size () {
    return this.items.size()
  }
  clear () {
    this.items.clear()
  }
  toString () {
    return this.items.toString()
  }
}
```

### 循环链表: CircularLinkedList
```js
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
  }
  push (element) {
    const node = new Node(element)
    let current
    if (this.head == null) {
        this.head = node
    } else {
        current = this.getElementAt(this.size() - 1)
        current.next = node
    }
    node.next = this.head
    this.count++
  }
  insert (element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      let current = this.head
      if (index === 0) {
        if (this.head == null) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.size())
          this.head = node
          current.next = this.head
        }
      } else {
        const previous = this.getElementAt(index-1)
        node.next = previous.next
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  removeAt (index) {
      if (index >= 0 && index <= this.count) {
          let current = this.head
          if (index === 0) {
              if (this.size() === 0) {
                  this.head = null
              } else {
                  const removed = this.head
                  current = this.getElementAt(this.size())
                  this.head = this.head.next
                  current.next = this.head
                  current = removed
              }
          } else {
              const previous = this.getElementAt(index-1)
              current = previous.next
              previous.next = current.next
          }
          this.count--
          return current.element
      }
      return undefined
  }
}
```
