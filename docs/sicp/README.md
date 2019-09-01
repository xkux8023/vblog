### Scheme 相关

##### 使用计算阶乘来理解递归函数：
```scheme{4}
(define (fact n)
  (if (= n 1)
      1
      (* n (fact (- n 1)))))
```

; `(fact 5)` 的计算过程如下：
```scheme{4}
(fact 5)
⇒ 5 * (fact 4)
⇒ 5 * 4 * (fact 3)
⇒ 5 * 4 * 3 * (fact 2)
⇒ 5 * 4 * 3 * 2 * (fact 1)
⇒ 5 * 4 * 3 * 2 * 1
⇒ 5 * 4 * 3 * 2
⇒ 5 * 4 * 6
⇒ 5 * 24
⇒ 120
```

; 一个让表中所有元素翻倍的函数：
```scheme{4}
(define (list*2 ls)
  (if (null? ls)
      '()
      (cons (* 2 (car ls))
            (list*2 (cdr ls)))))
```

; 用于统计表中元素个数的my-length函数:

```scheme{4}
(define (my-length ls)
  (if (null? ls)
      0
      (+ 1 (my-length(cdr ls)))))
```

; 一个求和表中元素的函数
```scheme{4}
(define (list-sum ls)
  (if (null? ls)
      0
      (+ (car ls) (list-sum (cdr ls)))))
```

;一个分别接受一个表ls和一个对象x的函数，该函数返回从ls中删除x后得到的表

```scheme{4}
(define (remove x ls)
  (if (null? ls)
      '()
      (let ((h (car ls)))
        ((if (eqv? x h)
             (lambda (y) y)
             (lambda (y) (cons h y)))
          (remove x (cdr ls))))))


; let 的实现
(define (remove x ls)
  (let loop((ls0 ls) (ls1 ()))
    (if (null? ls0)
    (reverse ls1)
    (loop
      (cdr ls0)
        (if (eqv? x (car ls0))
          ls1
          (cons (car ls0) ls1))))))
```
; 一个分别接受一个表ls和一个对象x的函数，该函数返回x在ls中首次出现的位置。索引从0开始。如果x不在ls中，函数返回#f

```scheme{4}
(define (position x ls)
  (position-aux x ls 0))

(define (position-aux x ls i)
  (cond ((null? ls) #f)
        ((eqv x (car ls)) i))
        (else (position-aux x (cdr ls) (1+i)))))

; let 的实现
(define (position x ls)
  (let loop((ls0 ls) (i 0))
    (cond
      ((null? ls0) #f)
      ((eqv? x (car ls0)) i)
      (else (loop (cdr ls0) (1+i))))))
```


##### 阶乘的尾递归实现：
```scheme{4}
(define (fact-tail n)
  (fact-rec n n))

(define (fact-rec n p)
  (if (= n 1)
      p
      (let ((m (- n 1)))
      (fact-rec m (* p m)))))
```

; `act-tail` 计算阶乘的过程像这样：
```scheme{4}
(fact-tail 5)
⇒ (fact-rec 5 5)
⇒ (fact-rec 4 20)
⇒ (fact-rec 3 60)
⇒ (fact-rec 2 120)
⇒ (fact-rec 1 120)
⇒ 120
```

; 用于翻转表元素顺序的my-reverse函数。（尾递归的实现）

```scheme{4}
(define (my-reverse ls)
  (my-reverse-rec ls '()))

(define (my-reverse-rec ls0 ls1)
  (if (null? ls0)
      ls1
      (my-reverse-rec (cdr ls0) (cons (car ls0) ls1))))
```

; 求和由数构成的表。（尾递归的实现）

```scheme{4}
(define (my-sum-tail ls)
  (my-sum-rec ls 0))

(define (my-sum-rec ls n)
  (if (null? ls)
      n
      (my-sum-rec (cdr ls) (+ n (car ls)))))

; let 的实现
(define (my-sum-let ls)
  (let loop((ls0 ls) (ls1 ()))
    (if (null? ls0)
    ls1
    (loop (cdr ls0) (cons (car ls0) ls1)))))
```


##### 命名 let：

; 在Scheme中，用命名let来表达循环是俗成的方法。

```scheme{4}
(define (fact-let n)
  (let loop((n1 n) (p n))
    (if (= n1 1)
        p
        (let ((m (- n1 1)))
          (loop m (* p m))))))
```

; range函数：返回一个从0到n的表（但不包含n）
```scheme{4}
(define (range n)
  (let loop((i 0) (ls1 ()))
    (if (= i n)
      (reverse ls1)
      (loop (1+ i) (cons i ls1)))))
```

##### letrec：

; letrec类似于let，但它允许一个名字递归地调用它自己
```scheme{4}
(define (fact-letrec n)
  (letrec ((iter (lambda (n1 p)
          (if (= n1 1)
              p
              (let ((m (- n1 1)))
            (iter m (* p m)))))))
    (iter n n)))
```

