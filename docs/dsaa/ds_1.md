### 数组


> 数组要从 0 开始编号，而不是从 1 开始呢？

- 从数组存储的内存模型上来看，“下标”最确切的定义应该是“偏移“
- a 来表示数组的首地址，a[0] 就是偏移为 0 的位置，也就是首地址， a[k] 就表示偏移 k 个 type_size 的位置

所以计算 a[k] 的内存地址只需要用这个公式：

``` js{4}
a[k]_address = base_address + k * type_size
```

对于 m * n 的二维数组的内存寻址，a [ i ][ j ] (i < m, j < n)的地址为：

``` js{4}
a[i][j]_address = base_address + (i * n + j) * type_size
```
