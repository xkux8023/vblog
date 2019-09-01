---
home: true
heroImage: /avatar.png
footer: MIT Licensed | Copyright © 2018-present Evan You
---


```scheme{4}
(define (my-reverse ls)
  (my-reverse-rec ls '())

(define (my-reverse-rec ls0 ls1)
  (if (null? ls0)
      ls1
      (my-reverse-rec (cdr ls0) (cons (car ls0) ls1))))
```
