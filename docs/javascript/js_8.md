### 性能优化


#### 图片优化

- 减少像素点
- 减少每个像素点能够显示的颜色


#### 图片加载优化

- 不用图片，能用 css 去替代的就用 css 替代
- 对于移动端，可以计算屏幕宽度，然后去请求相应裁剪好的图片
- 小图使用 base64 格式
- 将多个图标文件整合到一张图片中（雪碧图）
- 选择正确的图片格式：

1. 对于支持 Webp 格式浏览器尽量使用 Webp 格式，因为该格式的数据压缩算法更优，能带来更小的体积和显示质量
2. 小图使用 PNG， 对于大部分图标类图片，完全可以用 SVG 替代
3. 照片使用 jpeg


#### DNS 预解析：通过预解析的方式来预先获得域名对应的 ip

`<link rel="dns-prefetch" href="//abcd.com">`

#### 预加载

预加载是声明式的 fetch ，强制浏览器请求资源，且不会阻塞 onload 事件，一定程度上降低首屏加载时间

`<link rel="pre-load" href="//abcd.com">`

#### 预渲染

通过预渲染将下载的文件在后台预先渲染好，虽然可提高页面加载速度，但要确保大概率该页面会被用户在之后打开，避免浪费资源去渲染。

`<link rel="prerender" href="//abcd.com">`


#### 懒执行

- 将某些逻辑延迟到使用的时候再计算，可用于首屏优化。
- 懒执行需要唤醒，一般可以通过定时器或者事件的调用来唤醒

#### 懒加载

- 原理就是加载自定义区域或者可视区域的内容
- 对于图片来讲，就是先设置图片的 src 属性为一张占位图，讲真实的图片资源放置在一个自定义的属性中，当图片进入自定义区域的时候，再将自定义属性设置为 src 属性。

#### CND 部署：静态资源尽量使用 CDN 部署



#### 函数节流： 隔一段时间发起一次请求

使用场景如： 滚动事件中发起网络请求


```js{4}
// func 是需要节流的函数， wait 是等待的时间
const throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 当前时间
    let now = +new Date()
    // 将当前时间和上一次执行函数时间对比，差值大于等待时间 wait 就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.call(this, args)
    }
  }
}

setInterval(throttle(() => {
  console.log(1)
}, 500), 1)

```



#### 函数防抖

使用场景如： 不希望每次点击都触发网络请求，而是点击一次之后，过多久才可以再次点击才去发起请求

```js{4}
// func 是需要防抖的函数， wait 是等待的时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  return function(...args) {
    / 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)

  }
}

```
