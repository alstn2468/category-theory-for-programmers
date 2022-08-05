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

타이핑하는 원숭이 사고 실험의 일반적인 목표는 셰익스피어의 전체 작품을 생산하는 것입니다. 반복문에 맞춤법 검사기와 문법 검사기가 있으면 확률이 크게 높아집니다. 아날로그 타입 검사기는 로미오가 사람으로 선언되면 로미오가 강한 중력장에서 잎을 돋우거나 광자를 가두는 일은 일어나지 않도록 할 것입니다. (_컴파일 오류로 불가능한 것이 실행되는 일이 없도록 한다는 의미로 해석됨_)

## 합성 가능성에 관한 타입

범주론은 화살표를 합성하는 것입니다. 그러나 두 개의 화살표는 합성할 수 없습니다. 한 화살표의 대상 객체는 다음 화살표의 원본 객체와 같아야 합니다. 프로그래밍에서 우리는 한 함수의 결과를 다른 함수로 전달합니다. 대상 함수가 출처 함수에서 생성된 데이터를 올바르게 해석할 수 없는 경우 프로그램이 동작하지 않습니다. 합성이 동작하려면 두 끝이 맞아야 합니다. 언어의 타입 시스템이 강할수록 이 일치를 더 잘 설명하고 기계적으로 확인할 수 있습니다.

강력한 정적 타입 검사에 대해 제가 들은 유일한 진지한 주장은 의미상 올바른 일부 프로그램을 제거할 수 있다는 것입니다. 실제로 이건 매우 드물게 발생하며 어떤 경우에도 모든 언어는 실제로 필요할 때 타입 시스템을 우회할 수 있는 일종의 백도어를 제공합니다. Haskell에도 `unsafeCoerce`가 있습니다. 그러나 그 기능은 신중하게 사용해야 합니다. Franz Kafka의 캐릭터인 Gregor Samsa는 거대한 버그로 변신할 때 타입 시스템을 깨고 우리는 그것이 어떻게 끝나는지 알고 있습니다.

제가 많이 듣는 또 다른 주장은 타입을 다루는 것이 프로그래머에게 너무 많은 부담을 준다는 것입니다. 컴파일러가 사용되는 문맥에서 대부분의 타입을 추론할 수 있도록 하는 타입 추론이라는 기술이 있다는 점을 제외하고는 C++로 반복자에 대한 몇 가지 선언을 직접 작성해야 했기 때문에 이 감정에 공감할 수 있었습니다. 이제 C++에서는 `auto` 변수를 선언하고 컴파일러가 해당 타입을 파악하도록 할 수 있습니다.

Haskell에서는 드문 경우를 제외하고 타입 어노테이션은 선택 사항입니다. 프로그래머는 코드의 의미에 대해 많은 것을 알 수 있고 컴파일 오류를 더 쉽게 이해할 수 있기 때문에 어쨌든 사용하는 경향이 있습니다. 타입을 설계해 프로젝트를 시작하는 것은 Haskell의 일반적인 관행입니다. 나중에 타입 어노테이션이 구현을 주도하고 컴파일러에 의한 주석이 됩니다.

강력한 정적 타입은 종종 코드를 테스트하지 않는 핑계로 사용됩니다. 때때로 Haskell 프로그래머가 "컴파일이 됐으니, 이건 정확해."라고 말하는 것을 들을 수 있습니다. 물론 올바른 출력을 생성한다는 의미에서 타입을 수정하는 프로그램이 정확하다는 보장은 없습니다. 이런 무심한 태도의 결과는 여러 연구에서 Haskell이 예상했던 것만큼 코드 품질에서 앞서지 못했다는 것입니다. 상업적 환경에서 버그 수정에 대한 압력은 소프트웨어 개발의 경제성 및 최종 사용자의 관용과 모두 관계가 있고 프로그래밍 언어나 방법론과는 거의 관계가 없는 특정 품질 수준까지만 적용되는 것으로 보입니다. 더 나은 기준은 얼마나 많은 프로젝트가 일정보다 늦어지거나 기능이 크게 저하되어 제공되는지 측정하는 것입니다.

