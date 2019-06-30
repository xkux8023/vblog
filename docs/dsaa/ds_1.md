### 数组


```java{4}
/**
 * Array
 */
public class Array<E> {

  private E[] data;
  private int size;

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    data = (E[]) new Object[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array() {
    this(10);
  }

  public int getCapacity() {
    return data.length;
  }

  public int getSize() {
    return size;
  }

  public boolean isEmpty() {
    return size == 0;
  }

  // 向所有元素后添加一个新元素
  public void addLast(E e) {
    add(size, e);
  }

  // 在所有元素前添加一个新元素
  public void addFirst(E e) {
    add(0, e);
  }

  // 在index索引的位置插入一个新元素e
  public void add(int index, E e) {
    if (data.length == size)
      resize(2 * data.length);

    if (index < 0 || index > size)
      throw new IllegalArgumentException("Add failed. Require index >= 0 and index <= size.");

    for (int i = size - 1; i >= index; i--)
      data[i + 1] = data[i];

    data[index] = e;
    size++;
  }

  // 获取index索引位置的元素
  public E get(int index) {
    if (index < 0 || index >= size)
      throw new IllegalArgumentException("Get failed. Index is illegal.");

    return data[index];
  }

  // 修改index索引位置的元素为e
  public void set(int index, E e) {
    if (index < 0 || index >= size)
      throw new IllegalArgumentException("Set failed. Index is illegal.");

    data[index] = e;
  }

  // 查找数组中是否有元素e
  public boolean contains(E e) {
    for (int i = 0; i < size; i++) {
      if (data[i].equals(e)) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  public int find(E e) {
    for (int i = 0; i < size; i++) {
      if (data[i].equals(e)) {
        return i;
      }
    }
    return -1;
  }

  // 从数组中删除index位置的元素, 返回删除的元素
  public E remove(int index) {
    if (index < 0 || index >= size)
      throw new IllegalArgumentException("Remove failed. Index is illegal.");

    E ret = data[index];
    for (int i = index + 1; i < size; i++) {
      data[i - 1] = data[i];
    }
    size--;
    data[size] = null;

    if (size == data.length / 4 && data.length / 2 != 0)
      resize(data.length / 2);

    return ret;
  }

  // 从数组中删除第一个元素, 返回删除的元素
  public E removeFirst() {
    return remove(0);
  }

  // 从数组中删除最后一个元素, 返回删除的元素
  public E removeLast() {
    return remove(size - 1);
  }

  // 从数组中删除元素e
  public void removeElement(E e) {
    int index = find(e);
    if (index != -1) {
      remove(index);
    }
  }

  @Override
  public String toString() {
    StringBuilder res = new StringBuilder();
    res.append(String.format("Array: size = %d, capacity = %d\n", size, data.length));
    res.append('[');
    for (int i = 0; i < size; i++) {
      res.append(data[i]);
      if (i != size - 1) {
        res.append(", ");
      }
    }
    res.append(']');
    return res.toString();
  }

  // 将数组空间的容量变成newCapacity大小
  private void resize(int newCapacity) {

    E[] newData = (E[]) new Object[newCapacity];
    for (int i = 0; i < size; i++)
      newData[i] = data[i];
    data = newData;
  }
}
```

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
