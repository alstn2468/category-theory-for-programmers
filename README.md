# 프로그래머를 위한 범주론

> 본 레파지토리는 Bartosz Milewsk의 [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)을 번역하며 학습한 레파지토리입니다.

<details>
  <summary>
    &nbsp🗂 목차
  </summary>

### Part 1.

1. [Category: The Essence of Composition](part-1/1-category-the-essence-of-composition.md)
2. [Types and Functions](part-1/2-types-and-functions.md)
3. [Categories Great and Small](part-1/3-categories-great-and-small.md)
4. [Kleisli Categories](part-1/4-kleisli-categories.md)
5. [Products and Coproducts](part-1/5-products-and-coproducts.md)
6. [Simple Algebraic Data Types](part-1/6-simple-algebraic-data-types.md)
7. [Functors](part-1/7-functors.md)
8. [Functoriality](part-1/8-functoriality.md)
9. [Function Types](part-1/9-function-types.md)
10. [Natural Transformations](part-1/10-natural-transformations.md)

### Part 2.

1. [Declarative Programming](part-2/1-declarative-programming.md)
2. [Limits and Colimits](part-2/2-limits-and-colimits.md)
3. [Free Monoids](part-2/3-free-monoids.md)
4. [Representable Functors](part-2/4-representable-functors.md)
5. [The Yoneda Lemma](part-2/5-the-yoneda-lemma.md)
6. [Yoneda Embedding](part-2/6-yoneda-embedding.md)

### Part 3.

1. [It’s All About Morphisms](part-3/1-its-all-about-morphisms.md)
2. [Adjunctions](part-3/2-adjunctions.md)
3. [Free/Forgetful Adjunctions](part-3/3-free-forgetful-adjunctions.md)
4. [Monads: Programmer’s Definition](part-3/4-monads-programmers-definition.md)
5. [Monads and Effects](part-3/5-monads-and-effects.md)
6. [Monads Categorically](part-3/6-monads-categorically.md)
7. [Comonads](part-3/7-comonads.md)
8. [F-Algebras](part-3/8-f-algebras.md)
9. [Algebras for Monads](part-3/9-algebras-for-monads.md)
10. [Ends and Coends](part-3/10-ends-and-coends.md)
11. [Kan Extensions](part-3/11-kan-extensions.md)
12. [Enriched Categories](part-3/12-enriched-categories.md)
13. [Topoi](part-3/13-topoi.md)
14. [Lawvere Theories](part-3/14-lawvere-theories.md)
15. [Monads, Monoids, and Categories](part-3/15-monads-monoids-and-categories.md)

</details>