단위 테스트가 강력한 타입을 대체할 수 있다는 주장에 대해 강타입 언어의 일반적인 리팩토링 방법(특정 함수의 인자 타입 변경)을 고려할 수 있습니다. 강타입 언어에서는 해당 함수의 선언을 수정한 다음 모든 빌드가 깨지는 곳을 수정하는 것으로 충분합니다. 약타입 언어에서는 함수가 이제 다른 데이터를 기대한다는 사실을 호출부로 전파할 수 없습니다. 단위 테스트는 일부 불일치를 파악할 수 있지만 테스트는 항상 결정론적 프로세스라기보다는 확률론적 프로세스입니다. 테스트는 증명을 대신할 수 없습니다.

## 타입이란 무엇일까요?

타입에 대한 가장 단순한 직관은 타입이 값의 집합이라는 것입니다. `Bool` 타입(하스켈에서 구체적인 타입은 대문자로 시작하는 것을 기억하세요)은 `True`와 `False` 두 요소의 집합입니다. `Char` 타입은 `'a'` 또는 `'q'`와 같은 모든 유니코드 문자 집합입니다.

집합은 유한하거나 무한할 수 있습니다. `Char` 타입의 목록과 동의어는 `String` 타입은 무한 집합의 예시입니다.

`x`를 `Integer`로 선언하는 방법은 아래와 같습니다.

```haskell
x :: Integer
```

우리는 이것이 정수 집합의 요소라고 얘기하고 있습니다. Haskell의 `Integer`는 무한집합이며 임의의 정밀한 산술을 수행하는 데에 사용할 수 있습니다. C++의 `int`와 마찬가지로 기계 타입에 해당하는 유한 집합 `Int`도 있습니다.

이런 타입 및 집합을 식별하는 것을 까다롭게 하는 몇 가지 미묘한 점이 있습니다. 순환 정의를 포함하는 다형성 함수와 모든 집합의 집합을 가질 수 없다는 사실에는 문제가 있습니다. 하지만 제가 약속했듯 저는 수학을 고집하지 않을 것입니다. 좋은 점은 **Set**이라고 하는 집합 카테고리가 있다는 것입니다. **Set**에서 객체는 집합이고 사상(화살표)은 함수입니다.

**Set**은 객체 내부를 실제로 들여다보고 많은 직관을 얻을 수 있기 때문에 매우 특별한 범주입니다. 예를 들어 빈 집합에는 요소가 없다는 것을 알고 있습니다. 우리는 특별한 단일 요소 집합이 있다는 것을 알고 있습니다. 우리는 함수가 하나의 집합 요소를 다른 집합에 대응시키는 것을 알고 있습니다. 두 요소를 하나로 대응시킬 수 있지만 하나의 요소를 두 개로 대응시킬 수는 없습니다. 항등함수는 집합의 각 요소를 자기 자신과 대응시키는 식으로 진행되는 것을 알고 있습니다. 계획은 이 모든 정보를 점차 잊어버리고 그 대신 모든 개념을 순수한 범주적 용어, 즉 객체와 화살표로 표현하는 것입니다.

이상적인 세계에서는 우리는 Haskell 타입은 집합이고 Haskell 함수는 집합 사이의 수학적 함수라고 말할 것입니다. 여기에는 한 가지 작은 문제가 있습니다. 수학 함수는 코드를 실행하지 않고 답만 알고 있습니다. Haskell 함수는 답을 계산해야 합니다. 유한한 수의 단계에서 답을 얻을 수 있다면 문제가 되지 않습니다. 그 수가 매우 클 수 있습니다. 그러나 재귀를 포함하는 일부 계산이 있으며 그 계산은 종료되지 않을 수 있습니다. 종료 함수와 종료되지 않은 함수를 구별하는 것은 불가능하기 때문에 Haskell에서 종료되지 않는 함수를 금지할 수 없습니다. 유명한 정지 문제입니다. 이것이 바로 컴퓨터 과학자들이 여러분의 관점에 따라 `_|_` 또는 유니코드 ⊥로 표현하는 bottom이라고 하는 하나의 특별한 값으로 모든 타입을 확장하는 기발한 아이디어 또는 중요한 해킹을 생각해 낸 이유입니다. 이 "값"은 종료되지 않는 계산에 해당합니다.

```haskell
f :: Bool -> Bool
```

따라서 위와 같이 선언된 함수는 `True`, `False` 또는 `_|_`을 반환할 수 있습니다. `_|_`는 절대 종료되지 않음을 의미합니다.

