### 请求并发控制器

如题：实现一个并发请求控制函数，可以批量请求数据，并通过一个参数控制请求的并发度，所有请求结束后，调用 callback 回调函数。

```js
var urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var limit = 5

function requestController (urls, limit, callback) {
  let asyncList = []
  const _request = (urls) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 每次弹出一个请求链接
        const url = urls.shift()
        if (url) {
          console.lg(`当前发送：${url}`)
          resolve(url)
        }
      }, 100)
    }).finally(() => {
      //此处与 limit 相辅相成，每个定时器完成后，到这里又接着启动
      if (urls.length > 0) {
        return _request(urls)
      }
    })
  }
  while (limit--) {
    //此处是关键：通过 limit 来控制一次性启动多少个定时器
    asyncList.push(_request(urls))
  }
  return Promise.all(asyncList).then(callback)
}

requestController(urls, limit, () => {
  console.log(`请求已全部完成！`)
})
```
