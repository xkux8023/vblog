### 栈

```java{4}
public interface Stack<E> {
  int getSize();
  boolean isEmpty();
  void push(E e);
  E pop();
  E peek();
}

public class ArrayStack<E> implements Stack<E> {

  private Array<E> array;

  public ArrayStack(int capacity) {
    array = new Array<>(capacity);
  }

  public ArrayStack() {
    array = new Array<>();
  }

  @Override
  public int getSize() {
    return array.getSize();
  }

  @Override
  public boolean isEmpty() {
    return array.isEmpty();
  }

  public int getCapacity() {
    return array.getCapacity();
  }

  @Override
  public void push(E e) {
    array.addLast(e);
  }

  @Override
  public E pop() {
    return array.removeLast();
  }

  @Override
  public E peek() {
    return array.getLast();
  }

  @Override
  public String toString() {
    StringBuilder res = new StringBuilder();
    res.append("Stack: ");
    res.append('[');
    for (int i = 0; i < array.getSize(); i++) {
      res.append(array.get(i));
      if (i != array.getSize() - 1)
        res.append(", ");
    }
    res.append("] top");
    return res.toString();
  }
}

```


#### 20.有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。


```java{4}
class Solution {
  public boolean isValid(String s) {
    ArrayStack<Character> stack = new ArrayStack<>();
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      if (c == '[' || c == '{' || c == '(') {
        stack.push(c);
      } else {
        if (stack.isEmpty()) {
          return false;
        }
        char topChar = stack.pop();
        if (c == ')' && topChar != '(') {
          return false;
        }
        if (c == ']' && topChar != '[') {
          return false;
        }
        if (c == '}' && topChar != '{') {
          return false;
        }
      }
    }
    return stack.isEmpty();
  }

  // test
  public static void main(String[] args) {
    System.out.println((new Solution()).isValid("(){}[]"));   // true
    System.out.println((new Solution()).isValid("(){}["));    // false
  }
}
```
