//Goal: Filter all numbers greater than 5.

const numbers = [2, 5, 8, 1, 10, 3];

const bigGuys = numbers.filter(greater);

console.log(bigGuys);

function greater(e) {
  return e > 5;
}
