# Kleisli 범주

> 프로그래머를 위한 범주론의 이전 몇 개의 글에서 [크고 작은 범주](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/03-categories-great-and-small)의 몇 가지 예시를 제시했습니다. 이 글에서는 더 고급 예시를 통해 설명을 진행할 것입니다. 이 시리즈를 처음 접하는 경우 [목차](https://github.com/alstn2468/category-theory-for-programmers#part-1)를 확인하세요.

## 로그 합성

타입과 순수 함수를 범주로 모델링 하는 방법을 살펴보았습니다. 또한 범주론에서 부작용, 즉 순수하지 않은 함수를 모델링하는 방법이 있다고 언급했습니다. 실행을 기록하거나 추적하는 함수라는 예시를 살펴보겠습니다. 명령형 언어에서는 아래와 같이 전역 상태를 변경하여 구현될 가능성이 있습니다.

```cpp
string logger;

bool negate(bool b) {
     logger += "Not so! ";
     return !b;
}
```

이 기억된 버전의 함수는 로그를 생성하지 못하기 때문에 순수 함수가 아니라는 것을 알고 있습니다. 이 함수에는 부작용가 있습니다.

현대 프로그래밍에서 우리는 가능한 한 변경 가능한 전역 상태를 피하려고 노력합니다. 동시성의 복잡성 때문입니다. 그리고 라이브러리에 이런 코드를 넣지 않을 것입니다.

다행히도 이 함수를 순수하게 만드는 것이 가능합니다. 로그를 명시적으로 안팎으로 전달하기만 하면 됩니다. 문자열 인자를 추가하고 업데이트된 로그가 포함된 문자열과 일반 출력을 쌍으로 만들어 보겠습니다.

```cpp
pair<bool, string> negate(bool b, string logger) {
     return make_pair(!b, logger + "Not so! ");
}
```

이 함수는 순수하고 부작용이 없으며 동일한 인자로 호출될 때마다 동일한 쌍을 반환하며 필요한 경우 기억할 수 있습니다. 그러나 로그의 누적되는 특성을 고려할 때 주어진 호출로 이어질 수 있는 모든 가능한 로그들을 기억해야 합니다. 아래에 각각 기억되는 항목이 있습니다.

```cpp
negate(true, "It was the best of times. ");
// 또는
negate(true, "It was the worst of times. ");
// 등등
```

또한 라이브러리 기능을 위한 아주 좋은 인터페이스도 아닙니다. 호출자는 반환 타입의 문자열을 자유롭게 무시할 수 있으므로 큰 부담은 아닙니다. 그러나 입력으로 문자열을 전달해야 하므로 불편할 수 있습니다.

같은 일을 덜 방해가 되는 방법으로 관심사를 분리하는 방법이 있을까요? 이 간단한 예시에서 negate 함수의 목적은 하나의 Boolena을 다른 것으로 바꾸는 것입니다. 로그를 남기는 것은 2차적입니다. 물론 기록되는 메시지는 함수에 따라 다르지만 메시지를 하나의 연속 로그로 집계하는 작업은 별개의 문제입니다. 우리는 여전히 함수가 문자열을 생성하기를 원하지만, 로그 생성에서 부담을 덜어주고 싶습니다. 타협할 수 있는 해결책은 아래와 같습니다.

```cpp
pair<bool, string> negate(bool b) {
     return make_pair(!b, "Not so! ");
}
```

이 아이디어는 로그가 함수 호출 간에 수집된다는 것입니다.

이것이 어떻게 가능한지 보기 위해 조금 더 현실적인 예시로 바꾸어 보겠습니다. 문자열에서 소문자를 대문자로 바꾸는 하나의 함수가 있습니다.

```cpp
string toUpper(string s) {
    string result;
    int (*toupperp)(int) = &toupper; // toupper는 overload 되었습니다.
    transform(begin(s), end(s), back_inserter(result), toupperp);
    return result;
}
```

다른 하나는 문자열을 공백 경계로 문자열 벡터로 나눕니다.

```cpp
vector<string> toWords(string s) {
    return words(s);
}
```

실제 작업은 보조 함수 words에서 수행됩니다.

```cpp
vector<string> words(string s) {
    vector<string> result{""};
    for (auto i = begin(s); i != end(s); ++i)
    {
        if (isspace(*i))
            result.push_back("");
        else
            result.back() += *i;
    }
    return result;
}
```

<img src='../images/part-1/piggyback.jpeg' height='120' align='right' />

`toUpper` 및 `toWords` 함수를 수정해 일반 반환 값 위에 메시지 문자열을 피기백(piggyback) 하도록 합니다.

우리는 이런 함수의 반환 값을 "장식"(embellish)할 것입니다. 첫 번째 컴포넌트가 임의 타입 A의 값이고 두 번째 구성 요소가 문자열인 쌍을 캡슐화하는 템플릿 `Writer`를 정의해 일반적인 방식으로 처리해 보겠습니다.


```cpp
template<class A>
using Writer = pair<A, string>;
```

아래는 장식된 함수입니다.

```cpp
Writer<string> toUpper(string s) {
    string result;
    int (*toupperp)(int) = &toupper;
    transform(begin(s), end(s), back_inserter(result), toupperp);
    return make_pair(result, "toUpper ");
}

Writer<vector<string>> toWords(string s) {
    return make_pair(words(s), "toWords ");
}
```

이 두 함수를 문자열을 대문자로 바꾸고 이를 단어로 나누는 또 다른 장식된 함수로 합성하고 그 작업의 로그를 생성하기를 원합니다. 방법은 아래와 같습니다.

```cpp
Writer<vector<string>> process(string s) {
    auto p1 = toUpper(s);
    auto p2 = toWords(p1.first);
    return make_pair(p2.first, p1.second + p2.second);
}
```

우리는 목표를 달성했습니다. 로그 수집은 더 이상 개별 함수의 문제가 아닙니다. 이것들은 자체적인 메시지를 생성한 다음 외부에서 더 큰 로그로 연결합니다.

이제 이 스타일로 작성된 전체 프로그램을 상상해 보세요. 반복적이고 오류가 발생하기 쉬운 코드의 악몽입니다. 하지만 우리는 프로그래머입니다. 우리는 반복적인 코드를 처리하는 방법을 알고 있습니다. 우리는 이것들의 함수 합성 자체를 추상화해야 합니다. 그러나 합성은 범주론의 본질이므로 더 많은 코드를 작성하기 전에 범주 관점에서 문제를 분석해 보겠습니다.

## Writer 범주

몇 가지 추가 함수를 피기백 하기 위해 여러 함수의 반환 타입을 꾸미는 아이디어는 매우 유용한 것으로 판명되었습니다. 우리는 그것에 해당하는 더 많은 예시를 보게 될 것입니다. 시작점은 타입과 함수의 일반 범주입니다. 우리는 타입을 객체로 남겨두지만 사상을 장식된 함수로 재정의할 것입니다.

예를 들어 `int`에서 `bool`로 가는 `isEven` 함수를 꾸미고 싶다고 가정해봅시다. 우리는 그것을 장식된 함수로 표현되는 사상으로 바꿉니다. 중요한 점은 장식된 함수가 쌍을 반환하더라도 이 사상은 여전히 int 객체와 bool 사이의 화살표로 간주한다는 것입니다.

```cpp
pair<bool, string> isEven(int n) {
     return make_pair(n % 2 == 0, "isEven ");
}
```

범주의 법칙에 따라 우리는 이 형태를 객체 bool에서 무엇이든 가는 다른 사상으로 합성할 수 있어야 합니다. 특히, 이전 negate 함수로 합성할 수 있어야 합니다.

```cpp
pair<bool, string> negate(bool b) {
     return make_pair(!b, "Not so! ");
}
```

분명히, 우리는 입력/출력 불일치 때문에 이 두 타입을 일반 함수를 합성하는 것과 같은 방식으로 합성할 수 없습니다. 합성은 아래와 같아야 합니다.

```cpp
pair<bool, string> isOdd(int n) {
    pair<bool, string> p1 = isEven(n);
    pair<bool, string> p2 = negate(p1.first);
    return make_pair(p2.first, p1.second + p2.second);
}
```

그래서 우리가 합성하고 있는 이 새로운 범주에서 두 가지 사상의 합성에 대한 레시피가 있습니다.

1. 첫 번째 사상에 해당하는 꾸며진 함수 실행
2. 결과 쌍의 첫 번째 컴포넌트를 추출하고 두 번째 사상에 해당하는 꾸며진 함수에 전달합니다.
3. 첫 번째 결과의 두 번째 컴포넌트(문자열)와 두 번째 결과의 두 번째 컴포넌트(문자열)를 연결합니다.
4. 최종 결과의 첫 번째 컴포넌트와 연결된 문자열을 결합한 새로운 쌍을 반환합니다.

이 합성을 C++에서 고차 함수로 추상화하려면 범주의 새 객체에 해당하는 세 가지 타입으로 매개 변수화된 템플릿을 사용해야 합니다. 규칙에 따라 합성할 수 있는 두 개의 장식된 함수를 사용하고 세 번째 장식된 함수를 반환해야 합니다.

```cpp
template<class A, class B, class C>
function<Writer<C>(A)> compose(function<Writer<B>(A)> m1,
                               function<Writer<C>(B)> m2)
{
    return [m1, m2](A x) {
        auto p1 = m1(x);
        auto p2 = m2(p1.first);
        return make_pair(p2.first, p1.second + p2.second);
    };
}
```

이제 이전 예시로 돌아가서 이 새 템플릿을 이용해 `toUpper`와 `toWords`의 합성을 구현할 수 있습니다.

```cpp
Writer<vector<string>> process(string s) {
   return compose<string, string, vector<string>>(toUpper, toWords)(s);
}
```

`compose` 템플릿으로 타입을 전달하는 것은 여전히 복잡합니다. 이는 반환 타입 추론이 있는 일반화된 람다 함수를 지원하는 C++14 호환 컴파일러를 사용하면 피할 수 있습니다. (이 코드에 대한 크레딧은 Eric Niebler에게 있습니다)

```cpp
auto const compose = [](auto m1, auto m2) {
    return [m1, m2](auto x) {
        auto p1 = m1(x);
        auto p2 = m2(p1.first);
        return make_pair(p2.first, p1.second + p2.second);
    };
};
```

이 새로운 정의에서 `process`의 구현은 아래와 같이 간단해집니다.

```cpp
Writer<vector<string>> process(string s){
   return compose(toUpper, toWords)(s);
}
```

그러나 아직 끝나지 않았습니다. 우리의 새로운 범주에서 합성을 정의했지만, 항등 사상은 무엇인가요? 이것은 우리의 일반적인 항등함수가 아닙니다. 이것들은 A 타입에서 A타입으로의 사상이어야 하며 이는 꾸며진 함수들의 형식을 의미합니다.

```cpp
Writer<A> identity(A);
```

이것들은 합성과 관련하여 unit처럼 동작해야 합니다. 합성에 대한 정의를 보면 항등 사상이 변경 없이 인자를 전달하고 로그에 빈 문자열만 제공해야 함을 알 수 있습니다.

```cpp
template<class A>
Writer<A> identity(A x) {
    return make_pair(x, "");
}
```

방금 정의한 범주가 실제로 규칙을 따르는 범주임을 쉽게 확신할 수 있습니다. 특히, 우리의 합성은 사소하게 결합성이 있습니다. 각 쌍의 첫 번째 컴포넌트에서 어떤 일이 일어나는지 따라가면 결합할 수 있는 일반 함수의 합성일 뿐입니다. 두 번째 컴포넌트가 연결되었다면 연결 또한 결합입니다.

예리한 독자는 이 구조를 문자열 모노이드뿐만 아니라 모든 모노이드로 일반화하는 것이 쉽다는 것을 알 수 있습니다. `compose` 내부에 `+`대신 `mappend`를 사용하고 `identity` 내부에 `""` 대신 `mempty`를 사용할 것입니다. 문자열만 기록하는 것으로 제한할 이유는 없습니다. 좋은 라이브러리 작성자는 라이브러리가 동작하도록 하는 최소한의 제약 조건을 식별할 수 있어야 합니다. 여기서 로깅 라이브러리의 유일한 요구 사항은 로그에 단일 속성이 있어야 한다는 것입니다.

## Haskell에서의 Writer

Haskell로 작성한 동일한 내용은 더 간결하며 컴파일러로부터 더 많은 도움을 받습니다. `Writer` 타입을 정의하는 것으로 시작하겠습니다.

```haskell
type Writer a = (a, String)
```

여기에서는 C++의 `typedef`(또는 `using`)에 해당하는 타입 별칭을 정의하고 있습니다. `Writer` 타입은 `a` 타입 변수로 매개 변수화되며 `a`와 `String` 쌍과 동일합니다. 쌍에 대한 구문은 쉼표로 구분된 괄호 안에 두 항목만 있으며 문법이 최소화되어있습니다.

우리의 사상은 임의의 타입에서 일부 `Writer` 타입에 이르는 함수입니다.

```haskell
a -> Writer b
```

우리는 합성을 "물고기"라고도 하는 재미있는 중위 연산자로 선언할 것입니다.

```haskell
(>=>) :: (a -> Writer b) -> (b -> Writer c) -> (a -> Writer c)
```

두 개의 인자를 받는 함수이며, 각각은 자체적으로 함수이고 함수를 반환합니다. 첫 번째 인자는 `(a->Writer b)` 타입이고 두 번째 인자는 `(b->Writer c)`이며 결과는 `(a->Writer c)`입니다.

이 중위 연산자의 정의는 아래와 같습니다. 두 개의 인자 `m1`과 `m2`가 물고기 기호의 양쪽에 표시됩니다.

```haskell
m1 >=> m2 = \x ->
    let (y, s1) = m1 x
        (z, s2) = m2 y
    in (z, s1 ++ s2)
```

결과는 하나의 인자 `x`의 람다 함수입니다. 람다는 백 슬래시로 작성됩니다. 다리가 절단된 그리스 문자 λ로 생각하세요.

`let` 표현 식을 사용하면 보조 변수를 선언할 수 있습니다. 여기서 `m1`을 호출한 결과는 `(y, s1)` 변수 쌍의 패턴에 일치됩니다. 첫 번째 패턴의 `y` 인자를 사용해 `m2`를 호출한 결과는 `(z, s2)`와 일치합니다.

Haskell에서는 C++에서와 같이 접근자를 사용하는 대신 일치 쌍을 패턴화하는 것이 일반적입니다. 그 외에는 두 구현 사이에 매우 직접적인 대응이 있습니다.

`let` 표현 식의 전체 값은 in 절에 지정되어 있습니다. 여기서 쌍은 첫 번째 컴포넌트가 `z`이고 두 번째 컴포넌트가 두 문자열의 연결인 `s1++s2`입니다.

또한 우리의 범주에 대한 항등 사상을 정의할 것이지만, 훨씬 나중에 명확해질 이유로 이것을 `return`이라고 부를 것입니다.

```haskell
return :: a -> Writer a
return x = (x, "")
```

완성을 위해 `upCase` 및 `toWords` 함수의 Haskell 버전을 사용하겠습니다.

```haskell
upCase :: String -> Writer String
upCase s = (map toUpper s, "upCase ")
```

```haskell
toWords :: String -> Writer [String]
toWords s = (words s, "toWords ")
```

`map` 함수는 C++의 `transform`에 해당합니다. 문자열 `s`에 문자 함수 `toUpper`를 적용합니다. 보조 기능 `words`는 표준 Prelude 라이브러리에 정의되어 있습니다.

마지막으로 두 함수의 합성은 물고기 연산자의 도움으로 수행됩니다.

```haskell
process :: String -> Writer [String]
process = upCase >=> toWords
```

## Kleisli 범주

여러분들은 제가 그 자리에서 이 범주를 발명하지 않았다고 짐작했을 것입니다. 이것은 모나드를 기반으로 하는 범주인 Kleisli 범주의 예시입니다. 우리는 아직 모나드에 대해 논의할 준비가 되지 않았지만, 모나드가 무엇을 할 수 있는지 맛보고 싶었습니다. 제한된 목적을 위해 Kleisli 범주에는 기본 프로그래밍 언어의 타입이 객체로 있습니다. 타입 A에서 타입 B로의 사상은 특정 꾸밈을 사용해 A에서 B로 파생된 타입으로 이동하는 함수입니다. 각 Kleisli 범주는 그런 사상의 자체적인 합성과 해당 합성에 대한 항등 사상을 정의합니다. (나중에 "꾸밈"이라는 부정확한 용어가 범주의 엔도펑터(endofunctor) 개념에 해당함을 알 수 있습니다)

이 글에서 범주의 기초로 사용한 특정 모나드를 Writer 모나드라고 하며 함수의 실행과 기록을 추적하는 데 사용됩니다. 또한 순수 계산에 이펙트를 포함하기 위한 보다 일반적인 방법의 예시이기도 합니다. 이전에 bottom을 무시하면 집합 범주에서 프로그래밍 언어 타입과 함수를 모델링할 수 있음을 보았습니다. 여기에서 우리는 이 모델을 약간 다른 범주로 확장했습니다. 이 범주는 사상이 꾸며진 함수로 표현되고 그 합성은 한 함수의 출력을 다른 함수의 입력으로 전달하는 것 이상을 수행합니다. 우리는 한 가지 더 자유롭게 사용할 수 있습니다. 바로 합성 자체입니다. 이것은 명령형 언어에서 전통적으로 부작용을 사용하여 구현되는 프로그램에 단순한 표기 의미론을 부여하는 것을 가능하게 하는 정확한 자유도입니다.

## 도전

인자의 가능한 모든 값에 대해 정의되지 않은 함수를 부분 함수라고 합니다. 수학적 의미의 함수가 아니므로 표준 범주형 틀에 맞지 않습니다. 그러나 `optional`로 꾸며진 타입을 반환하는 함수로 나타낼 수 있습니다.

```cpp
template<class A> class optional {
    bool _isValid;
    A    _value;
public:
    optional()    : _isValid(false) {}
    optional(A v) : _isValid(true), _value(v) {}
    bool isValid() const { return _isValid; }
    A value() const { return _value; }
};
```

예를 들어, 아래는 장식된 함수 `safe_root`의 구현입니다.

```cpp
optional<double> safe_root(double x) {
    if (x >= 0) return optional<double>{sqrt(x)};
    else return optional<double>{};
}
```

도전할 것들은 아래와 같습니다.

1. 부분 함수에 대한 Kleisli 범주를 구성합니다. (합성 및 항등 정의)
2. 인자가 0과 다른 경우 인자의 유효한 역수를 반환하는 꾸며진 함수 `safe_reciprocal`을 구현합니다.
3. `safe_root`와 `safe_reciprocal`을 합성하여 가능할 때마다 `sqrt(1/x)`를 계산하는 `safe_root_reciprocal`을 구현합니다.

## 감사의 말

초안을 읽고 C++14의 고급 기능을 사용하여 타입 추론을 유도하는 더 좋은 `compose`의 구현을 제공한 Eric Niebler에게 감사드립니다. 타입 특성(type traits)을 사용하여 동일한 작업을 수행하는 구식 템플릿 마법을 전체적으로 잘라낼 수 있었습니다. 몇 가지 중요한 사항을 명확히 하는 데 도움이 되는 유용한 의견을 주신 Gershom Bazerman에게도 감사드립니다.

[⬅ 뒤로가기](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/03-categories-great-and-small.md) / [다음으로 ➡](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/05-products-and-coproducts.md)

<div align="center">

<sub><sup>Translated by <a href="https://github.com/alstn2468">@Minsu Kim</a></sup></sub><small>✌</small>

</div>