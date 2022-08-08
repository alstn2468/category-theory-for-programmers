# 크고 작은 범주

> 프로그래머를 위한 범주론의 이전 글에서는 [타입과 함수](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/2-types-and-functions.md)에 관해 이야기했습니다. 시리즈를 처음 접한다면 [목차](https://github.com/alstn2468/category-theory-for-programmers#part-1)를 확인하세요.

다양한 예시를 통해 범주에 대한 진정한 감상을 얻을 수 있습니다. 범주는 모든 모양과 크기로 제공되며 종종 예상하지 않은 위치에 나타납니다. 아주 간단한 것부터 시작해보겠습니다.


## 객체가 없는 범주

가장 사소한 범주는 객체가 없고 결과적으로 사상이 없는 범주입니다. 그 자체로 매우 슬픈 범주이지만 모든 범주의 범주(하나가 있습니다)와 같이 다른 범주의 맥락에서 중요할 수 있습니다. 비어있는 집합이 의미가 있다고 생각한다면 빈 범주는 의미가 없다고 생각한 이유가 무엇인가요?

## 단순 그래프

화살표로 객체를 연결하는 것만으로 범주를 만들 수 있습니다. 방향 그래프로 시작하여 단순히 더 많은 화살표를 추가해 범주로 만드는 것을 상상할 수 있습니다. 먼저 각 노드에 항등(identity) 화살표를 추가합니다. 그런 다음 하나의 끝이 다른 화살표의 시작과 일치하는 두 개의 화살표(즉, 두 개의 합성 가능한 화살표)에 대해 새 화살표를 추가하여 합성으로 사용할 수 있습니다. 새 화살표를 추가할 때마다 다른 화살표(항등 화살표 제외) 및 자기 자신과의 합성도 고려해야 합니다. 일반적으로 무한히 많은 화살표가 생성되지만 괜찮습니다.

이 과정을 보는 다른 방법은 그래프의 모든 노드에 대한 객체와 합성할 수 있는 그래프의 간선의 모든 연결을 사상으로 갖는 범주로 만드는 것입니다. (항등 사상을 길이가 0인 연결의 특별한 경우로 고려할 수 있습니다)

이런 범주를 주어진 그래프에 의해 생성된 자유 범주라고 합니다. 주어진 구조를 최소한의 항목으로 확장해 그 법칙(여기서는 범주의 법칙)을 만족시키는 과정으로, 자유 구성의 한 예시입니다. 앞으로 더 많은 예시를 보게 될 것입니다.

## 순서

그리고 이제 완전 다른 것을 위해 사상이 객체 간의 관계(작거나 같음의 관계)인 범주가 정말 범주인지 확인해 보겠습니다. 모든 객체는 항등 사상을 가지고 있는 것을 확인할 수 있습니다. 모든 객체는 자기 자신보다 작거나 같음을 확인할 수 있습니다. 합성되어있는 것 또한 확인할 수 있습니다. a <= b이고 b <= c이면 a <= c를 만족하는 것을 확인할 수 있으므로 합성이 결합법칙을 만족하는 것도 확인할 수 있습니다. 이와 같은 관계가 있는 집합을 원순서 집합(preorder set)이라고 하므로 원순서 집합은 실제로 범주입니다.

또한 a <= b 및 b <= a이면 a가 b와 같아야 한다는 추가 조건을 충족하는 더 강력한 관계를 가질 수도 있습니다. 이것을 부분 순서(partial order)라고 합니다

마지막으로, 두 객체가 어떤 방식으로든 서로 연관되어 있다는 조건을 부과할 수 있습니다. 여기에 선형 순서(linear order)나 전 순서(total order)를 부여할 수 있습니다.

이런 순서가 있는 집합을 범주로 특성화해 보겠습니다. 원순서 집합은 어떤 객체 a에서 객체 b로 이동하는 최대 하나의 사상이 있는 범주입니다. 이 범주의 또 다른 이름은 "thin"입니다. 원순서 집합은 얇은 범주입니다.

범주 C에서 객체 a에서 객체 b로의 사상 집합을 hom-set이라고 하며 C(a, b) 또는 HomC(a,b)로 작성합니다. 따라서 모든 원순서의 hom-set은 비어 있거나 하나만 존재합니다. 여기에는 home-set C(a, a)가 포함됩니다. a에서 a까지의 사상 집합은 모든 원순서 집합에서 항등 사상 하나만 포함해야 합니다. 그러나 원순서 집합에 순환이 있을 수 있습니다. 순환은 부분 순서 집합에서 금지됩니다.

정렬로 인해 원순서 집합, 부분 순서 집합, 전 순서 집합을 인지할 수 있는 것은 매우 중요합니다. 퀵 정렬, 버블 정렬, 병합 정렬과 같은 정렬 알고리즘은 전 순서 집합에서만 올바르게 동작합니다. 부분 순서 집합은 토폴로지 정렬(topological sort)을 사용해 정렬할 수 있습니다.

## Monoid as Set

Monoid is an embarrassingly simple but amazingly powerful concept. It’s the concept behind basic arithmetics: Both addition and multiplication form a monoid. Monoids are ubiquitous in programming. They show up as strings, lists, foldable data structures, futures in concurrent programming, events in functional reactive programming, and so on.

Traditionally, a monoid is defined as a set with a binary operation. All that’s required from this operation is that it’s associative, and that there is one special element that behaves like a unit with respect to it.

For instance, natural numbers with zero form a monoid under addition. Associativity means that:

```
(a + b) + c = a + (b + c)
```

(In other words, we can skip parentheses when adding numbers.)

The neutral element is zero, because:

```
0 + a = a
```

and

```
a + 0 = a
```

The second equation is redundant, because addition is commutative (a + b = b + a), but commutativity is not part of the definition of a monoid. For instance, string concatenation is not commutative and yet it forms a monoid. The neutral element for string concatenation, by the way, is an empty string, which can be attached to either side of a string without changing it.

In Haskell we can define a type class for monoids — a type for which there is a neutral element called `mempty` and a binary operation called `mappend`:

```haskell
class Monoid m where
    mempty  :: m
    mappend :: m -> m -> m
```

The type signature for a two-argument function, `m->m->m`, might look strange at first, but it will make perfect sense after we talk about currying. You may interpret a signature with multiple arrows in two basic ways: as a function of multiple arguments, with the rightmost type being the return type; or as a function of one argument (the leftmost one), returning a function. The latter interpretation may be emphasized by adding parentheses (which are redundant, because the arrow is right-associative), as in: `m->(m->m)`. We’ll come back to this interpretation in a moment.

Notice that, in Haskell, there is no way to express the monoidal properties of `mempty` and `mappend` (i.e., the fact that `mempty` is neutral and that `mappend` is associative). It’s the responsibility of the programmer to make sure they are satisfied.

Haskell classes are not as intrusive as C++ classes. When you’re defining a new type, you don’t have to specify its class up front. You are free to procrastinate and declare a given type to be an instance of some class much later. As an example, let’s declare `String` to be a monoid by providing the implementation of `mempty` and `mappend` (this is, in fact, done for you in the standard Prelude):

```haskell
instance Monoid String where
    mempty = ""
    mappend = (++)
```

Here, we have reused the list concatenation operator `(++)`, because a `String` is just a list of characters.

A word about Haskell syntax: Any infix operator can be turned into a two-argument function by surrounding it with parentheses. Given two strings, you can concatenate them by inserting `++` between them:

```haskell
"Hello " ++ "world!"
```

or by passing them as two arguments to the parenthesized `(++)`:

```haskell
(++) "Hello " "world!"
```

Notice that arguments to a function are not separated by commas or surrounded by parentheses. (This is probably the hardest thing to get used to when learning Haskell.)

It’s worth emphasizing that Haskell lets you express equality of functions, as in:

```haskell
mappend = (++)
```

Conceptually, this is different than expressing the equality of values produced by functions, as in:

```haskell
mappend s1 s2 = (++) s1 s2
```

The former translates into equality of morphisms in the category **Hask** (or **Set**, if we ignore bottoms, which is the name for never-ending calculations). Such equations are not only more succinct, but can often be generalized to other categories. The latter is called extensional equality, and states the fact that for any two input strings, the outputs of `mappend` and `(++)` are the same. Since the values of arguments are sometimes called points (as in: the value of f at point x), this is called point-wise equality. Function equality without specifying the arguments is described as point-free. (Incidentally, point-free equations often involve composition of functions, which is symbolized by a point, so this might be a little confusing to the beginner.)

The closest one can get to declaring a monoid in C++ would be to use the (proposed) syntax for concepts.

```cpp
template<class T>
  T mempty = delete;

template<class T>
  T mappend(T, T) = delete;

template<class M>
  concept bool Monoid = requires (M m) {
    { mempty<M> } -> M;
    { mappend(m, m); } -> M;
  };
```

The first definition uses a value template (also proposed). A polymorphic value is a family of values — a different value for every type.

The keyword `delete` means that there is no default value defined: It will have to be specified on a case-by-case basis. Similarly, there is no default for `mappend`.

The concept `Monoid` is a predicate (hence the `bool` type) that tests whether there exist appropriate definitions of `mempty` and `mappend` for a given type `M`.

An instantiation of the Monoid concept can be accomplished by providing appropriate specializations and overloads:

```cpp
template<>
std::string mempty<std::string> = {""};

std::string mappend(std::string s1, std::string s2) {
    return s1 + s2;
}
```

## Monoid as Category

That was the “familiar” definition of the monoid in terms of elements of a set. But as you know, in category theory we try to get away from sets and their elements, and instead talk about objects and morphisms. So let’s change our perspective a bit and think of the application of the binary operator as “moving” or “shifting” things around the set.

For instance, there is the operation of adding 5 to every natural number. It maps 0 to 5, 1 to 6, 2 to 7, and so on. That’s a function defined on the set of natural numbers. That’s good: we have a function and a set. In general, for any number n there is a function of adding n — the “adder” of n.

How do adders compose? The composition of the function that adds 5 with the function that adds 7 is a function that adds 12. So the composition of adders can be made equivalent to the rules of addition. That’s good too: we can replace addition with function composition.

But wait, there’s more: There is also the adder for the neutral element, zero. Adding zero doesn’t move things around, so it’s the identity function in the set of natural numbers.

Instead of giving you the traditional rules of addition, I could as well give you the rules of composing adders, without any loss of information. Notice that the composition of adders is associative, because the composition of functions is associative; and we have the zero adder corresponding to the identity function.

An astute reader might have noticed that the mapping from integers to adders follows from the second interpretation of the type signature of `mappend` as `m->(m->m)`. It tells us that `mappend` maps an element of a monoid set to a function acting on that set.

Now I want you to forget that you are dealing with the set of natural numbers and just think of it as a single object, a blob with a bunch of morphisms — the adders. A monoid is a single object category. In fact the name monoid comes from Greek mono, which means single. Every monoid can be described as a single object category with a set of morphisms that follow appropriate rules of composition.

<div align='center'>
  <img src='../images/part-1/monoid.webp' height='300'>
</div>

String concatenation is an interesting case, because we have a choice of defining right appenders and left appenders (or prependers, if you will). The composition tables of the two models are a mirror reverse of each other. You can easily convince yourself that appending “bar” after “foo” corresponds to prepending “foo” after prepending “bar”.

You might ask the question whether every categorical monoid — a one-object category — defines a unique set-with-binary-operator monoid. It turns out that we can always extract a set from a single-object category. This set is the set of morphisms — the adders in our example. In other words, we have the hom-set M(m, m) of the single object m in the category M. We can easily define a binary operator in this set: The monoidal product of two set-elements is the element corresponding to the composition of the corresponding morphisms. If you give me two elements of M(m, m) corresponding to f and g, their product will correspond to the composition `g∘f`. The composition always exists, because the source and the target for these morphisms are the same object. And it’s associative by the rules of category. The identity morphism is the neutral element of this product. So we can always recover a set monoid from a category monoid. For all intents and purposes they are one and the same.

<div align='center'>
  <figure>
    <div>
      <img src='../images/part-1/monoidhomset.webp' height='200' />
    </div>
    <figcaption>
      Monoid hom-set seen as morphisms and as points in a set
    </figcaption>
  </figure>
</div>

There is just one little nit for mathematicians to pick: morphisms don’t have to form a set. In the world of categories there are things larger than sets. A category in which morphisms between any two objects form a set is called locally small. As promised, I will be mostly ignoring such subtleties, but I thought I should mention them for the record.

A lot of interesting phenomena in category theory have their root in the fact that elements of a hom-set can be seen both as morphisms, which follow the rules of composition, and as points in a set. Here, composition of morphisms in M translates into monoidal product in the set M(m, m).

## Acknowledgments

I’d like to thank Andrew Sutton for rewriting my C++ monoid concept code according to his and Bjarne Stroustrup’s latest proposal.

## Challenges

1. Generate a free category from:
    1. A graph with one node and no edges
    2. A graph with one node and one (directed) edge (hint: this edge can be composed with itself)
    3. A graph with two nodes and a single arrow between them
    4. A graph with a single node and 26 arrows marked with the letters of the alphabet: a, b, c … z.
2. What kind of order is this?
    1. A set of sets with the inclusion relation: A is included in B if every element of A is also an element of B.
    2. C++ types with the following subtyping relation: T1 is a subtype of T2 if a pointer to T1 can be passed to a function that expects a pointer to T2 without triggering a compilation error.
3. Considering that Bool is a set of two values True and False, show that it forms two (set-theoretical) monoids with respect to, respectively, operator `&&` (AND) and `||` (OR).
4. Represent the Bool monoid with the AND operator as a category: List the morphisms and their rules of composition.
5. Represent addition modulo 3 as a monoid category.

[⬅ 뒤로가기](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/2-types-and-functions.md) / [다음으로 ➡](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/4-kleisli-categories.md)