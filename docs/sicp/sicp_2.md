### 1.2 过程与它们所产生的计算


##### 线性的递归和迭代

; 递归写法：
```scheme{4}
(define (factorial n)
  (if (= n 1)
      1
      (* n (factorial (- n 1)))))
```


; 迭代写法：
```scheme{4}
(define (factorial n)
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* product counter) (+ counter 1) max-count)))

; 迭代的过程如下：
(factorial 6)
⇒ (fact-iter   1 1 6)
⇒ (fact-iter   1 2 6)
⇒ (fact-iter   2 3 6)
⇒ (fact-iter   6 4 6)
⇒ (fact-iter  24 5 6)
⇒ (fact-iter 120 6 6)
⇒ (fact-iter 720 7 6)
⇒ 720

```

; 隐藏内部实现的迭代写法：
```scheme{4}
(define (factorial n)
  (define (iter product counter)
    (if (> counter n)
        product
        (iter (* product counter) (+ counter 1))))
  (iter 1 1))
```



9. 习题 1.9 答案：用代换模型展示求值 `(+ 4 5)` 所产生的计算过程（递归 或者 迭代）

```scheme{4}
(define (plus a b)
  (if (= a 0)
      b
      (inc (plus (dec a) b))))

; 递归过程如下：
(plus 4 5)
(inc (plus (3 5)))
(inc (inc (plus (2 5))))
(inc (inc (inc (plus (1 5)))))
(inc (inc (inc (inc (plus (0 5))))))
(inc (inc (inc (inc 5))))
(inc (inc (inc 6)))
(inc (inc 7))
(inc 8)
9
```


```scheme{4}
(define (plus a b)
  (if (= a 0)
      b
      (plus (dec a) (inc b))))

; 递归过程如下：
(plus 4 5)
(plus 3 6)
(plus 2 7)
(plus 1 8)
(plus 0 9)
9
```

; 斐波那契的递归过程：
```scheme{4}
(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
    	  (else (+ (fib (- n 1))
    			       (fib (- n 2)))))
```

; 斐波那契的迭代过程：
```scheme{4}
(define (fib n)
  (fib-iter 1 0 n))

(define (fib-iter a b count)
  (if (= count 0)
      b
      (fib-iter (+ a b) a (- count 1))))
```
; 将总数为 a 的现金换成 n 种硬币的不同方式的数目等于
- 将现金数 a 换成除第一种硬币之外的所有其他硬币的不同方式数目，加上
- 将现金数 a-d 换成所有种类的硬币的不同方式数目，其中 d 是第一种硬币的币值

- 如果 a 就是 0，应该算作是有 1 种换零钱的方式
- 如果 a 小于 0，应该算作是有 0 种换零钱的方式
- 如果 n 是 0， 应该算作是有 0 种换零钱的方式

; 将上述描述翻译为一个递归过程：
```scheme{4}
(define (count-change amount)
  (cc amount 5))

(define (cc amount kinds-of-coins)
  (cond ((= amount 0) 1)
        ((or (< amount 0) (= kinds-of-coins 0)) 0)
        (else (+ (cc amount (- kinds-of-coins 1))
        		 (cc (- amount (first-denomination kinds-of-coins)) kinds-of-coins)))))

; 过程 `first-denomination` 以可用的硬币种数作为输入，返回第一种硬币的币值
;（此处认为硬币已经从小到大排序好）
(define (first-denomination kinds-of-coins)
  (cond ((= kinds-of-coins 1) 1)
        ((= kinds-of-coins 2) 5)
        ((= kinds-of-coins 3) 10)
        ((= kinds-of-coins 4) 25)
        ((= kinds-of-coins 5) 50)))
```

11. 习题 1.11 答案：
- 如果 `n < 3`， 那么 `f(n) = n`
- 如果 `n >= 3`， 那么 `f(n) = f(n-1)+2f(n-1)+3f(n-3)`
```scheme{4}
; 递归实现的计算过程
(define (f n)
  (if (< n 3)
      n
      (+ (* 1 (f (- n 1)))
      	 (* 2 (f (- n 2)))
      	 (* 3 (f (- n 3)))))))

; 迭代实现的计算过程

(define (f n)
	(f-iter 2 1 0 0 n))

(define (f-iter a b c i n)
  (if (= i n)
      c
      (fact-iter (+ a (* 2 b) (* 3 c))
      			 a
      			 b
      			 (+ i 1)
      			 n)))

```


