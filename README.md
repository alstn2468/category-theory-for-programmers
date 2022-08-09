# 프로그래머를 위한 범주론

> 본 레파지토리는 Bartosz Milewsk의 [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)을 번역하며 학습한 레파지토리입니다.

<details>
  <summary>
    &nbsp🗂 목차
  </summary>

### Part 1.

1. [범주:합성의 본질](part-1/01-category-the-essence-of-composition.md)
2. [타입과 함수](part-1/02-types-and-functions.md)
3. [크고 작은 범주](part-1/03-categories-great-and-small.md)
4. [Kleisli 범주](part-1/04-kleisli-categories.md)
5. [Products and Coproducts](part-1/05-products-and-coproducts.md)
6. [Simple Algebraic Data Types](part-1/06-simple-algebraic-data-types.md)
7. [Functors](part-1/07-functors.md)
8. [Functoriality](part-1/08-functoriality.md)
9. [Function Types](part-1/09-function-types.md)
10. [Natural Transformations](part-1/10-natural-transformations.md)

### Part 2.

1. [Declarative Programming](part-2/01-declarative-programming.md)
2. [Limits and Colimits](part-2/02-limits-and-colimits.md)
3. [Free Monoids](part-2/03-free-monoids.md)
4. [Representable Functors](part-2/04-representable-functors.md)
5. [The Yoneda Lemma](part-2/05-the-yoneda-lemma.md)
6. [Yoneda Embedding](part-2/06-yoneda-embedding.md)

### Part 3.

1. [It’s All About Morphisms](part-3/01-its-all-about-morphisms.md)
2. [Adjunctions](part-3/02-adjunctions.md)
3. [Free/Forgetful Adjunctions](part-3/03-free-forgetful-adjunctions.md)
4. [Monads: Programmer’s Definition](part-3/04-monads-programmers-definition.md)
5. [Monads and Effects](part-3/05-monads-and-effects.md)
6. [Monads Categorically](part-3/06-monads-categorically.md)
7. [Comonads](part-3/07-comonads.md)
8. [F-Algebras](part-3/08-f-algebras.md)
9. [Algebras for Monads](part-3/09-algebras-for-monads.md)
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

저는 이 책이 여러분을 위해 쓰였다는 것을 몇 문단의 공간에서 설득하려고 노력할 것입니다. 여러분이 "풍부한 여가 시간"에 수학의 가장 추상적인 분야 중 하나를 배우는 것에 대해 어떠한 반대 의견이던 모두 없애려고 할 것입니다.

제 낙관론은 몇 가지 관찰을 기반으로 합니다. 첫째, 범주론은 매우 유용한 프로그래밍 아이디어의 보고입니다. Haskell 프로그래머는 이 자원을 오랫동안 활용해 왔으며 아이디어가 천천히 다른 언어로 스며들고 있지만, 이 과정은 너무 느리고 속도를 높여야 할 필요가 있습니다.

둘째, 다양한 종류의 수학이 있으며 다양한 청중에게 호소합니다. 미분적분학이나 대수학에 알레르기가 있을 수 있지만 범주론을 즐길 수 없다는 의미는 아닙니다. 특히 저는 범주론이 프로그래머의 마음에 잘 맞는 종류의 수학이라고 주장할 정도입니다. 그것은 범주론이 세부 사항을 다루기보다 구조를 다루기 때문입니다. 범주론은 프로그램을 합성할 수 있게 만드는 종류의 구조를 다룹니다.

합성은 범주론의 뿌리에 있으며 범주 자체를 정의하는 부분입니다. 그리고 저는 합성이 프로그래밍의 본질이라고 강력하게 주장할 것입니다. 훌륭한 엔지니어가 서브루틴에 대한 아이디어를 내놓기 훨씬 전부터 우리는 계속 합성을 해왔습니다. 얼마 전 구조적 프로그래밍 원칙은 코드 블록을 합성할 수 있게 만들었기 때문에 프로그래밍에 혁명을 일으켰습니다. 그 후에 객체 합성에 대한 객체 지향 프로그래밍이 등장했습니다. 함수형 프로그래밍은 함수와 대수적 데이터 구조를 합성하는 것뿐 아니라 동시성을 구성할 수 있게 합니다. 이것은 다른 프로그래밍 패러다임에서는 사실상 불가능한 것입니다.

