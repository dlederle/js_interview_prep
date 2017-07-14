//https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-%28written-by-a-Frontend-Engineer%29
//Working through these coding questions

const assert = require('assert');

//https://en.wikipedia.org/wiki/Primality_test#Pseudocode
//"For not very large numbers"
function isPrime(num) {
  if(num <= 1) {
    return false;
  } else if (num <= 3) {
    return true;
  } else if (num % 2 == 0 || num % 3 === 0) {
    return false;
  }
  let i = 5;
  while(i * i <= num) {
    if(num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
    i = i + 6;
  }
  return true;
}

function testPrime() {
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(1000000000000000), false);
}

function factorial(num) {
  if(num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function testFactorial() {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(6), 720);
  assert.equal(factorial(10), 3628800);
}

//Return's nth Fibonacci number
function fib(num) {
  if(num === 0) {
    return 0;
  }
  if(num <= 2) {
    return 1;
  } else {
    return fib(num - 1) + fib(num - 2);
  }
}

function testFib() {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(10), 55);
  assert.equal(fib(20), 6765);
}

function isSorted(arr) {
  let last = Number.NEGATIVE_INFINITY;
  for (num of arr) {
    if(num < last) {
      return false;
    }
    last = num;
  }
  return true;
}

function testSorted() {
  assert.equal(isSorted([]), true);
  assert.equal(isSorted([-Infinity, -5, 0, 3, 9]), true);
  assert.equal(isSorted([3, 9, -3, 10]), false);
}

function filter(arr, test) {
  const retArr = [];
  for (el of arr) {
    //This should maybe use apply, to support the standard params.
    if(test(el)) {
      retArr.push(el);
    }
  }
  return retArr;
}

function testFilter() {
  assert.deepEqual(filter([1, 2, 3, 4], n => n < 3), [1, 2]);
  assert.deepEqual(filter([0, 1, 2, 3, 4, 5], isPrime), [2, 3, 5]);
}

function reduce(arr, func) {
  const retArr = [];

}
