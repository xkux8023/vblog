### 击鼓传花

```js
function hotPotato(elementsList, num) {
    const queue = new queue()
    const elimitatedList = []

    for (let i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i])
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        elimitated: elimitatedList,
        winner: queue.dequeue()
    }
}
```
