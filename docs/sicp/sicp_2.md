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

