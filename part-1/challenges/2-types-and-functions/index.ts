import seedrandom = require('seedrandom');

// 1.
// 선호하는 언어로 고차 함수(또는 객체) `memoize`를 정의해보세요.
// 이 함수는 순수 함수 `f`를 인자로 받고 모든 인자에 대해 원래 함수를 한 번만 호출하고
// 결과를 내부적으로 저장하고 이후에 이 저장된 결과를 동일한 인자로 호출할 때마다
// 저장된 결과를 반환하는 점을 제외하고 거의 `f`와 동일하게 작동하는 함수를 반환합니다.
// 기억된 함수는 성능을 보면 알 수 있습니다.예를 들어, 평가하는 데 오래 걸리는 함수를
// 기억하려고 합니다. 처음 호출할 때는 결과를 기다려야 하지만 동일한 인자로 또 호출할 경우
// 결과를 즉시 가져와야 합니다.

function memoize<T extends string | number, U>(f: (a?: T) => U) {
  let memoizedValue: Record<string | number, U> = {};
  return function (a?: T) {
    if (memoizedValue[a]) {
      return memoizedValue[a];
    }
    memoizedValue[a] = f(a);
    return memoizedValue[a];
  };
}

function fibonacci(n: number): number {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log();
console.log('- Start first memoizedFibonacci(20)')
console.time('- start-fib-1');
console.log('- memoizedFibonacci(20):', memoizedFibonacci(20));
console.timeEnd('- start-fib-1');
console.log('- End first memoizedFibonacci(20)');

console.log();
console.log('- Start second memoizedFibonacci(30)')
console.time('- start-fib-2');
console.log('- memoizedFibonacci(30):', memoizedFibonacci(30));
console.timeEnd('- start-fib-2');
console.log('- End second memoizedFibonacci(30)');

// 2.
// 난수를 생성하는 일반적으로 사용하는 표준 라이브러리 함수를 `memoize`에 사용해보세요. 동작하나요?

const memoizedMathRandom = memoize(Math.random);

console.log();
console.log('- Start call memoizedMathRandom');
console.log('- memoizedMathRandom()', memoizedMathRandom());
console.log('- memoizedMathRandom()', memoizedMathRandom());
console.log('- End call memoizedMathRandom');

// 3.
// 대부분의 난수 생성기는 시드로 초기화할 수 있습니다.
// 시드를 가져오고 해당 시드로 난수 생성기를 호출하고 결과를 반환하는 함수를 구현해 해당 기능을 `memoize`에 사용해보세요. 동작하나요?

const memoizedSeedRandom = memoize(seedrandom('seed'));

console.log();
console.log('- Start call memoizedSeedRandom');
console.log('- memoizedSeedRandom()', memoizedSeedRandom());
console.log('- memoizedSeedRandom()', memoizedSeedRandom());
console.log('- End call memoizedSeedRandom');