셋째, 저에게는 비밀 무기인 칼이 있습니다. 이 칼로 수학을 도살하여 프로그래머가 더 보기 좋게 만들 것입니다. 전문 수학자라면 모든 가정을 바로 세우고 모든 진술을 검증하고, 모든 증명을 엄격하게 구성하기 위해 매우 조심해야 합니다. 이것은 수학 논문과 책을 외부인이 읽기에 매우 어렵게 만듭니다. 저는 훈련을 받은 물리학자이며 물리학에서 비공식 추론을 사용하여 놀라운 발전을 이루었습니다. 수학자들은 위대한 물리학자 P. A. M. Dirac이 일부 미분 방정식을 풀기 위해 만든 Dirac 델타 함수를 비웃었습니다. 그들은 Dirac의 통찰력을 공식화한 분포 이론이라는 완전히 새로운 미적분학 분야를 발견했을 때 웃음을 멈췄습니다.

물론 손을 흔드는 주장을 사용할 때 잘못된 말을 할 위험이 있기 때문에 이 책에서 비공식적인 주장 뒤에는 확실한 수학적 이론이 있는지 확인하려고 노력할 것입니다. 제 탁자 위에는 선더스 맥 레인(Saunders Mac Lane)의 수학자를 위한 범주론의 낡은 사본이 있습니다.

이것은 프로그래머를 위한 범주론이므로 컴퓨터 코드를 사용하여 모든 주요 개념을 설명합니다. 함수형 언어가 인기 있는 명령형 언어보다 수학에 더 가깝다는 것을 알고 있을 것입니다. 또한 함수형 언어는 더 많은 추상화 능력을 제공합니다. 따라서 범주론의 혜택을 이용할 수 있게 되기 전에 Haskell을 배워야 할 거라는 자연스러운 유혹이 있을 수 있습니다. 그러나 범주론이 함수형 프로그래밍 외에는 적용할 수 없다는 것은 사실이 아닙니다. 그래서 더 많은 C++ 예제를 제공할 것입니다. 물론 더러운 구문을 극복해야 하고 장황한 배경에서 패턴이 눈에 띄지 않을 수 있으며, 더 높은 추상화 대신 복사, 붙여넣기를 해야 할 수 있지만 이것은 C++ 프로그래머의 몫일 뿐입니다.

하지만 Haskell에 관한 여러분의 걱정은 멀어지지 않았습니다. Haskell 프로그래머가 될 필요는 없지만, C++로 구현할 아이디어를 스케치하고 문서화하기 위한 언어로 필요합니다. 그것이 바로 제가 Haskell을 시작한 방법입니다. 간결한 문법과 강력한 타입 시스템이 C++ 템플릿, 데이터 구조 및 알고리즘을 이해하고 구현하는 데 큰 도움이 됩니다. 하지만 독자들이 이미 Haskell을 알고 있다고 기대할 수는 없기 때문에 천천히 소개하고 모든 것을 설명하겠습니다.

경험이 많은 프로그래머라면 스스로 이렇게 물어볼 수 있습니다. 범주론이나 함수형 방법론에 대해 걱정하지 않고 오랫동안 코딩을 해왔는데 무엇이 바뀌게 되나요? 확실히 명령형 언어를 침범하는 새로운 함수형 기능의 꾸준한 흐름이 있음을 알 수 있습니다. 객체 지향 프로그래밍의 기초인 Java조차도 최근 C++의 람다가 몇 년마다 새로운 표준으로 급변하는 세상을 따라잡기 위해 빠른 속도로 진화하고 있습니다. 이 모든 활동은 파괴적인 변화 또는 물리학자들이 말하는 상전이를 위한 준비입니다. 물을 계속 가열하면 결국 끓기 시작합니다. 우리는 이제 점점 뜨거워지는 물에서 계속 헤엄을 쳐야 하는지 아니면 몇 가지 대안을 찾기 시작해야 하는지 결정해야 하는 개구리의 위치에 있습니다.

