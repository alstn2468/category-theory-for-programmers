# 타입과 함수

> 이것은 프로그래머를 위한 범주론 책의 일부입니다. 이전 편은 [범주: 합성의 본질](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/1-category-the-essence-of-composition.md)이었습니다. [목차](https://github.com/alstn2468/category-theory-for-programmers#part-1)를 확인하세요.

타입과 함수의 범주는 프로그래밍에서 중요한 역할을 하므로 타입이 무엇이며 왜 필요한지 이야기해 보겠습니다.

## 누가 타입을 필요로 하나요?

정적 타입과 동적 타입, 강타입과 약타입의 장점에 대해 약간의 논란이 있는 것 같습니다. 사고 실험을 통해 이런 선택을 설명하겠습니다. 컴퓨터 키보드에 있는 수백만 마리의 원숭이가 행복하게 임의의 키를 누르고 프로그램을 만들고 컴파일해 실행한다고 상상해 보세요.

<div align='center'>
  <img src='../images/part-1/img_1329.jpeg' height='200'>
</div>

기계어를 사용한다면 원숭이가 생성한 모든 바이트 조합이 허용되고 실행됩니다. 그러나 고급 언어에서는 컴파일러가 어휘 및 문법 오류를 감지할 수 있다는 사실에 감사할 수 있습니다. 많은 원숭이가 바나나 없이 갈 것이지만(_Lots of monkeys will go without bananas_) 나머지 프로그램은 유용할 가능성이 더 큽니다. 타입 검사는 무의미한 프로그램에 대한 또 다른 방어막을 제공합니다. 게다가, 동적으로 타입이 지정된 언어에서는 타입 불일치가 런타임에서 발견되는 반면, 강력하게 타입이 지정된 정적 타입언어에서는 타입 불일치가 컴파일할 때 발견되어 실행할 기회가 있기 전에 많은 잘못된 프로그램을 제거합니다.

따라서 문제는 원숭이를 행복하게 만들고 싶은가요 아니면 올바른 프로그램을 만들고 싶은가요?

타이핑하는 원숭이 사고 실험의 일반적인 목표는 셰익스피어의 전체 작품을 생산하는 것입니다. 반복문에 맞춤법 검사기와 문법 검사기가 있으면 확률이 크게 높아집니다. 아날로그 타입 검사기는 로미오가 사람으로 선언되면 그의 강한 중력장에서 잎을 돋우거나 광자를 가두지 않도록 함으로써 훨씬 더 나아갑니다. (_컴파일 오류로 불가능한 것이 실행되는 일이 없도록 한다는 의미로 해석됨_)

## 합성 가능성에 관한 타입

범주론은 화살표를 합성하는 것입니다. 그러나 두 개의 화살표는 합성할 수 없습니다. 한 화살표의 대상 객체는 다음 화살표의 원본 객체와 같아야 합니다. 프로그래밍에서 우리는 한 함수의 결과를 다른 함수로 전달합니다. 대상 함수가 출처 함수에서 생성된 데이터를 올바르게 해석할 수 없는 경우 프로그램이 동작하지 않습니다. 합성이 동작하려면 두 끝이 맞아야 합니다. 언어의 타입 시스템이 강할수록 이 일치를 더 잘 설명하고 기계적으로 확인할 수 있습니다.

강력한 정적 타입 검사에 대해 제가 들은 유일한 진지한 주장은 의미상 올바른 일부 프로그램을 제거할 수 있다는 것입니다. 실제로 이건 매우 드물게 발생하며 어떤 경우에도 모든 언어는 실제로 필요할 때 타입 시스템을 우회할 수 있는 일종의 백도어를 제공합니다. Haskell에도 `unsafeCoerce`가 있습니다. 그러나 그 기능은 신중하게 사용해야 합니다. Franz Kafka의 캐릭터인 Gregor Samsa는 거대한 버그로 변신할 때 타입 시스템을 깨고 우리는 그것이 어떻게 끝나는지 알고 있습니다.

제가 많이 듣는 또 다른 주장은 타입을 다루는 것이 프로그래머에게 너무 많은 부담을 준다는 것입니다. 컴파일러가 사용되는 문맥에서 대부분의 타입을 추론할 수 있도록 하는 타입 추론이라는 기술이 있다는 점을 제외하고는 C++로 반복자에 대한 몇 가지 선언을 직접 작성해야 했기 때문에 이 감정에 공감할 수 있었습니다. 이제 C++에서는 `auto` 변수를 선언하고 컴파일러가 해당 타입을 파악하도록 할 수 있습니다.

Haskell에서는 드문 경우를 제외하고 타입 어노테이션은 선택 사항입니다. 프로그래머는 코드의 의미에 대해 많은 것을 알 수 있고 컴파일 오류를 더 쉽게 이해할 수 있기 때문에 어쨌든 사용하는 경향이 있습니다. 타입을 설계해 프로젝트를 시작하는 것은 Haskell의 일반적인 관행입니다. 나중에 타입 어노테이션이 구현을 주도하고 컴파일러에 의한 주석이 됩니다.

강력한 정적 타입은 종종 코드를 테스트하지 않는 핑계로 사용됩니다. 때때로 Haskell 프로그래머가 "컴파일이 됐으니, 이건 정확해."라고 말하는 것을 들을 수 있습니다. 물론 올바른 출력을 생성한다는 의미에서 타입을 수정하는 프로그램이 정확하다는 보장은 없습니다. 이런 무심한 태도의 결과는 여러 연구에서 Haskell이 예상했던 것만큼 코드 품질에서 앞서지 못했다는 것입니다. 상업적 환경에서 버그 수정에 대한 압력은 소프트웨어 개발의 경제성 및 최종 사용자의 관용과 모두 관계가 있고 프로그래밍 언어나 방법론과는 거의 관계가 없는 특정 품질 수준까지만 적용되는 것으로 보입니다. 더 나은 기준은 얼마나 많은 프로젝트가 일정보다 늦어지거나 기능이 크게 저하되어 제공되는지 측정하는 것입니다.

단위 테스트가 강력한 타입을 대체할 수 있다는 주장에 대해 강타입 언어의 일반적인 리팩토링 방법(특정 함수의 인자 타입 변경)을 고려할 수 있습니다. 강타입 언어에서는 해당 함수의 선언을 수정한 다음 모든 빌드가 깨지는 곳을 수정하는 것으로 충분합니다. 약타입 언어에서는 함수가 이제 다른 데이터를 기대한다는 사실을 호출부로 전파할 수 없습니다. 단위 테스트는 일부 불일치를 파악할 수 있지만 테스트는 항상 결정론적 프로세스라기보다는 확률론적 프로세스입니다. 테스트는 증명을 대신할 수 없습니다.

## 타입이란 무엇일까요?

The simplest intuition for types is that they are sets of values. The type `Bool` (remember, concrete types start with a capital letter in Haskell) is a two-element set of `True` and `False`. Type `Char` is a set of all Unicode characters like `'a'` or `'ą'`.

Sets can be finite or infinite. The type of `String`, which is a synonym for a list of `Char`, is an example of an infinite set.

When we declare `x` to be an `Integer`:

```haskell
x :: Integer
```

we are saying that it’s an element of the set of integers. `Integer` in Haskell is an infinite set, and it can be used to do arbitrary precision arithmetic. There is also a finite-set `Int` that corresponds to machine type, just like the C++ `int`.

There are some subtleties that make this identification of types and sets tricky. There are problems with polymorphic functions that involve circular definitions, and with the fact that you can’t have a set of all sets; but as I promised, I won’t be a stickler for math. The great thing is that there is a category of sets, which is called **Set**, and we’ll just work with it. In **Set**, objects are sets and morphisms (arrows) are functions.

**Set** is a very special category, because we can actually peek inside its objects and get a lot of intuitions from doing that. For instance, we know that an empty set has no elements. We know that there are special one-element sets. We know that functions map elements of one set to elements of another set. They can map two elements to one, but not one element to two. We know that an identity function maps each element of a set to itself, and so on. The plan is to gradually forget all this information and instead express all those notions in purely categorical terms, that is in terms of objects and arrows.

In the ideal world we would just say that Haskell types are sets and Haskell functions are mathematical functions between sets. There is just one little problem: A mathematical function does not execute any code — it just knows the answer. A Haskell function has to calculate the answer. It’s not a problem if the answer can be obtained in a finite number of steps — however big that number might be. But there are some calculations that involve recursion, and those might never terminate. We can’t just ban non-terminating functions from Haskell because distinguishing between terminating and non-terminating functions is undecidable — the famous halting problem. That’s why computer scientists came up with a brilliant idea, or a major hack, depending on your point of view, to extend every type by one more special value called the bottom and denoted by `_|_`, or Unicode ⊥. This “value” corresponds to a non-terminating computation. So a function declared as:

```haskell
f :: Bool -> Bool
```

may return `True`, `False`, or `_|_`; the latter meaning that it would never terminate.

Interestingly, once you accept the bottom as part of the type system, it is convenient to treat every runtime error as a bottom, and even allow functions to return the bottom explicitly. The latter is usually done using the expression `undefined`, as in:

```haskell
f :: Bool -> Bool
f x = undefined
```

This definition type checks because `undefined` evaluates to bottom, which is a member of any type, including `Bool`. You can even write:

```haskell
f :: Bool -> Bool
f = undefined
```

(without the `x`) because the bottom is also a member of the type `Bool->Bool`.

Functions that may return bottom are called partial, as opposed to total functions, which return valid results for every possible argument.

Because of the bottom, you’ll see the category of Haskell types and functions referred to as **Hask** rather than **Set**. From the theoretical point of view, this is the source of never-ending complications, so at this point I will use my butcher’s knife and terminate this line of reasoning. From the pragmatic point of view, it’s okay to ignore non-terminating functions and bottoms, and treat **Hask** as bona fide Set (see Bibliography at the end).

## Why Do We Need a Mathematical Model?

As a programmer you are intimately familiar with the syntax and grammar of your programming language. These aspects of the language are usually described using formal notation at the very beginning of the language spec. But the meaning, or semantics, of the language is much harder to describe; it takes many more pages, is rarely formal enough, and almost never complete. Hence the never ending discussions among language lawyers, and a whole cottage industry of books dedicated to the exegesis of the finer points of language standards.

There are formal tools for describing the semantics of a language but, because of their complexity, they are mostly used with simplified academic languages, not real-life programming behemoths. One such tool called operational semantics describes the mechanics of program execution. It defines a formalized idealized interpreter. The semantics of industrial languages, such as C++, is usually described using informal operational reasoning, often in terms of an “abstract machine.”

The problem is that it’s very hard to prove things about programs using operational semantics. To show a property of a program you essentially have to “run it” through the idealized interpreter.

It doesn’t matter that programmers never perform formal proofs of correctness. We always “think” that we write correct programs. Nobody sits at the keyboard saying, “Oh, I’ll just throw a few lines of code and see what happens.” We think that the code we write will perform certain actions that will produce desired results. We are usually quite surprised when it doesn’t. That means we do reason about programs we write, and we usually do it by running an interpreter in our heads. It’s just really hard to keep track of all the variables. Computers are good at running programs — humans are not! If we were, we wouldn’t need computers.

But there is an alternative. It’s called denotational semantics and it’s based on math. In denotational semantics every programing construct is given its mathematical interpretation. With that, if you want to prove a property of a program, you just prove a mathematical theorem. You might think that theorem proving is hard, but the fact is that we humans have been building up mathematical methods for thousands of years, so there is a wealth of accumulated knowledge to tap into. Also, as compared to the kind of theorems that professional mathematicians prove, the problems that we encounter in programming are usually quite simple, if not trivial.

Consider the definition of a factorial function in Haskell, which is a language quite amenable to denotational semantics:

```haskell
fact n = product [1..n]
```

The expression `[1..n]` is a list of integers from 1 to n. The function `product` multiplies all elements of a list. That’s just like a definition of factorial taken from a math text. Compare this with C:

```c
int fact(int n) {
    int i;
    int result = 1;
    for (i = 2; i <= n; ++i)
        result *= i;
    return result;
}
```

Need I say more?

Okay, I’ll be the first to admit that this was a cheap shot! A factorial function has an obvious mathematical denotation. An astute reader might ask: What’s the mathematical model for reading a character from the keyboard or sending a packet across the network? For the longest time that would have been an awkward question leading to a rather convoluted explanation. It seemed like denotational semantics wasn’t the best fit for a considerable number of important tasks that were essential for writing useful programs, and which could be easily tackled by operational semantics. The breakthrough came from category theory. Eugenio Moggi discovered that computational effect can be mapped to monads. This turned out to be an important observation that not only gave denotational semantics a new lease on life and made pure functional programs more usable, but also shed new light on traditional programming. I’ll talk about monads later, when we develop more categorical tools.

One of the important advantages of having a mathematical model for programming is that it’s possible to perform formal proofs of correctness of software. This might not seem so important when you’re writing consumer software, but there are areas of programming where the price of failure may be exorbitant, or where human life is at stake. But even when writing web applications for the health system, you may appreciate the thought that functions and algorithms from the Haskell standard library come with proofs of correctness.

## Pure and Dirty Functions

The things we call functions in C++ or any other imperative language, are not the same things mathematicians call functions. A mathematical function is just a mapping of values to values.

We can implement a mathematical function in a programming language: Such a function, given an input value will calculate the output value. A function to produce a square of a number will probably multiply the input value by itself. It will do it every time it’s called, and it’s guaranteed to produce the same output every time it’s called with the same input. The square of a number doesn’t change with the phases of the Moon.

Also, calculating the square of a number should not have a side effect of dispensing a tasty treat for your dog. A “function” that does that cannot be easily modelled as a mathematical function.

In programming languages, functions that always produce the same result given the same input and have no side effects are called pure functions. In a pure functional language like Haskell all functions are pure. Because of that, it’s easier to give these languages denotational semantics and model them using category theory. As for other languages, it’s always possible to restrict yourself to a pure subset, or reason about side effects separately. Later we’ll see how monads let us model all kinds of effects using only pure functions. So we really don’t lose anything by restricting ourselves to mathematical functions.

## Examples of Types

Once you realize that types are sets, you can think of some rather exotic types. For instance, what’s the type corresponding to an empty set? No, it’s not C++ `void`, although this type is called `Void` in Haskell. It’s a type that’s not inhabited by any values. You can define a function that takes `Void`, but you can never call it. To call it, you would have to provide a value of the type `Void`, and there just aren’t any. As for what this function can return, there are no restrictions whatsoever. It can return any type (although it never will, because it can’t be called). In other words it’s a function that’s polymorphic in the return type. Haskellers have a name for it:

```haskell
absurd :: Void -> a
```

(Remember, `a` is a type variable that can stand for any type.) The name is not coincidental. There is deeper interpretation of types and functions in terms of logic called the Curry-Howard isomorphism. The type `Void` represents falsity, and the type of the function `absurd` corresponds to the statement that from falsity follows anything, as in the Latin adage “ex falso sequitur quodlibet.”

Next is the type that corresponds to a singleton set. It’s a type that has only one possible value. This value just “is.” You might not immediately recognise it as such, but that is the C++ `void`. Think of functions from and to this type. A function from `void` can always be called. If it’s a pure function, it will always return the same result. Here’s an example of such a function:

```c
int f44() { return 44; }
```

You might think of this function as taking “nothing”, but as we’ve just seen, a function that takes “nothing” can never be called because there is no value representing “nothing.” So what does this function take? Conceptually, it takes a dummy value of which there is only one instance ever, so we don’t have to mention it explicitly. In Haskell, however, there is a symbol for this value: an empty pair of parentheses, (). So, by a funny coincidence (or is it a coincidence?), the call to a function of void looks the same in C++ and in Haskell. Also, because of the Haskell’s love of terseness, the same symbol () is used for the type, the constructor, and the only value corresponding to a singleton set. So here’s this function in Haskell:

```haskell
f44 :: () -> Integer
f44 () = 44
```

The first line declares that `f44` takes the type `()`, pronounced “unit,” into the type `Integer`. The second line defines `f44` by pattern matching the only constructor for unit, namely `()`, and producing the number 44. You call this function by providing the unit value `()`:

```c
f44 ()
```

Notice that every function of unit is equivalent to picking a single element from the target type (here, picking the `Integer` 44). In fact you could think of `f44` as a different representation for the number 44. This is an example of how we can replace explicit mention of elements of a set by talking about functions (arrows) instead. Functions from unit to any type A are in one-to-one correspondence with the elements of that set A.

What about functions with the `void` return type, or, in Haskell, with the unit return type? In C++ such functions are used for side effects, but we know that these are not real functions in the mathematical sense of the word. A pure function that returns unit does nothing: it discards its argument.

Mathematically, a function from a set A to a singleton set maps every element of A to the single element of that singleton set. For every A there is exactly one such function. Here’s this function for `Integer`:

```haskell
fInt :: Integer -> ()
fInt x = ()
```

You give it any integer, and it gives you back a unit. In the spirit of terseness, Haskell lets you use the wildcard pattern, the underscore, for an argument that is discarded. This way you don’t have to invent a name for it. So the above can be rewritten as:

```haskell
fInt :: Integer -> ()
fInt _ = ()
```

Notice that the implementation of this function not only doesn’t depend on the value passed to it, but it doesn’t even depend on the type of the argument.

Functions that can be implemented with the same formula for any type are called parametrically polymorphic. You can implement a whole family of such functions with one equation using a type parameter instead of a concrete type. What should we call a polymorphic function from any type to unit type? Of course we’ll call it `unit`:

```haskell
unit :: a -> ()
unit _ = ()
```

In C++ you would write this function as:

```cpp
template<class T>
void unit(T) {}
```

Next in the typology of types is a two-element set. In C++ it’s called `bool` and in Haskell, predictably, `Bool`. The difference is that in C++ `bool` is a built-in type, whereas in Haskell it can be defined as follows:

```haskell
data Bool = True | False
```

(The way to read this definition is that `Bool` is either `True` or `False`.) In principle, one should also be able to define a Boolean type in C++ as an enumeration:

```cpp
enum bool {
    true,
    false
};
```

but C++ `enum` is secretly an integer. The C++11 “`enum class`” could have been used instead, but then you would have to qualify its values with the class name, as in `bool::true` and `bool::false`, not to mention having to include the appropriate header in every file that uses it.

Pure functions from `Bool` just pick two values from the target type, one corresponding to `True` and another to `False`.

Functions to `Bool` are called predicates. For instance, the Haskell library `Data.Char` is full of predicates like `isAlpha` or `isDigit`. In C++ there is a similar library that defines, among others, `isalpha` and `isdigit`, but these return an `int` rather than a `Boolean`. The actual predicates are defined in `std::ctype` and have the form `ctype::is(alpha, c)`, `ctype::is(digit, c)`, etc.

## Challenges

1. Define a higher-order function (or a function object) `memoize` in your favorite language. This function takes a pure function `f` as an argument and returns a function that behaves almost exactly like `f`, except that it only calls the original function once for every argument, stores the result internally, and subsequently returns this stored result every time it’s called with the same argument. You can tell the memoized function from the original by watching its performance. For instance, try to memoize a function that takes a long time to evaluate. You’ll have to wait for the result the first time you call it, but on subsequent calls, with the same argument, you should get the result immediately.
2. Try to memoize a function from your standard library that you normally use to produce random numbers. Does it work?
3. Most random number generators can be initialized with a seed. Implement a function that takes a seed, calls the random number generator with that seed, and returns the result. Memoize that function. Does it work?
4. Which of these C++ functions are pure? Try to memoize them and observe what happens when you call them multiple times: memoized and not.
    1. The factorial function from the example in the text.
    2. `std::getchar()`
    3. `bool f() { std::cout << "Hello!" << std::endl; return true; }`
    4. `int f(int x) { static int y = 0; y += x; return y;}`
5. How many different functions are there from `Bool` to `Bool`? Can you implement them all?
6. Draw a picture of a category whose only objects are the types `Void`, `()` (unit), and `Bool`; with arrows corresponding to all possible functions between these types. Label the arrows with the names of the functions.

## Bibliography

1. Nils Anders Danielsson, John Hughes, Patrik Jansson, Jeremy Gibbons, [Fast and Loose Reasoning is Morally Correct](http://www.cs.ox.ac.uk/jeremy.gibbons/publications/fast+loose.pdf). This paper provides justification for ignoring bottoms in most contexts.

[⬅ 뒤로가기](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/1-category-the-essence-of-composition.md) / [다음으로 ➡](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/3-categories-great-and-small.md)