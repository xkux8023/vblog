### $nextTick

这里就涉及到 Vue 一个很重要的概念：异步更新队列（JS运行机制 、 事件循环）
- vue 在观察到数据变化时并不是直接更新 DOM, 而是开启一个队列，并缓冲在同一事件循环（Event Loop）中发生的所有数据改变
- 在缓冲时会去除重复数据，从而避免不必要的 DOM 操作
- 然后在下一个事件循环中，vue 刷新队列并执行实际（已去重的）工作
- $nextTick 是在下次 DOM 更新循环结束之后《执行延迟回调》
- 在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
```js
<template>
  <div id="app">
    <button ref="btn" @click="handleClick">{{msg}}</button>
  </div>
</template>
export default {
  name: 'app',
  data () {
    msg: '旧的数据'
  },
  methods: {
    handleClick () {
      this.msg = '点击后新的数据'
      console.log(this.$refs.btn.innerHTML)     // 旧的数据
      this.$nextTick(() => {
        console.log(this.$refs.btn.innerHTML)     // 点击后新的数据
      })
    }
  }
}
```

> $nextTick的实现

```js
var nextTick = (function(){
  var callbacks = []    // 存储需要触发的回调函数
  // false: 允许触发在下次事件循环触发callbacks中的回调,
  // true:  已经触发过,需要等到下次事件循环
  var pending=false     // 是否正在等待的标志
  var timerFunc         // 设置在下次事件循环触发callbacks的触发函数
  //处理callbacks的函数
  function nextTickHandler() {
    pending=false                       // 可以触发timeFunc
    var copies = callbacks.splice(0)    // 复制callback
    callbacks.length = 0                // 清除callback

    for (var i=0; i<copies.length; i++) {
      copies[i]   // 触发callback的回调函数
    }
  }

  // 如果支持promise，使用promise实现
  if (typeof Promise !== 'undefined' && isNative(promise)) {
    var p = Promise.resolve()
    var logError = function(err) { console.log(err) }
    timerFunc = function() {
      p.then(nextTickHandler).catch(logError)
      // iOS的webview下，需要强制刷新队列，执行上面的回调函数
      if(isIOS) { setTimeout(noop) }
    }
    // 如果Promise不支持，但支持MutationObserver
    // H5新特性，异步,当dom变动是触发,注意是所有的dom都改变结束后触发
  } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver || MutationObserver.toString()==='[object MutationObserverConstructor]'))) {
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc=function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter)
    }
  } else {
    //上面两种都不支持，用setTimeout
    timerFunc = function () {
      setTimeout(nextTickHandler, 0)
    }
  }
  // nextTick接收的函数，参数1：回调函数 参数2：回调函数的执行上下文
  return function queueNextTick(cb, ctx) {  // 用于接收触发Promise.then中回调的函数, 向回调函数中pushcallback
    var _resolve
    callbacks.push(function(){
      // 如果有回调，执行回调函数
      if (cb) { cb.call(ctx) }
      //触发Promise的then回调
      if (_resove) { _resolve(ctx) }
    })
    // 是否执行刷新callback队列
    if(!pending){
      pending = true
      timerFunc()
    }
    // 如果没有传递回调函数，并且当前浏览器支持promise，使用promise实现
    if(!cb && typeof  Promise !=='undefined'){
      return new Promise(function (resolve) {
        _resolve = resolve
      })
    }
  }
})
```