12. 习题 1.12 答案：帕斯卡三角形的各个元素之间的关系
```scheme{4}
row:
0        1
1       1 1
2      1 2 1
3     1 3 3 1
4    1 4 6 4 1
5   . . . . . .
col: 0 1 2 3 4
```
; 使用 pascal(row, col) 代表第 row 行和第 col 列上的元素的值，可以得出一些性质
- 每个 pascal(row, col) 由 pascal(row-1, col-1) (左上边的元素)和 pascal(row-1, col) (右上边的元素)组成
- 当 col 等于 0 (最左边元素)，或者 row 等于 col (最右边元素)时， pascal(row, col) 等于 1
```scheme{4}
; 递归实现
(define (pascal row col)
	(cond ((> col row) (error "unvalid col value"))
		  (or (= col 1)  (= col row)) 1)
	      (else (+ (pascal (- row 1) (- col 1))
	      		   (pascal (- row 1) col)))))


; 迭代实现
; 使用帕斯卡三角形的另一个公式来计算帕斯卡三角形的元素：(row col) =  row! / (col!*(row-col)!)
(define (factorial n)
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* product counter) (+ counter 1) max-count)))

(define (pascal row col)
    (/ (factorial row)
       (* (factorial col)
          (factorial (- row col)))))

```

##### 求幂


16. 习题 1.16 

```scheme{4}
(define (expt-iter b counter product)
  ((if (= counter 0)
      1
      ((even? counter)
        (expt-iter (square b) (/ n 2) a))
      ((odd? counter)
        (expt-iter b (- counter 1) (* b product)))))
```

17. 习题 1.17 

```scheme{4}
(define (double n)
    (+ n n)) 

(define (halve n)
    (/ n 2)) 

(define (multi a b)
  (cond ((= b 0) 0)
        ((even? b) (double (multi a (halve b))))
      ((odd? b) (+ a (multi a (- b 1)))))
```


18. 习题 1.18 

```scheme{4}
(define (multi a b)
  (multi-iter a b 0))  

(define (multi-iter a b product)
  (cond ((= b 0) product)
      ((even? b) (multi-iter (double a) (halve b) product))
      ((odd? b) (multi-iter a (- b 1) (+ a product)))))
```


##### 最大公约数

; 如果 r 是 a 除以 b 的余数，那么 a 和 b 的公约数正好也是 b 和 r 的公约数： `GCD(a, b) = GCD(b, r)`


```scheme{4}

; 欧几里德算法

(define (gcd a b)
  (if (= b 0)
      a
      (gcd b (reminder a b))))
```


##### 素数检测
```scheme{4}
(define (smallest-divisor n)
  (find-divisor n 2))

(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
        ((divides? test-divisor) test-divisor))
    (else (find-divisor n (+ test-divisor 1))))

(define (divides?  a b)
  (= (reminder b a) 0))
```  

; 也可以如下检测一个数是否是素数： n 是素数，当且仅当它是自己的最小因子

```scheme{4}
(define (prime? n)
  (= n (smallest-divisor n)))
```

##### 费马检测

下面的过程计算一个的幂对另一个数取模的结果
```scheme{4}
(define (expmond base exp m)
  (cond ((= exp 0) 1)
        ((even? exp) 
         (remainder (square (expmond base (/ exp 2) m)) m))
        
        (else
         (remainder (* base (expmond base (- exp 1) m)) m))))

(define (fermat-test n)
  (define (try-it a)
    (= (expmond a n n) a))
  (try-it (+ 1 (random (- n 1)))))

(define (fast-prime? n times)
  (cond ((= times 0) true)
        ((fermat n) (fast-prime? n (- times 1)))
        (else false)))         
```



; 对于整数 n 调用下面的 timed-prime-test 过程时，将打印出 n 并检查 n 是否为素数。如果 n 是素数，过程将打印三个 * ,随后是执行这一检查所用的时间量。
```scheme{4}
(define (timed-prime-test n)
  (newline)
  (display n)
  (start-prime-test n (runtime)))

(define (start-prime-test n start-time)
  (if (prime? n)
      (report-prime (- (runtime) start-time))))

(define (report-prime elapsed-time)
  (display " *** ")
  (display elapsed-time))
```
22. 习题 1.22 
要写出 search-for-primes 函数，我们首先需要解决以下几个子问题：

1-写一个能产生下一个奇数的函数，用于生成连续奇数
```scheme{4}
(define (next-odd n)
  (if (odd? n)
      (+ 2 n)
      (+ 1 n)))
```
2-写一个检查给定数字是否为素数的函数
```scheme{4}
(define (prime? n)
  (= n (smallest-divisor n)))

(define (smallest-divisor n)
  (find-divisor n 2))

(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
        ((divides? test-divisor n) test-divisor)
        else (find-divisor n (+ test-divisor 1))))

(define (divides? a b)
  (= (remainder b a) 0))
```
3-写一个函数，给定它一个参数 n ，可以生成大于等于 n 的三个素数，或者更一般地，对于一个函数，给定它两个参数 n 和 count ，可以生成 count 个大于等于 n 的素数
```scheme{4}
(define (continue-primes n count)
  (cond ((= count 0) display "are primes")
        ((prime? n)
          (display n)
          (newline)
          (continue-primes (next-odd n) (- count 1)))
        (else
          (continue-primes (next-odd n) count))))
```
4-测量寻找三个素数所需的时间

