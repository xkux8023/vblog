### 1.1 程序设计的基本元素

##### 过程定义的一般形式如下：
```scheme{4}
(define (<name> <formal parameters>) <body>)
```

- 在 Lisp 中去表述 平方：

```scheme{4}
(define (square x) (* x x))
```

- x² + y² 可以表述为：
```scheme{4}
(+ (square x) (square y))
```

- 上面的例子我们可以将其表述为过程： sum-of-squares
```scheme{4}
(define (sum-of-squares x y)
    (+ (square x) (square y)))

# 例如
(sum-of-squares 3, 4)       // 25
```

- 现在我们将 sum-of-squares 作为构建，去构造其他过程：
```scheme{4}
(define (f a)
    (sum-of-squares (+ a 1) (* a 2)))

(f 5)   // 136
```


---


##### 条件表达式和谓词

- 条件表达式的一般形式：
```scheme{4}
(cond (<p1> <e1>)
      (<p2> <e2>)
      ...
      (<pn> <en>))
```

- 绝对值的表述形式如下：

```scheme{4}
(define (abs x)
    (cond ((> x 0) x)
          ((= x 0) 0)
          ((< x 0) -x))))


(define (abs x)
    (cond ((< x 0) (-x))
          (else x)))

(define (abs x)
    (if (< x 0)
        (-x)
        x))
```

- if 表达式的一般形式如下：

```scheme{4}
(if <predicate><consequent><alternative>)
```

- 一个为假则停止后续求值,并返回假，全部为真则返回真
```scheme{4}
(and <e1><e2>...<en-1><en>)
```

- 一个为真则停止后续求值,并返回真，全部为假则返回假
```scheme{4}
(or <e1><e2>...<en-1><en>)
```

- 为真则返回假，为假则返回真
```scheme{4}
(or <e>)
```

- 数 x 的值位于区间 5 < x < 10 之间的表述为：
```scheme{4}
(and (> x 5) (< x 10))
```

- 检测某个数是否大于或者等于另外一个数：
```scheme{4}
(define (>= x y)
    (or (> x y) (= x y)))

# 或者
(define (>= x y)
    (not (< x y)))
```

- 采用牛顿法求平方根
```scheme{4}
(define (sqrt x)
  (sqrt-iter 1.0 x))

(define (sqrt-iter guess x)
  (if (good-enough? guess x)
      geuss
      (sqrt-iter (improve guess x) x)))

(define (improve guess x)
  (average guess (/ x guess)))

(define (average x y)
  (/ (+ x y) 2))

(define (good-enough? guess x)
  (< (abs (- (square guess) x)) 0.01))
```

- 过程作为黑箱抽象

```scheme{4}
; 这种嵌套的定义称为 块结构
(define (sqrt x)
  (define (good-enough? guess x)
    (< (abs (- (square guess) x)) 0.001))
  (define (improve guess x)
    (average guess (/ x guess)))
  (define (sqrt-iter guess x)
    (if (good-enough? guess x)
        guess
        (sqrt-iter (improve guess x) x)))
  (sqrt-iter 1.0 x))
```
; 可以让 x 作为内部定义的自由变量，没必要显式地将 x 在这些过程中传来传去
; 这样在外围的 sqrt 被调用时， x 由实际参数得到自己的值，这种方式称为词法作用域。
```scheme{4}
(define (sqrt x)
  (define (good-enough? guess)
    (< (abs (- (square guess) x)) 0.001))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (sqrt-iter guess x)
    (if (good-enough? guess)
        guess
        (sqrt-iter (improve guess))))
  (sqrt-iter 1.0))
```


2. 习题 1.2 答案：
```scheme{4}
(/ (+ 5 4 (- 2 (-3 (+ 6 (/ 4 5)))))
   (* 3 (- 6 2) (- 2 7)))
```
3. 习题 1.3 答案：
```scheme{4}
# 定义一个过程，以三个数为参数，返回其中较大两个数的和：
(define bigSumer(x y z)
    (cond (and (< x y) (< x z)) (+ y z))
    (cond (and (< y x) (< y z)) (+ x z))
    (cond (and (< z x) (< z y)) (+ x y)))
```
4. 习题 1.4 答案： 描述下面过程的行为：
```scheme{4}
(define (a-plus-abs-b a b)
    ((if (> b 0) + -) a b))

# 定义一个过程，以两个数为参数，如果 b 大于 0， 则求和，否则求差
```
8. 习题 1.8 答案：牛顿法求立方根的实现
```scheme{4}
(define (cube-root x)
  (cube-root-iter 1.0 x))

(define (cube-root-iter guess x)
  (if (good-enough? guess x)
      geuss
      (cube-root-iter (improve guess x) x)))

(define (improve guess x)
  (/ (+ (/ x (square guess)) (* 2 guess)) 3))

(define (good-enough? guess x)
  (< (abs (- (cube guess) x)) 0.01))
```