더 나은 조판 설정이 있는 책의 무료 [pdf 버전](https://github.com/hmemcpy/milewski-ctfp-pdf/)을 다운로드 받을 수 있습니다. [Blurb](https://www.blurb.com/b/9621951-category-theory-for-programmers-new-edition-hardco)에서 컬러 일러스트레이션이 있는 하드커버 버전을 주문할 수 있습니다. 또는 청중들에게 이 [자료를 가르치는 것](https://www.youtube.com/playlist?list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_)을 볼 수도 있습니다.

## 🌈 서문

> 한동안 저는 프로그래머들을 대상으로 하는 범주론에 관한 책을 써야겠다고 생각하고 있었습니다. 컴퓨터 과학자가 아니라 프로그래머, 과학자가 아니라 엔지니어라는 점을 명심해야 합니다. 이상하게 들릴 수 있지만 저 또한 두렵습니다. 저는 과학과 엔지니어링 양쪽에서 일을 해왔기 때문에 사이에 큰 격차가 있다는 것을 부정할 수 없습니다. 그러나 저는 항상 범주론을 설명하고 싶은 강한 강박을 느껴왔습니다. 저는 단순한 설명의 대가였던 리처드 파인먼(Richard Feynman)에게 엄청난 존경을 표합니다. 저는 파인먼이 아니라는 것을 알고 있지만, 최선을 다할 것입니다. 저는 토론을 시작하고 피드백을 요청하기 위해 독자가 범주론을 배우도록 동기를 부여하기 위해 이 서문을 출판하는 것으로 시작하려 합니다.

I will attempt, in the space of a few paragraphs, to convince you that this book is written for you, and whatever objections you might have to learning one of the most abstract branches of mathematics in your “copious spare time” are totally unfounded.

My optimism is based on several observations. First, category theory is a treasure trove of extremely useful programming ideas. Haskell programmers have been tapping this resource for a long time, and the ideas are slowly percolating into other languages, but this process is too slow. We need to speed it up.

Second, there are many different kinds of math, and they appeal to different audiences. You might be allergic to calculus or algebra, but it doesn’t mean you won’t enjoy category theory. I would go as far as to argue that category theory is the kind of math that is particularly well suited for the minds of programmers. That’s because category theory — rather than dealing with particulars — deals with structure. It deals with the kind of structure that makes programs composable.

Composition is at the very root of category theory — it’s part of the definition of the category itself. And I will argue strongly that composition is the essence of programming. We’ve been composing things forever, long before some great engineer came up with the idea of a subroutine. Some time ago the principles of structured programming revolutionized programming because they made blocks of code composable. Then came object oriented programming, which is all about composing objects. Functional programming is not only about composing functions and algebraic data structures — it makes concurrency composable — something that’s virtually impossible with other programming paradigms.

Third, I have a secret weapon, a butcher’s knife, with which I will butcher math to make it more palatable to programmers. When you’re a professional mathematician, you have to be very careful to get all your assumptions straight, qualify every statement properly, and construct all your proofs rigorously. This makes mathematical papers and books extremely hard to read for an outsider. I’m a physicist by training, and in physics we made amazing advances using informal reasoning. Mathematicians laughed at the Dirac delta function, which was made up on the spot by the great physicist P. A. M. Dirac to solve some differential equations. They stopped laughing when they discovered a completely new branch of calculus called distribution theory that formalized Dirac’s insights.

Of course when using hand-waving arguments you run the risk of saying something blatantly wrong, so I will try to make sure that there is solid mathematical theory behind informal arguments in this book. I do have a worn-out copy of Saunders Mac Lane’s Category Theory for the Working Mathematician on my nightstand.

Since this is category theory for programmers I will illustrate all major concepts using computer code. You are probably aware that functional languages are closer to math than the more popular imperative languages. They also offer more abstracting power. So a natural temptation would be to say: You must learn Haskell before the bounty of category theory becomes available to you. But that would imply that category theory has no application outside of functional programming and that’s simply not true. So I will provide a lot of C++ examples. Granted, you’ll have to overcome some ugly syntax, the patterns might not stand out from the background of verbosity, and you might be forced to do some copy and paste in lieu of higher abstraction, but that’s just the lot of a C++ programmer.

But you’re not off the hook as far as Haskell is concerned. You don’t have to become a Haskell programmer, but you need it as a language for sketching and documenting ideas to be implemented in C++. That’s exactly how I got started with Haskell. I found its terse syntax and powerful type system a great help in understanding and implementing C++ templates, data structures, and algorithms. But since I can’t expect the readers to already know Haskell, I will introduce it slowly and explain everything as I go.

If you’re an experienced programmer, you might be asking yourself: I’ve been coding for so long without worrying about category theory or functional methods, so what’s changed? Surely you can’t help but notice that there’s been a steady stream of new functional features invading imperative languages. Even Java, the bastion of object-oriented programming, let the lambdas in C++ has recently been evolving at a frantic pace — a new standard every few years — trying to catch up with the changing world. All this activity is in preparation for a disruptive change or, as we physicist call it, a phase transition. If you keep heating water, it will eventually start boiling. We are now in the position of a frog that must decide if it should continue swimming in increasingly hot water, or start looking for some alternatives.

<div align='center'>
  <img src='./images/frog.jpeg' height='200'>
</div>

One of the forces that are driving the big change is the multicore revolution. The prevailing programming paradigm, object oriented programming, doesn’t buy you anything in the realm of concurrency and parallelism, and instead encourages dangerous and buggy design. Data hiding, the basic premise of object orientation, when combined with sharing and mutation, becomes a recipe for data races. The idea of combining a mutex with the data it protects is nice but, unfortunately, locks don’t compose, and lock hiding makes deadlocks more likely and harder to debug.

But even in the absence of concurrency, the growing complexity of software systems is testing the limits of scalability of the imperative paradigm. To put it simply, side effects are getting out of hand. Granted, functions that have side effects are often convenient and easy to write. Their effects can in principle be encoded in their names and in the comments. A function called SetPassword or WriteFile is obviously mutating some state and generating side effects, and we are used to dealing with that. It’s only when we start composing functions that have side effects on top of other functions that have side effects, and so on, that things start getting hairy. It’s not that side effects are inherently bad — it’s the fact that they are hidden from view that makes them impossible to manage at larger scales. Side effects don’t scale, and imperative programming is all about side effects.

Changes in hardware and the growing complexity of software are forcing us to rethink the foundations of programming. Just like the builders of Europe’s great gothic cathedrals we’ve been honing our craft to the limits of material and structure. There is an unfinished gothic cathedral in Beauvais, France, that stands witness to this deeply human struggle with limitations. It was intended to beat all previous records of height and lightness, but it suffered a series of collapses. Ad hoc measures like iron rods and wooden supports keep it from disintegrating, but obviously a lot of things went wrong. From a modern perspective, it’s a miracle that so many gothic structures had been successfully completed without the help of modern material science, computer modelling, finite element analysis, and general math and physics. I hope future generations will be as admiring of the programming skills we’ve been displaying in building complex operating systems, web servers, and the internet infrastructure. And, frankly, they should, because we’ve done all this based on very flimsy theoretical foundations. We have to fix those foundations if we want to move forward.

<div align='center'>
  <figure>
    <div>
      <img src='./images/beauvais-cathedral-from-collapsing.jpeg' height='300' />
    </div>
    <figcaption>
      <sub>
        <sup>
          Ad hoc measures preventing the Beauvais cathedral from collapsing
        </sup>
      </sub>
    </figcaption>
  </figure>
</div>

---

<div align="center">

<sub><sup>Written by <a href="https://github.com/alstn2468">@Minsu Kim</a></sup></sub><small>✌</small>

</div>