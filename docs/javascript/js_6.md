### Diff 算法简单实现

```js{4}
function createElem(vnode) {
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var childrend = vnode.childrend || []

  if (!tag) return null

  // 创建元素
  var elem = document.createElement(tag)
  // 属性
  var attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }

  // 子元素
  children.forEach(function (childVnode) {
    // 给 elem 添加子元素('递归创建')
    elem.append(createElem(childVnode))
  })

  // 返回真是 DOM
  return elem
}

function updateChildren(vnode, newVnode) {
  var children = vnode.children || []
  var newChildren = newVnode.children || []

  children.forEach(function(childVnode, index) {
    var newChildVnode = newChildren(index)
    if (childVnode.tag === newChildVnode.tag) {
      // 深层次递归对比
      updateChildren(childVnode, newChildVnode)
    } else {
      // 替换
      replaceNode(childVnode, newChildVnode)
    }
  })
}

function replaceNode(vnode, newVnode) {
  var elem = vnode.elem
  vae newElem = createElement(newVnode)

  // 替换操作
  ....
}
```