<div align='center'>
  <img src='./images/frog.jpeg' height='200'>
</div>

큰 변화를 주도하는 힘 중 하나는 멀티코어 혁명입니다. 널리 퍼진 프로그래밍 패러다임인 객체 지향 프로그래밍은 동시성 및 병렬성 분야에서 어떤 것도 사지 않고 대신 위험하고 버그가 있는 디자인을 권장합니다. 객체 지향의 기본 전제인 데이터 은닉은 공유와 변화가 결합할 때 데이터 경쟁의 원인이 됩니다. 뮤텍스를 보호하는 데이터와 결합하는 아이디어는 좋지만, 불행히도 잠금은 구성되지 않으며 잠금을 숨기는 것은 교착 상태를 디버그하기 쉽고 더 어렵게 만듭니다.

그러나 동시성이 없는 경우에도 소프트웨어 시스템의 복잡성이 증가하면서 명령형 패러다임의 확장성의 한계를 테스트하고 있습니다. 쉽게 말해서 부작용이 걷잡을 수 없이 나오고 있습니다. 물론 부작용이 있는 함수는 종종 편리하고 작성하기 쉽습니다. 그들의 효과는 원칙적으로 이름과 주석으로 인코딩될 수 있습니다. SetPassword 또는 WriteFile이라는 함수는 분명 일부 상태를 변경하고 부작용을 생성하며 우리는 이것들을 처리하는 데 익숙합니다. 부작용이 있는 함수 위에 부작용이 있는 함수를 합성하기 시작하면 일이 복잡해지기 시작합니다. 부작용이 본질적으로 나쁘다는 것이 아니라 더 큰 규모로 관리할 수 없도록 만드는 부작용이 숨겨져 있다는 사실입니다. 부작용은 확장되지 않으며 명령형 프로그래밍은 모두 부작용에 관한 것입니다.

하드웨어의 변화와 소프트웨어의 복잡성 증가로 우리는 프로그래밍의 기초를 다시 생각해야 합니다. 유럽의 위대한 고딕 대성당의 건축가들처럼 우리는 재료와 구조의 한계까지 기술을 연마해 왔습니다. 프랑스의 보베에는 미완성 고딕 양식의 대성당이 있습니다. 이 대성당은 인간의 한계에 대한 깊은 투쟁을 증언합니다. 이전의 모든 높이와 가벼운 기록을 깨려고 시도했지만 일련의 붕괴를 겪었습니다. 쇠막대와 나무 지지대 같은 임시 조치는 그것이 분해되는 것을 방지하지만 분명히 많은 일이 잘못되었습니다. 현대의 관점에서 볼 때 현대 재료 과학, 컴퓨터 모델링, 유한 요소 분석, 일반 수학과 물리학의 도움 없이 이렇게 많은 고딕 건축물이 성공적으로 완성되었다는 것은 기적입니다. 저는 미래 세대가 우리가 복잡한 운영 체제, 웹 서버 및 인터넷 인프라를 구축할 때 보여주었던 프로그래밍 기술에 감탄할 수 있기를 바랍니다. 그리고 솔직히 말해서 그렇게 해야 합니다. 왜냐하면 우리는 이 모든 것을 매우 어설픈 토대를 기반으로 했기 때문입니다. 우리가 앞으로 나아가고 싶다면 그 기초를 고쳐야 합니다.

<div align='center'>
  <figure>
    <div>
      <img src='./images/beauvais-cathedral.jpeg' height='300' />
    </div>
    <figcaption>
      보베 대성당 붕괴를 막는 임시 조치
    </figcaption>
  </figure>
</div>

[다음으로 ➡](https://github.com/alstn2468/category-theory-for-programmers/blob/main/part-1/01-category-the-essence-of-composition.md#%EB%B2%94%EC%A3%BC-%EC%A1%B0%ED%95%A9%EC%9D%98-%EB%B3%B8%EC%A7%88)

<div align="center">

<sub><sup>Translated by <a href="https://github.com/alstn2468">@Minsu Kim</a></sup></sub><small>✌</small>

</div>