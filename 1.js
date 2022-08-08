function getTotalSum(numberArray) {
  return numberArray.reduce((a, b) => a + b, 0);
}

function isBetweenNumber(from, to) {
  return function (num) {
    return from <= num && num <= to;
  }
}

function filterOnlyNumber(stringArray) {
  return stringArray.filter((value) => !isNaN(Number(value))).map(Number);
}

const isBetween0to1000 = isBetweenNumber(0, 1000);

function filterBetween0to1000(numberArray) {
  return numberArray.filter(isBetween0to1000);
}


function add(separator) {
  return function (value) {
    return getTotalSum(filterBetween0to1000(filterOnlyNumber(value.split(separator))));
  }
}

console.log(add('ㅁ')('1ㅁ2ㅁ3ㅁ4ㅁ5'));
console.log(add(',')('1,2,3,4,5'));
console.log(add(',')('1,2,3,4,5,1000,10001'));