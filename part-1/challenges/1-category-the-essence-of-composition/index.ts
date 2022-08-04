// 가능한 한 가장 좋아하는 언어로 항등함수를 구현해보세요.
const identity = <T>(t: T) => {
  return t;
}

// 선호하는 언어로 함수 합성 기능을 구현해보세요.
const f = (a: number): string => {
  return a.toString();
}

const g = (b: string): number => {
  return Number(b);
}

const compose = (f: (a: number) => string, g: (b: string) => number) => {
  return (a: number) => g(f(a));
}

const h = compose(f, g);

console.log('g(f(1)):', g(f(1)));
console.log('h(1):', h(1));
console.log(g(f(1)) === h(1));

// 합성된 함수가 항등성을 따르는지 테스트하는 프로그램을 작성해보세요.
console.log(identity(h(1)) === h(identity(1)));