```scheme{4}
(define (test-foo)
  (let ((start-time (real-time-clock)))
    (foo)
    (- (real-time-clock) start-time)))
```

5-组合起前面的 continue-primes 函数和 real-time-clock 函数，写出题目要求的 search-for-primes 函数了，这个函数接受参数 n ，找出大于等于 n 的三个素数，并且返回寻找素数所需的时间作为函数的返回值：

```scheme{4}
(define (search-for-primes n)
  (let ((start-time (real-time-clock)))
    (continue-primes n 3)
    (- (real-time-clock) start-time)))
```  

23. 习题 1.23 

要完成这个练习，我们需要：

1.写出 next 函数
```scheme{4}
;next 函数接受参数 n ，如果 n 为 2 ，那么返回 3 ，否则返回 n+2 ：
(define (next n)
  (if (= n 2)
      3
      (+ n 2)))
``` 
2.使用 next 函数重定义 find-divisor 函数
```scheme{4}
(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
        ((divides? test-divisor n) test-divisor)
        else (find-divisor n (next test-divisor))))
``` 
3.使用新的 find-divisor 覆盖原来 search-for-primes 所使用的 find-divisor ，并使用一个文件来包裹它们，方便测试时使用
```scheme{4}
; 先引入 练习 1.22 的 search-for-primes 函数，再引入新的 find-divisor 函数，覆盖原来旧的 find-divisor
(load "22-search-for-primes.scm")
(load "23-find-divisor.scm")
```   
4.使用新的 search-for-primes 进行测试，和原来的 search-for-primes 进行对比



##### 用高阶函数做抽象

- 1.3.1-过程作为参数

; 计算从 a 到 b 的各个整数之和
```scheme{4}
(define (sum-integers a b)
  (if (> a b)
      0
      (+ a (sum-integers (+ a 1) b))))
```

; 计算给定范围内的整数的立方之和
```scheme{4}
(define (sum-cubes a b)
  (if (> a b)
      0
      (+ (cube a) (sum-cubes (+ a 1) b))))
```
; 计算下面的序列之和: `1/(1*3) + 1/(5*7) + 1/(9*11)+...`
```scheme{4}
(define (pi-sum a b)
  (if (> a b)
      0
      (+ 
        (/ 1.0 (* a (+ a 2)))
        (pi-sum (+ a 4) b))))
```

; 通过填充下面模板的空位，产生上面的各个过程
```scheme{4}
(define (<name> a b)
  (if (> a b)
      0
      (+ (<term> a)
         (<name> (<next> a) b))))
```         
; 按照上面给出模式，去实现第一个求和的过程如下：
```scheme{4}
(define (sum term a next b)
  (if (> a b)
      0
      (+ (term a)
         (sum term (next a) next b))))

(define (inc n) (+ n 1))
(define (sum-cubes a b)
  (sum cube a inc b))

; 计算从 1 到 10 的立方和：
(sum-cubes 1 10) ;3025  
```  

; 利用恒等函数帮助算出项值，就可以基于sum定义sum-integers:
```scheme{4}
(define (identity x) x)

(define (sum-integers a b)
  (sum identity a inc b))

; 求出从 1 到 10 的整数和
(sum-integers 1 10)       ;55

; 以同样方式定义 pi-sum:
(define (pi-sum a b)
  (define (pi-term x)
    (/ 1.0 (* x (+ x 2))))
  (define (pi-next x)
    (+ x 4))
  (sum pi-term a pi-next b))

; 计算 pai 的一个近似值
(* 8 (pi-sum 1 1000)) ;3.139592655589783
```

; 求出函数 f 在范围 a 和 b 之间的定积分的近似值的过程如下：
```scheme{4}
(define (integral f a b dx)
  (define (add-dx x) (+ x dx))
  (* (sum f (+ a (/ dx 2.0)) add-dx b) dx))
```


##### lambda 表达式  

```scheme{4}
; 一般写法
(define (f x y)
  (define (f-helper a b)
    (+ (* x (square a))
       (* y b)
       (* a b)))
  (f-helper (+ 1 (* x y))
            (- 1 y)))

; lambda 写法 
(define (f x y)
  ((lambda (a b)
      (+ (* x (square a))
         (* y b)
         (* a b)))
   (+ 1 (* x y)) 
   (- 1 y)))

; let 写法            
(define (f x y)
  (let ((a (+ 1 (* x y)))
        (b (- 1 y)))
    (+ (* x (square a))
       (* y b)
       (* a b))))
```



; 下面可以比较下 lambda 与 js 的箭头函数的对比
```js{4}
const average = (a, b) => {
  return (a+b)/2
}
const square = (c) => {
  return c*c
}
const averageDamp = (f) => (x) => {
  return average(x, f(x))
}
averageDamp(square)(10)     // 55
```

```scheme{4}
(define (average-damp f)
  (lambda (x) (average x (f x))))

((average-damp square) 10)   ; 55
```