흥미롭게도 bottom을 타입 시스템의 일부로 받아들이면 모든 런타임 오류를 bottom으로 처리하고 함수가 bottom을 명시적으로 반환하도록 허용하는 것이 편리합니다. bottom은 일반적으로 다음과 같이 `undefined` 표현을 사용해 수행됩니다.

```haskell
f :: Bool -> Bool
f x = undefined
```

이 타입 정의는 `undefined`가 `Bool`을 포함한 모든 타입의 구성원인 bottom으로 평가되기 때문에 확인합니다.

```haskell
f :: Bool -> Bool
f = undefined
```

bottom도 `Bool->Bool`의 구성 요소이기 때문에 위와 같이 `x`를 제외하고 작성할 수도 있습니다.

가능한 모든 인자에 대해 유효한 결과를 반환하는 전체 함수와 달리 bottom을 반환할 수 있는 함수를 부분 함수라고 합니다.

bottom 때문에 **Set**이 아니라 **Hask**라고 하는 Haskell 타입 및 함수의 범주를 확인할 수 있습니다. 이론적으로 볼 때 이것은 끝없는 고민의 원인이므로 이 시점에서 저는 이 추리의 선을 끊겠습니다. 실용적인 관점에서 볼 때 비종료 함수와 bottom을 무시하고 **Hask**를 진정한 집합으로 취급하는 것은 괜찮습니다. (마지막 참고 문헌을 참조하세요)

## 수학적 모델이 필요한 이유는 무엇일까요?

프로그래머들은 사용하는 프로그래밍 언어의 문법에 아주 익숙합니다. 언어의 이런 측면은 일반적으로 언어 사양의 맨 처음에 형식 표기법을 사용해 설명됩니다. 그러나 언어의 의미 또는 의미론은 설명하기 훨씬 어렵습니다. 그것은 훨씬 더 많은 페이지가 필요하고, 충분히 형식적이지 않으며, 거의 완성되지 않습니다. 따라서 언어 변호사들과 모든 전문 서적 업계 간의 끝없는 토론은 언어 표준의 더 세밀한 부분입니다.

언어의 의미론을 설명하기 위한 공식 도구가 있지만 복잡성으로 주로 실제 프로그래밍 거물이 아닌 단순화된 학술 언어와 함께 사용됩니다. 연산 의미론이라고 하는 도구 중 하나는 프로그램 실행 메커니즘을 설명합니다. 이 도구는 형식화된 이상적인 인터프리터를 정의합니다. C++과 같은 산업 언어의 의미는 일반적으로 "추상 기계"라는 용어로 비공식적 연산 추론을 사용하여 설명됩니다.

문제는 연산 의미론을 사용해 프로그램에 대한 것을 증명하는 것이 매우 어렵다는 것입니다. 프로그램의 특징을 표시하려면 본질적으로 이상적인 인터프리터를 통해 "실행"해야 합니다.

프로그래머가 형식적 정확성 증명을 수행하지 않는 것은 중요하지 않습니다. 우리는 항상 올바른 프로그램을 작성한다고 "생각"합니다. 누구도 키보드 앞에 앉아 "몇 줄의 코드를 던져보고 무슨 일이 일어나는지 볼게요"라고 말하지 않습니다. 우리는 작성하는 코드가 원하는 결과를 생성하는 특정 작업을 수행하겠다고 생각합니다. 우리는 보통 원하는 결과가 생성되지 않으면 상당히 놀랍니다. 즉, 우리가 작성 하는 프로그램에 대해 추론하고 일반적으로 머릿속에서 인터프리터를 실행해 수행합니다. 모든 변수를 추적하는 것은 어렵습니다. 컴퓨터는 프로그램 실행에 능숙합니다. 하지만 인간은 그렇지 않습니다. 인간이 그렇더라면 컴퓨터는 필요하지 않았을 것입니다.

그러나 대안이 있습니다. 이것을 표기 의미론이라고 하며 수학을 기반으로 합니다. 표기 의미론에서 모든 프로그래밍 합성에는 수학적 해석이 제공됩니다. 이것을 통해 프로그램의 속성을 증명하려면 수학 정리를 증명하면 됩니다. 증명하기 어렵다고 생각할 수 있지만 인간은 수천 년 동안 수학적 방법을 만들어 왔기 때문에 활용할 수 있는 축적된 지식이 풍부합니다. 또한 전문 수학자들이 증명하는 종류의 정리와 비교할 때 프로그래밍에서 우리가 직면한 문제는 사소하지 않더라도 일반적으로 매우 간단합니다.

