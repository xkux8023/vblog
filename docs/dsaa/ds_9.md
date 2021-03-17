### Set

```js
class Set {
  constructor () {
    this.items = {}
  }

  add (element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }
  delete (element) {
    if (!this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }
  has (element) {
    return element in items
  }
  clear () {
    this.items = {}
  }
  size () {
    return Object.keys(this.items).length
  }
  values () {
    return Object.values(this.items)
  }
  // 并集
  union (otherSet) {
    const unionSet = new Set()
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet
  }

  // 交集
  intersection (otherSet) {
    const intersectionSet = new Set()
    const values = this.values
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }
    return intersectionSet
  }

  // 差集
  difference (otherSet) {
    const differenceSet = new Set()
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  // 子集
  isSubsetOf (otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    }
    let isSubset = true
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false
        return false
      }
      return true
    })
    return isSubset
  }
}
```