표기 의미론에 순응하는 언어인 Haskell에서 팩토리얼을 계산하는 함수 정의는 아래와 같이 작성할 수 있습니다.

```haskell
fact n = product [1..n]
```

표현식 `[1..n]`은 1에서 n까지의 정수 목록입니다. `product` 함수는 목록의 모든 요소를 곱합니다. 그것은 수학에서 가져온 팩토리얼의 정의와 같습니다. 아래의 C언어 코드와 비교해 보세요.


```c
int fact(int n) {
    int i;
    int result = 1;
    for (i = 2; i <= n; ++i)
        result *= i;
    return result;
}
```

더 얘기할 필요가 있을까요?

좋습니다. 저는 이게 저렴한 한 방이었다는 것을 먼저 인정할 것입니다. 팩토리얼 함수는 명백한 수학적 표시를 가지고 있습니다. 예리한 독자는 "키보드에서 문자를 읽거나 네트워크를 통해 패킷을 보내는 수학적 모델은 무엇인가요?"와 같이 질문할 수 있습니다. 오랫동안 그것들은 다소 복잡한 설명으로 이어지는 어색한 질문이었을 수 있습니다. 표기 의미론은 유용한 프로그램을 작성하는 데 필수적이며 동작 의미론으로 쉽게 해결할 수 있는 상당수의 중요한 작업에 적합하지 않은 것처럼 보였습니다. 돌파구는 범주론에서 나왔습니다. Eugenio Moggi는 계산 효과가 모나드에 대응될 수 있음을 발견했습니다. 이것은 표기 의미론에 새로운 생명을 부여하고 순수 함수형 프로그램을 더 유용하게 만들 뿐만 아니라 전통적인 프로그래밍에 새로운 빛을 비춰주는 중요한 발견으로 밝혀졌습니다. 나중에 더 많은 범주형 도구를 개발할 때 모나드에 관해 이야기하겠습니다.

프로그래밍을 위한 수학적 모델을 갖는 것의 중요한 이점 중 하나는 소프트웨어의 정확성에 대한 공식 증명을 수행할 수 있다는 것입니다. 소비자 소프트웨어를 작성할 때는 이것이 중요하지 않은 것처럼 보일 수 있지만, 실패의 대가가 엄청나거나 인간의 생명이 위태로운 프로그래밍 영역이 있습니다. 그러나 건강 시스템을 위한 웹 애플리케이션을 작성할 때도 Haskell 표준 라이브러리의 함수와 알고리즘이 정확성의 증거와 함께 제공된다는 생각에 감사할 것입니다.

## 순수 함수와 비순수 함수

The things we call functions in C++ or any other imperative language, are not the same things mathematicians call functions. A mathematical function is just a mapping of values to values.

We can implement a mathematical function in a programming language: Such a function, given an input value will calculate the output value. A function to produce a square of a number will probably multiply the input value by itself. It will do it every time it’s called, and it’s guaranteed to produce the same output every time it’s called with the same input. The square of a number doesn’t change with the phases of the Moon.

Also, calculating the square of a number should not have a side effect of dispensing a tasty treat for your dog. A “function” that does that cannot be easily modelled as a mathematical function.

In programming languages, functions that always produce the same result given the same input and have no side effects are called pure functions. In a pure functional language like Haskell all functions are pure. Because of that, it’s easier to give these languages denotational semantics and model them using category theory. As for other languages, it’s always possible to restrict yourself to a pure subset, or reason about side effects separately. Later we’ll see how monads let us model all kinds of effects using only pure functions. So we really don’t lose anything by restricting ourselves to mathematical functions.

## 타입의 예시

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

## 도전

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

## 참고 문헌

1. Nils Anders Danielsson, John Hughes, Patrik Jansson, Jeremy Gibbons, [Fast and Loose Reasoning is Morally Correct](http://www.cs.ox.ac.uk/jeremy.gibbons/publications/fast+loose.pdf). This paper provides justification for ignoring bottoms in most contexts.

[⬅ 뒤로가기](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/1-category-the-essence-of-composition.md) / [다음으로 ➡](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/3-categories-great-and-small.md)